import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { SettingsComponent } from '../../components/settings/settings.component';
import { LmsService, Player } from '../../services/lms.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  players: Player[];
  currentPlayerId: string;

  constructor(private modalCtrl: ModalController, private lms: LmsService, private toastCtrl: ToastController) {
    console.log('players constructor');
  }

  getPlayers() {
    this.lms.getPlayers()
    .subscribe((result) => {
      this.players = result;

      this.initVolume();
    });
  }

  initVolume() {
    for (let player of this.players) {
      console.log(player);
      this.lms.getVolume(player)
      .subscribe((result) => { player.volume = parseInt(result.result._volume)});
    }
  }

  ngOnInit() {
    console.log('ngOnInit PlayersPage');
    this.getPlayers();
  }

  turnOnOff(player: Player) {
    console.log('turnOnOff');
    this.lms.turnOnOff(player, player.power)
    .subscribe();
  }

  setCurrentPlayer(player: Player) {
    console.log('setCurrentPlayer');
    this.lms.setCurrentPlayer(player);
  }

  getCurrentPlayerId(): string {
    return this.lms.currentPlayerId;
  }

  setVolume(player: Player) {
    console.log('setVolume');
    this.lms.setVolume(player, String(player.volume))
    .subscribe();
    //this.showToast("Volume set to "+String(player.volume)+" %");
  }

  async openSettings() {
    const modal = await this.modalCtrl.create({component: SettingsComponent});
    return await modal.present();
  }

  async showToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
}