import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninComponent } from './components/signin/signin.component';
import { SharedModule } from '../shared/shared.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { SignupComponent } from './components/signup/signup.component';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialAuthenticationComponent } from './components/social-authentication/social-authentication.component';
import { PasswordRequestRecoveryCodeComponent } from './components/password-request-recovery-code/password-request-recovery-code.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('269859930617-4k67asoa2fhi3fun17j4lkppvcgaennp.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('643671699786946')
  }
]);
export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    SigninComponent,
    AuthLayoutComponent, SignupComponent, SocialAuthenticationComponent, PasswordRequestRecoveryCodeComponent, PasswordResetComponent, PasswordChangeComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    SocialLoginModule
  ],
  exports: [
    SigninComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class AuthenticationModule { }
