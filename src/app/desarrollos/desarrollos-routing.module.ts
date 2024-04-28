import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesarrollosPage } from './desarrollos.page';

const routes: Routes = [
  {
    path: '',
    component: DesarrollosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesarrollosPageRoutingModule {}
