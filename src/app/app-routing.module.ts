import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './core/layouts/app-layout/app-layout.component';
import { ALL_ROUTES, AUTH_ROUTES } from './core/routes/all-routes';
import { AuthLayoutComponent } from './authentication/layout/auth-layout/auth-layout.component';


const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: ALL_ROUTES
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: AUTH_ROUTES
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
