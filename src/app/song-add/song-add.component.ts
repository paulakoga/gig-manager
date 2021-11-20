import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatastoreService } from '../datastore.service';


@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.scss']
})
export class SongAddComponent implements OnInit {

  pageTitle: string = "Add Song";

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

  constructor(public datastore: DatastoreService) { }

  ngOnInit(): void {
  }

  onSubmit(event: Event){
    if (this.entryGroup.valid){
      //process valid form data
      this.datastore.addSong(this.nameCtrl.value, this.artistCtrl.value, this.tabsCtrl.value, this.keyCtrl.value, this.youtubeCtrl.value, this.spotifyCtrl.value, this.deezerCtrl.value);
      (event.currentTarget as HTMLFormElement).reset();
    }
  }

  onCancel(){

    

  }

}
