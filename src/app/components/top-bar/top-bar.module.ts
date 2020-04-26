import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopBarComponent } from './top-bar.component';
import { SettingsComponentModule } from '../settings/settings.module';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, SettingsComponentModule],
  declarations: [TopBarComponent],
  exports: [TopBarComponent]
})
export class TopBarComponentModule {}
