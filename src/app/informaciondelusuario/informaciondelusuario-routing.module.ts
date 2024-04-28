import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformaciondelusuarioPage } from './informaciondelusuario.page';

const routes: Routes = [
  {
    path: '',
    component: InformaciondelusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformaciondelusuarioPageRoutingModule {}
