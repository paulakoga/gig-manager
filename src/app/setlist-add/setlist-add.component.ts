import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatastoreService } from '../datastore.service';

@Component({
  selector: 'app-setlist-add',
  templateUrl: './setlist-add.component.html',
  styleUrls: ['./setlist-add.component.scss']
})
export class SetlistAddComponent implements OnInit {

  pageTitle: string = "Add Setlist";

  nameCtrl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.maxLength(30),
  ]);
  entryGroup: FormGroup = new FormGroup({
    name: this.nameCtrl
  })

  constructor(public datastore: DatastoreService) { }

  ngOnInit(): void {
  }

  onSubmit(event: Event){
    if (this.entryGroup.valid){
      //process valid form data
      this.datastore.addSetlist(this.nameCtrl.value);
      (event.currentTarget as HTMLFormElement).reset();
    }
  }

}
