import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistPageRoutingModule } from './playlist-routing.module';
import { TopBarComponentModule } from '../../components/top-bar/top-bar.module';

import { PlaylistPage } from './playlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopBarComponentModule,
    PlaylistPageRoutingModule
  ],
  declarations: [PlaylistPage]
})
export class PlaylistPageModule {}
