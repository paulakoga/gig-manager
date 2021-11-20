import { Component, Inject } from '@angular/core';
import { DatastoreService } from '../datastore.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SongListDialogComponent } from '../song-list-dialog/song-list-dialog.component';


@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SongListComponent implements AfterViewInit {

  pageTitle: string = "Song List";

  name: string = "";
  artist: string = "";
  tabs: string = "";
  key: string = "";
  youtube: string = "";
  spotify: string = "";
  deezer: string = "";

  constructor(public datastore: DatastoreService, public dialog: MatDialog ) {}

  dataSource = new MatTableDataSource(this.datastore.getSongs());
  expandedElement!: Song | null;
  selection = new SelectionModel<Song>(true, []);

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

    let index: number = this.datastore.getSongs().findIndex(d => d == element);

    const dialogRef = this.dialog.open(SongListDialogComponent, {
      width: '250px',
      data: {name: element.name, artist: element.artist, tabs: element.tabs, key: element.key, youtube: element.youtube, spotify: element.spotify, deezer: element.deezer},
    });

    dialogRef.afterClosed().subscribe(result => {
      element = result;
      if (element != null){
        this.datastore.updateSong(index, element.name, element.artist, element.tabs, element.key, element.youtube, element.spotify, element.deezer)
      }
    });
  }

  deleteSelectedSongs() {
    this.selection.selected.forEach(item => {
       let index: number = this.datastore.getSongs().findIndex(d => d == item);
       this.datastore.deleteSong(index)
     });
    this.dataSource.data = this.datastore.getSongs();

    this.selection = new SelectionModel<Song>(true, []);
  }

}

export interface Song {
  name: string;
  artist: string;
}

export interface DialogData {
  name: string;
  artist: string;
  tabs: string;
  key: string;
  youtube: string;
  spotify: string;
  deezer: string;
}





