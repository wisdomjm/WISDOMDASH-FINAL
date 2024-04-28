import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'addcontent',
    loadChildren: () => import('./addcontent/addcontent.module').then( m => m.AddcontentPageModule)
  },
  {
    path: 'paymentsys',
    loadChildren: () => import('./paymentsys/paymentsys.module').then( m => m.PaymentsysPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'recover',
    loadChildren: () => import('./recover/recover.module').then( m => m.RecoverPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'detallecurso/:idcurso',
    loadChildren: () => import('./detallecurso/detallecurso.module').then( m => m.DetallecursoPageModule)
  },
  {
    path: 'desarrollos',
    loadChildren: () => import('./desarrollos/desarrollos.module').then( m => m.DesarrollosPageModule)
  },
  {
    path: 'informaciondelusuario/:idusuario',
    loadChildren: () => import('./informaciondelusuario/informaciondelusuario.module').then( m => m.InformaciondelusuarioPageModule)
  },
  {
    path: 'editarcurso/:curso',
    loadChildren: () => import('./editarcurso/editarcurso.module').then( m => m.EditarcursoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
