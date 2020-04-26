import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SongsPageRoutingModule } from './songs-routing.module';
import { TopBarComponentModule } from '../../components/top-bar/top-bar.module';
import { SongsPage } from './songs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongsPageRoutingModule,
    TopBarComponentModule
  ],
  declarations: [SongsPage]
})
export class SongsPageModule {}
