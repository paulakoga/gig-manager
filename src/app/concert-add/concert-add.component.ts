import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatastoreService } from '../datastore.service';

@Component({
  selector: 'app-concert-add',
  templateUrl: './concert-add.component.html',
  styleUrls: ['./concert-add.component.scss']
})
export class ConcertAddComponent implements OnInit {

  pageTitle: string = "Add Concert";

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

  constructor(public datastore: DatastoreService) { }

  setlists: {id: number, name: string}[] = this.datastore.getSetlist();

  ngOnInit(): void {

  }

  onSubmit(event: Event){
    if (this.entryGroup.valid){
      //process valid form data
      this.datastore.addConcerts(this.venueCtrl.value, this.dateCtrl.value, this.timeStartCtrl.value, this.timeEndCtrl.value, this.addressCtrl.value, this.setlistCtrl.value);
      (event.currentTarget as HTMLFormElement).reset();
    }
  }



}
