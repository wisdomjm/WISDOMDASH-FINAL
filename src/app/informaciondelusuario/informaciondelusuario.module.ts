import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformaciondelusuarioPageRoutingModule } from './informaciondelusuario-routing.module';

import { InformaciondelusuarioPage } from './informaciondelusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformaciondelusuarioPageRoutingModule
  ],
  declarations: [InformaciondelusuarioPage]
})
export class InformaciondelusuarioPageModule {}
