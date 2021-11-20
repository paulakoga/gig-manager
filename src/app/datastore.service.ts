import { ArrayDataSource } from '@angular/cdk/collections';
import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DatastoreService {

  private songs: {name: string, artist: string, tabs: string, key: string, youtube: string, spotify: string, deezer: string}[] = [];
  private concerts: {venue: string, date: Date, timeStart: string, timeEnd: string, address: string, setlist: number}[] = [];
  


  constructor() {
    const savedData = window.localStorage.getItem('songs');
    if (savedData !== null){
      this.songs = JSON.parse(savedData);
    }
    const savedData2 = window.localStorage.getItem('concerts');
    if (savedData2 !== null){
      this.concerts = JSON.parse(savedData2);
    }
  }

  private saveChanges(){
    window.localStorage.setItem('songs', JSON.stringify(this.songs));
    window.localStorage.setItem('concerts', JSON.stringify(this.concerts));
  }

  addSong(name: string, artist: string, tabs: string, key: string, youtube: string, spotify: string, deezer: string){
    this.songs.push({name: name, artist: artist, tabs: tabs, key: key, youtube: youtube, spotify: spotify, deezer: deezer});
    this.saveChanges();
  }

  updateSong(index: number, name: string, artist: string, tabs: string, key: string, youtube: string, spotify: string, deezer: string){

    this.songs[index].name = name
    this.songs[index].artist = artist
    this.songs[index].tabs = tabs
    this.songs[index].key = key
    this.songs[index].youtube = youtube
    this.songs[index].spotify = spotify
    this.songs[index].deezer = deezer
    this.saveChanges();
  }

  getSongs(){
    return (this.songs);
  }

  deleteSong(i: number){
    this.songs.splice(i, 1);
    this.saveChanges();
  }

  addConcerts(venue: string, date: Date, timeStart: string, timeEnd: string, address: string, setlist: number){
    this.concerts.push({venue: venue, date: date, timeStart: timeStart, timeEnd: timeEnd, address: address, setlist: setlist});
    this.saveChanges();
  }

  updateConcerts(index: number, venue: string, date: Date, timeStart: string, timeEnd: string, address: string, setlist: number){
    this.concerts[index].venue = venue
    this.concerts[index].date = date
    this.concerts[index].timeStart = timeStart
    this.concerts[index].timeEnd = timeEnd
    this.concerts[index].address = address
    this.concerts[index].setlist = setlist
    this.saveChanges();
  }

  getConcerts(){
    return (this.concerts);
  }

  deleteConcert(i: number){
    this.concerts.splice(i, 1);
    this.saveChanges();
  }

}
