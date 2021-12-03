import { Component, Inject } from '@angular/core';
import { DatastoreService } from '../datastore.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SetlistListDialogComponent } from '../setlist-list-dialog/setlist-list-dialog.component';

@Component({
  selector: 'app-setlist-list',
  templateUrl: './setlist-list.component.html',
  styleUrls: ['./setlist-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SetlistListComponent implements AfterViewInit {

  pageTitle: string = "Setlist List";

  id: number = 0;
  name: string = "";
  songs: number[] = [];

  //setlistSongs: {setlistId: number, songId: number}[] = [];


  constructor(public datastore: DatastoreService, public dialog: MatDialog) { }

  dataSource = new MatTableDataSource(this.datastore.getSetlist());
  expandedElement!: Setlist | null;
  selection = new SelectionModel<Setlist>(true, []);

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

  }

  @ViewChild(MatSort) sort: MatSort = new MatSort;

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  openDialog(element: DialogData): void {

    let index: number = this.datastore.getSetlist().findIndex(d => d == element);

    const dialogRef = this.dialog.open(SetlistListDialogComponent, {
      width: '100%',
      data: {id: element.id, name: element.name, songs: element.songs},
    });

    dialogRef.afterClosed().subscribe(result => {
      element = result;
      console.log(element)
      if (element != null){

        this.datastore.updateSetlist(index, element.name, element.songs)

      }
    });
  }

  deleteSelectedSetlists() {
    this.selection.selected.forEach(item => {
       let index: number = this.datastore.getSetlist().findIndex(d => d == item);
       this.datastore.deleteSetlist(index)
     });
    this.dataSource.data = this.datastore.getSetlist();

    this.selection = new SelectionModel<Setlist>(true, []);
  }

}
export interface Setlist {
  id: number;
  name: string;
  songs: number[];
}

export interface Song {
  id: number; 
  name: string;
  artist: string;
}

export interface DialogData {
  id: number;
  name: string;
  songs: number[];
}
