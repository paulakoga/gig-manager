import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongAddComponent } from './song-add/song-add.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { AboutComponent } from './about/about.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { SongListDialogComponent } from './song-list-dialog/song-list-dialog.component';
import { ConcertAddComponent } from './concert-add/concert-add.component';
import { ConcertListComponent } from './concert-list/concert-list.component';
import { ConcertListDialogComponent } from './concert-list-dialog/concert-list-dialog.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SetlistListComponent } from './setlist-list/setlist-list.component';
import { SetlistAddComponent } from './setlist-add/setlist-add.component';
import { SetlistListDialogComponent } from './setlist-list-dialog/setlist-list-dialog.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SongListComponent,
    SongAddComponent,
    AboutComponent,
    SongListDialogComponent,
    ConcertAddComponent,
    ConcertListComponent,
    ConcertListDialogComponent,
    SetlistListComponent,
    SetlistAddComponent,
    SetlistListDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,    
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SongListDialogComponent]
})
export class AppModule { }
