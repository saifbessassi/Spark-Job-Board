import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninComponent } from './components/signin/signin.component';
import { SharedModule } from '../shared/shared.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';


@NgModule({
  declarations: [
    SigninComponent, 
    AuthLayoutComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
