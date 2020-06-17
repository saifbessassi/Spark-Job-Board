import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PasswordRequestRecoveryCodeComponent } from './components/password-request-recovery-code/password-request-recovery-code.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { EnsureOnlyNonConnectedVisitAuthPages } from '../core/guards/ensure-only-non-connected-visit-auth-pages.service';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { MustBeConnected } from '../core/guards/must-be-connected.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signin',
        canActivate: [EnsureOnlyNonConnectedVisitAuthPages],
        component: SigninComponent
      },
      {
        path: 'signup',
        canActivate: [EnsureOnlyNonConnectedVisitAuthPages],
        component: SignupComponent
      },
      {
        path: 'password-recovery-code',
        canActivate: [EnsureOnlyNonConnectedVisitAuthPages],
        component: PasswordRequestRecoveryCodeComponent
      },
      {
        path: 'password-reset',
        canActivate: [EnsureOnlyNonConnectedVisitAuthPages],
        component: PasswordResetComponent
      },
      { path: '', redirectTo: 'signin', pathMatch: 'full' }
    ]
  },
  {
    path: 'password',
    canActivate: [MustBeConnected],
    component: PasswordChangeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
