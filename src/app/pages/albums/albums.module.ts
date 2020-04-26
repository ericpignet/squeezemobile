import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbumsPageRoutingModule } from './albums-routing.module';
import { TopBarComponentModule } from '../../components/top-bar/top-bar.module';
import { AlbumsPage } from './albums.page';
import { SongsPageModule } from '../songs/songs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopBarComponentModule,
    AlbumsPageRoutingModule,
    SongsPageModule
  ],
  declarations: [AlbumsPage],
  exports: [AlbumsPage]
})
export class AlbumsPageModule {}
