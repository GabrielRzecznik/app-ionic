import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetoutPageRoutingModule } from './getout-routing.module';

import { GetoutPage } from './getout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetoutPageRoutingModule
  ],
  declarations: [GetoutPage]
})
export class GetoutPageModule {}
