import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatastoreService } from '../datastore.service';



@Component({
  selector: 'app-song-list-dialog',
  templateUrl: './song-list-dialog.component.html',
  styleUrls: ['./song-list-dialog.component.scss']
})
export class SongListDialogComponent implements OnInit {

  nameCtrl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.maxLength(30),
  ]);
  artistCtrl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.maxLength(30)
  ]);
  tabsCtrl: FormControl = new FormControl()
  keyCtrl: FormControl = new FormControl()
  youtubeCtrl: FormControl = new FormControl()
  spotifyCtrl: FormControl = new FormControl()
  deezerCtrl: FormControl = new FormControl()

  entryGroup: FormGroup = new FormGroup({
    name: this.nameCtrl,
    artist: this.artistCtrl
  })

  constructor(public datastore: DatastoreService, public dialogRef: MatDialogRef<SongListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
  }

  onSubmit(event: Event){
    // if (this.entryGroup.valid){
    //   //process valid form data
    //   this.datastore.addSong(this.nameCtrl.value, this.artistCtrl.value, this.tabsCtrl.value, this.keyCtrl.value, this.youtubeCtrl.value, this.spotifyCtrl.value, this.deezerCtrl.value);
    //   (event.currentTarget as HTMLFormElement).reset();
    // }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

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