import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayersPageRoutingModule } from './players-routing.module';
import { TopBarComponentModule } from '../../components/top-bar/top-bar.module';

import { PlayersPage } from './players.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopBarComponentModule,
    PlayersPageRoutingModule
  ],
  declarations: [PlayersPage]
})
export class PlayersPageModule {}
