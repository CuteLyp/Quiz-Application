import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HighPage } from './high';

@NgModule({
  declarations: [
    HighPage,
  ],
  imports: [
    IonicPageModule.forChild(HighPage),
  ],
})
export class HighPageModule {}
