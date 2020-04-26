import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LmsService, Genre, Album } from '../../services/lms.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {

  genre: Genre;
  albums: Album[];
  serverAddress: string;

  constructor(private router: Router, private lms: LmsService, private toastCtrl: ToastController) {
    console.log(this.router.getCurrentNavigation().extras.state);
    this.genre = this.router.getCurrentNavigation().extras.state.genre;
  }

  ngOnInit() {
    console.log('ngOnInit AlbumsPage');
    this.getAlbums();
    this.serverAddress = this.lms.serverAddress;
  }

  getAlbums() {
    this.lms.getAlbums(this.genre.id)
    .subscribe((result) => { this.albums = result});
  }

  itemSelected(album: Album) {
    this.router.navigate(['tabs/browse/songs'], {state: {album: album}});
  }

  playAlbum(album: Album) {
    this.lms.playAlbum(album.id)
    .subscribe();
    this.showToast("Album played");
  }

  addAlbum(album: Album) {
    this.lms.addAlbum(album.id)
    .subscribe();
    this.showToast("Album added to playlist");
  }

  async showToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
}
