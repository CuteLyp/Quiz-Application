import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecondaryPage } from './secondary';

@NgModule({
  declarations: [
    SecondaryPage,
  ],
  imports: [
    IonicPageModule.forChild(SecondaryPage),
  ],
})
export class SecondaryPageModule {}
