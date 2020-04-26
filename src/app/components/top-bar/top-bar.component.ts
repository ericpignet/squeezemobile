import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsComponent } from '../settings/settings.component'

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {

  @Input() title : string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openSettings() {
    const modal = await this.modalCtrl.create({component: SettingsComponent});
    return await modal.present();
  }
}
