import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController} from '@ionic/angular';
import { LmsService } from '../../services/lms.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

  serverAddress: string;

  serverForm: FormGroup;

  constructor(public modalCtrl: ModalController,
      private lms: LmsService, public formBuilder: FormBuilder) {

    this.serverAddress = localStorage.getItem('serverAddress');

    this.serverForm = this.formBuilder.group({
        serverAddressControl: new FormControl( this.serverAddress, [Validators.compose([Validators.required, Validators.pattern('^https?://.*:[0-9]+$')])]) 
    });
  }

  ngOnInit() {
      console.log('settings::ngOnInit serverAddress:'+this.serverAddress);
  }
  
  cancelModal() {
    this.modalCtrl.dismiss();
  }
 
  applyModal() {
    //Save settings
    localStorage.setItem('serverAddress', this.serverAddress);
    this.lms.updateServerAddress(this.serverAddress);
    this.modalCtrl.dismiss();
  }
}
