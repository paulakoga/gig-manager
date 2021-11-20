import { Component, Inject , OnInit} from '@angular/core';
import { DatastoreService } from '../datastore.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConcertListDialogComponent } from '../concert-list-dialog/concert-list-dialog.component';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';


@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ConcertListComponent implements AfterViewInit {

  pageTitle: string = "Concert List";

  venue: string = ""
  date: Date = new Date()
  timeStart: string = ""
  timeEnd: string = ""
  address: string = ""
  setlist: number = 0


  constructor(public datastore: DatastoreService, public dialog: MatDialog) { }

  dataSource = new MatTableDataSource(this.datastore.getConcerts());
  expandedElement!: Concert | null;
  selection = new SelectionModel<Concert>(true, []);

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

    let index: number = this.datastore.getConcerts().findIndex(d => d == element);

    const dialogRef = this.dialog.open(ConcertListDialogComponent, {
      width: '250px',
      data: {venue: element.venue, date: element.date, timeStart: element.timeStart, timeEnd: element.timeEnd, address: element.address, setlist: element.setlist},
    });

    dialogRef.afterClosed().subscribe(result => {
      element = result;
      if (element != null){
        this.datastore.updateConcerts(index, element.venue, element.date, element.timeStart, element.timeEnd, element.address, element.setlist)
      }
    });
  }

  deleteSelectedConcerts() {
    this.selection.selected.forEach(item => {
       let index: number = this.datastore.getConcerts().findIndex(d => d == item);
       this.datastore.deleteConcert(index)
     });
    this.dataSource.data = this.datastore.getConcerts();

    this.selection = new SelectionModel<Concert>(true, []);
  }

  getDate(datetime: Date){
    let date = new Date(datetime)
    let stringdate: string = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear()
    return stringdate 
  }

}

export interface Concert {
  venue: string;
  date: Date;
}

export interface DialogData {
  venue: string;
  date: Date;
  timeStart: string;
  timeEnd: string;
  address: string;
  setlist: number;
}
