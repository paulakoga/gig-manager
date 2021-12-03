import { ArrayDataSource } from '@angular/cdk/collections';
import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DatastoreService {

  private songs: {id: number, name: string, artist: string, tabs: string, key: string, youtube: string, spotify: string, deezer: string}[] = [];
  private concerts: {venue: string, date: Date, timeStart: string, timeEnd: string, address: string, setlist: number}[] = [];
  private setlists: {id: number, name: string, songs: number[]}[] = [];
  //private setlistSongs: {setlistId: number, songId: number}[] = [];
  private setlistId: number = 0;
  private songId: number = 0;
  

  constructor() {
    const songData = window.localStorage.getItem('songs');
    if (songData !== null){
      this.songs = JSON.parse(songData);
    }
    const concertData = window.localStorage.getItem('concerts');
    if (concertData !== null){
      this.concerts = JSON.parse(concertData);
    }
    const setlistData = window.localStorage.getItem('setlists');
    if (setlistData !== null){
      this.setlists = JSON.parse(setlistData);
    }
    // const setlistSongData = window.localStorage.getItem('setlistSongs');
    // if (setlistSongData !== null){
    //   this.setlistSongs = JSON.parse(setlistSongData);
    // }
    const setlistIdData = window.localStorage.getItem('setlistId');
    if (setlistIdData !== null){
      this.setlistId = JSON.parse(setlistIdData);
    }
    const songIdData = window.localStorage.getItem('songId');
    if (songIdData !== null){
      this.setlistId = JSON.parse(songIdData);
    }
  }

  private saveChanges(){
    window.localStorage.setItem('songs', JSON.stringify(this.songs));
    window.localStorage.setItem('concerts', JSON.stringify(this.concerts));
    window.localStorage.setItem('setlists', JSON.stringify(this.setlists));
   // window.localStorage.setItem('setlistSongs', JSON.stringify(this.setlistSongs));
    window.localStorage.setItem('setlistId', JSON.stringify(this.setlistId));
    window.localStorage.setItem('songId', JSON.stringify(this.setlistId));
  }

  addSong(name: string, artist: string, tabs: string, key: string, youtube: string, spotify: string, deezer: string){
    let newId = this.songId + 1;
    this.songs.push({id: newId, name: name, artist: artist, tabs: tabs, key: key, youtube: youtube, spotify: spotify, deezer: deezer});
    this.songId = newId;
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

  addSetlist(name: string){
    let newId = this.setlistId + 1;
    this.setlists.push({id: newId, name: name, songs: []});
    this.setlistId = newId;
    this.saveChanges();
  }

  updateSetlist(index: number, name: string, songs: number[]){
    this.setlists[index].name = name;
    this.setlists[index].songs = songs;
    this.saveChanges();
  }


  getSetlist(){
    return (this.setlists);
  }

  deleteSetlist(i: number){
    this.setlists.splice(i, 1);
    this.saveChanges();
  }

  // updteSetlistSongs(list: {setlistId: number, songId: number}[]){
  //   this.setlistSongs = list;
  //   this.saveChanges();
  // }


  // getSetlistSongs(){
  //   return (this.setlistSongs);
  // }

}
