import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { SettingsComponent } from '../../components/settings/settings.component';
import { Genre, LmsService } from '../../services/lms.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.page.html',
  styleUrls: ['./genres.page.scss'],
})
export class GenresPage implements OnInit {

  isSearch: boolean = false;
  genres: Genre[];
  searchString: string;
  searchResults: any;

  constructor(private lms: LmsService,
      public modalCtrl: ModalController, private toastCtrl: ToastController, private router: Router) {
    let jsonrpcUrl = localStorage.getItem('serverAddress');
    if (jsonrpcUrl == undefined)
      this.openSettings();
    else
      this.getGenres();
  }

  ngOnInit() {
    console.log('ngOnInit GenresPage');
  }

  getGenres() {
    this.lms.getGenres()
    .subscribe((result) => { this.genres = result});
  }

  itemSelected(genre: Genre) {
    this.router.navigate(['tabs/browse/albums'], {state: {genre: genre}})
  }

  async openSettings() {
    const modal = await this.modalCtrl.create({component: SettingsComponent});
    modal.onDidDismiss().then(data => {
      this.getGenres();
    });
    modal.present();
  }

  onInputSearch(event) {
    if (event.target.value !== undefined) {
      this.isSearch = true;
      this.lms.search(event.target.value).subscribe(
        result => {
          this.searchResults = result;
        }
      );
    } else {
      this.isSearch = false;
    }
  }

  onCancelSearch(event) {
    this.isSearch = false;
  }

  addAlbum(album) {
    this.lms.addAlbum(album.album_id).subscribe();
    this.showToast("Album added to playlist");
  }

  addSong(song) {
    this.lms.addSong(song.track_id).subscribe();
    this.showToast("Song added to playlist");
  }

  async showToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
}
