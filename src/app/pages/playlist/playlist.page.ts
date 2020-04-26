import { Component, OnInit, ViewChild } from '@angular/core';
import { LmsService } from '../../services/lms.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
 
  status: any;
  serverAddress: string
  Math: Math = Math;

  constructor(private lms: LmsService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter PlaylistPage');
    this.getStatus();
    this.serverAddress = this.lms.serverAddress;
  }
 
  getStatus() {
    this.lms.getStatus()
    .subscribe((result) => { this.status = result});
  }

  play() {
    this.lms.play().subscribe(result => { this.getStatus(); });
  }

  pause() {
    this.lms.pause().subscribe(result => { this.getStatus(); });
  }
  
  previousTrack() {
    this.lms.playPreviousTrackInPlaylist().subscribe(result => { this.getStatus(); });
  }
  
  nextTrack() {
    this.lms.playNextTrackInPlaylist().subscribe(result => {this.getStatus(); });
  }
  
  playTrackInPlaylist(track) {
    console.log('playTrackInPlaylist '+track['playlist index']);
    this.lms.playTrackInPlaylist(track['playlist index']).subscribe(result => { this.getStatus(); });
  }

  removeTrack(track) {
    this.lms.removeTrackFromPlaylist(track.id).subscribe(result => { this.getStatus(); });
  }

  clearPlaylist(track) {
    this.lms.clearPlaylist().subscribe(result => { this.getStatus(); });
  }

  reorderItems(ev) {
    this.lms.moveTrackInPlaylist(ev.detail.from, ev.detail.to).subscribe(result => { this.getStatus(); });
    ev.detail.complete();
  }
}
