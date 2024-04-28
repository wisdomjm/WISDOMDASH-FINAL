import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesarrollosPageRoutingModule } from './desarrollos-routing.module';

import { DesarrollosPage } from './desarrollos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesarrollosPageRoutingModule
  ],
  declarations: [DesarrollosPage]
})
export class DesarrollosPageModule {}
