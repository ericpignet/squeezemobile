import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  declarations: [SettingsComponent],
  exports: [SettingsComponent],
  entryComponents: [SettingsComponent]
})
export class SettingsComponentModule {}
