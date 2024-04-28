import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsysPage } from './paymentsys.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentsysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsysPageRoutingModule {}
