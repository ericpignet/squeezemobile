import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Player { name: string; id: string; power: boolean; volume: number; }
export interface Genre  { name: string; id: string; }
export interface Album  { name: string; id: string; artist: string; coverid: string}
export interface Song   { name: string; id: string; trackNum: string}

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class LmsService {
  jsonrpcUrl: string;
  serverAddress: string;
  currentPlayerId: string;

  constructor(private http: HttpClient) {
    console.log('LmsService::constructor');
    // console.log("got server Address from storage: "+val);

    this.serverAddress = localStorage.getItem('serverAddress');
    this.jsonrpcUrl = this.serverAddress + "/jsonrpc.js";
    console.log('jsonrpcUrl: '+this.jsonrpcUrl);

    this.currentPlayerId = localStorage.getItem('currentPlayerId');

    //Share observable returning player id, so that each subscribe won't make a new call
    //this.currentPlayerId$ = this.getPlayers().map((response) => response[0].id).share();

  }

  updateServerAddress(serverAddress: string) {
    this.serverAddress = serverAddress;
    this.jsonrpcUrl = serverAddress + "/jsonrpc.js";
  }

  sendRequest(player: string, request: string): Observable<any> {
    console.log('lms::sendRequest('+player+','+request+') jsonrpcUrl:'+this.jsonrpcUrl);
    //let headers = new Headers({ 'Referer': 'http://192.168.1.199:9000/' });
    //let options = new RequestOptions({ headers: headers });
    return this.http.post(this.jsonrpcUrl,
      '{"id":1,"method":"slim.request", "params":["'+player+'",'+request+']}').pipe(
        tap((response) => {console.log(JSON.stringify(response))}),
        catchError(this.handleError));
  }

  sendRequestToCurrentPlayer(request: string): Observable<any> {
    if (this.currentPlayerId != null) {
      return this.sendRequest(this.currentPlayerId,request);
    }
    else {
      return this.getPlayers().pipe(mergeMap(
        result => {
          return this.sendRequest(result[0].id, request);
        }
      ))
    }
    //return this.currentPlayerId$.mergeMap(id =>{ return this.sendRequest(id,request) });
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  /********************
   *  Music database  *
   ********************/
  
  getGenres(): Observable<Genre[]> {
    return this.sendRequest("", '["genres","0","100"]')
    .pipe(map((response) => response.result.genres_loop.map(genre => {
      return { name: genre.genre, id: genre.id }
      })));
}

  getAlbums(genreId: string): Observable<Album[]> {
    //Albums with songs in genre Children
    return this.sendRequest("", '["albums","0","100","genre_id:'+genreId+'","tags:alj"]')
    .pipe(map((response) => response.result.albums_loop.map(album => {
      return { name: album.album, id: album.id, artist:album.artist, coverid:album.artwork_track_id }
      })));
  }

  getSongs(albumId: string): Observable<Song[]> {
    //Songs in album
    return this.sendRequest("", '["songs","0","100","album_id:'+albumId+'","sort:albumtrack","tags:galdt"]')
    .pipe(map((response) => response.result.titles_loop.map(title => {
      return { name: title.title, id: title.id, trackNum: title.tracknum }
      })));
  }

  search(searchString: string): Observable<any> {
    //TODO escaping
    return this.sendRequest("", '["search", "0","100","term:'+searchString+'"]');
  }

  /********************
   *  Playlist        *
   ********************/

  play(): Observable<any> {
    return this.sendRequestToCurrentPlayer('["play"]');
  }

  pause(): Observable<any> {
    return this.sendRequestToCurrentPlayer('["pause","1"]');
  }

  playSong(songId: string): Observable<any> {
    return this.sendRequestToCurrentPlayer('["playlistcontrol","cmd:load","track_id:'+songId+'"]');
  }

  addSong(songId: string): Observable<any> {
    return this.sendRequestToCurrentPlayer('["playlistcontrol","cmd:add","track_id:'+songId+'"]');
  }
  
  playAlbum(albumId: string): Observable<any> {
    return this.sendRequestToCurrentPlayer('["playlistcontrol","cmd:load","album_id:'+albumId+'"]');
  }
  
  addAlbum(albumId: string): Observable<any> {
    return this.sendRequestToCurrentPlayer('["playlistcontrol","cmd:add","album_id:'+albumId+'"]');
  }
  
  getStatus(): Observable<any> {
    return this.sendRequestToCurrentPlayer('["status","0","100","tags:galdJ"]');
  }

  playTrackInPlaylist(playlistIndex: string): Observable<any> {
    return this.sendRequestToCurrentPlayer('["playlist","index","'+playlistIndex+'"]');
  }

  playPreviousTrackInPlaylist(): Observable<any> {
    return this.sendRequestToCurrentPlayer('["playlist","index","-1"]');
  }

  playNextTrackInPlaylist(): Observable<any> {
    return this.sendRequestToCurrentPlayer('["playlist","index","+1"]');
  }

  removeTrackFromPlaylist(trackId: string): Observable<any> {
    return this.sendRequestToCurrentPlayer('["playlistcontrol","cmd:delete","track_id:'+trackId+'"]');
  }

  clearPlaylist(): Observable<any> {
    return this.sendRequestToCurrentPlayer('["playlist","clear"]');
  }

  moveTrackInPlaylist(from: number, to: number): Observable<any> {
    return this.sendRequestToCurrentPlayer('["playlist","move","'+from+'","'+to+'"]');
  }

  /*********************
   * Player management *
   ********************/

   getVolume(player: Player): Observable<any> {
    return this.sendRequest(player.id, '["mixer", "volume", "?"]');
  }

  setVolume(player: Player, volume: string): Observable<any> {
    return this.sendRequest(player.id, '["mixer", "volume", "'+volume+'"]');
  }

  turnOnOff(player: Player, isOn: boolean): Observable<any> {
    return this.sendRequest(player.id, '["power", "'+Number(isOn)+'"]');
  }

  getPlayers(): Observable<Player[]> {
    return this.sendRequest("", '["players","0","100"]')
      .pipe(map((response) => response.result.players_loop.map(player => {
          return {
            name: player.name,
            id: player.playerid,
            power: player.power,
            volume: undefined
          }
      })));
  }

  setCurrentPlayer(player: Player) {
    this.currentPlayerId = player.id;
    localStorage.setItem('currentPlayerId', this.currentPlayerId);
  }
}
