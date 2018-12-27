import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrimaryPage } from './primary';

@NgModule({
  declarations: [
    PrimaryPage,
  ],
  imports: [
    IonicPageModule.forChild(PrimaryPage),
  ],
})
export class PrimaryPageModule {}
