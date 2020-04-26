import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopBarComponentModule } from '../../components/top-bar/top-bar.module';
import { GenresPageRoutingModule } from './genres-routing.module';

import { GenresPage } from './genres.page';
import { AlbumsPageModule } from '../albums/albums.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenresPageRoutingModule,
    AlbumsPageModule,
    TopBarComponentModule
  ],
  declarations: [GenresPage]
})
export class GenresPageModule {}
