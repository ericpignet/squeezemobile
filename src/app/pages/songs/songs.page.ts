import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LmsService, Album, Song } from '../../services/lms.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
})
export class SongsPage implements OnInit {

  album: Album;
  songs: Song[];

  constructor(private lms: LmsService, private toastCtrl: ToastController, private router: Router) {
    this.album = this.router.getCurrentNavigation().extras.state.album;
    this.lms.getSongs(this.album.id)
    .subscribe((result) => { this.songs = result});
    }

  ngOnInit() {
    console.log('ngOnInit SongsPage');
  }
  
  playSong(song: Song) {
    console.log('SongsPage::playSong');
    this.lms.playSong(song.id)
    .subscribe();
    this.showToast("Song played")
  }

  addSong(song: Song) {
    this.lms.addSong(song.id)
    .subscribe();
    this.showToast("Song added to playlist")
  }

  async showToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
}
