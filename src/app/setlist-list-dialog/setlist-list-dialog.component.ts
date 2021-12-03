import { Component, Inject, OnInit } from '@angular/core';
import { DatastoreService } from '../datastore.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-setlist-list-dialog',
  templateUrl: './setlist-list-dialog.component.html',
  styleUrls: ['./setlist-list-dialog.component.scss']
})
export class SetlistListDialogComponent implements AfterViewInit, OnInit {

  id: string = "";
  name: string = "";

  constructor(public datastore: DatastoreService, public dialogRef: MatDialogRef<SetlistListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  //songs: {id: number, name: string, artist: string, tabs: string, key: string, youtube: string, spotify: string, deezer: string}[] = [];

  songs = this.datastore.getSongs();
  dataSource = new MatTableDataSource(this.songs);
  selection = new SelectionModel<Song>(true, []);


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

  }

  ngOnInit(): void {
    this.songs.forEach(item => {
      if (this.data.songs.includes(item.id)){
        this.selection.select(item);
      }
    });    

  }

  @ViewChild(MatSort) sort: MatSort = new MatSort;

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateSongs(): void{
    this.selection.selected.forEach(item => {
      this.data.songs.push(item.id);
    })

    console.log(this.data.songs);

  }

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
}
export interface Song {
  id: number;
  name: string;
  artist: string;
}

export interface Setlist {
  id: number;
  name: string;
  songs: number[];
}

export interface DialogData {
  id: number;
  name: string;
  songs: number[];
}