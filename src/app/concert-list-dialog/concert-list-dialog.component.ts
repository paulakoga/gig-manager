import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatastoreService } from '../datastore.service';

@Component({
  selector: 'app-concert-list-dialog',
  templateUrl: './concert-list-dialog.component.html',
  styleUrls: ['./concert-list-dialog.component.scss']
})
export class ConcertListDialogComponent implements OnInit {

  venueCtrl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.maxLength(30),
  ]);
  dateCtrl: FormControl = new FormControl(null, [
    Validators.required,
  ]);
  timeStartCtrl: FormControl = new FormControl(null, Validators.pattern('[0-2][0-3]:[0-5][0-9]'))
  timeEndCtrl: FormControl = new FormControl(null, Validators.pattern('[0-2][0-3]:[0-5][0-9]'))
  addressCtrl: FormControl = new FormControl()
  setlistCtrl: FormControl = new FormControl()

  entryGroup: FormGroup = new FormGroup({
    name: this.venueCtrl,
    artist: this.dateCtrl,
    timeStartCtrl: this.timeStartCtrl,
    timeEndCtrl: this.timeEndCtrl
  })

  constructor(public datastore: DatastoreService, public dialogRef: MatDialogRef<ConcertListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

    setlists: {id: number, name: string}[] = this.datastore.getSetlist();

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
export interface DialogData {
  venue: string;
  date: Date;
  timeStart: string;
  timeEnd: string;
  address: string;
  setlist: number;
}
