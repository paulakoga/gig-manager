import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SongAddComponent } from './song-add/song-add.component';
import { SongListComponent } from './song-list/song-list.component';
import { ConcertAddComponent } from './concert-add/concert-add.component';
import { ConcertListComponent } from './concert-list/concert-list.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'song-add',
    component: SongAddComponent
  },
  {
    path: 'song-list',
    component: SongListComponent
  }, 
  {
    path: 'concert-list',
    component: ConcertListComponent
  }, 
  {
    path: 'concert-add',
    component: ConcertAddComponent
  }, 
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
