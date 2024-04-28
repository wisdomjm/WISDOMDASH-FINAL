import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsysPageRoutingModule } from './paymentsys-routing.module';

import { PaymentsysPage } from './paymentsys.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentsysPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PaymentsysPage]
})
export class PaymentsysPageModule {}
