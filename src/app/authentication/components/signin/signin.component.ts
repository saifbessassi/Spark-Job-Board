import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { Router } from '@angular/router';
import { AuthService as SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'sp-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  focus;
  focus1;
  isLoading = false;
  error_msg = null;
  loginForm: FormGroup;
  login_error: string[] = [];


  constructor(
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    public OAuth: SocialAuthService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  emailSignin() {
    this.login_error = [];
    this.isLoading = true;
    const candidate = this.loginForm.value;

    this.authenticationService.signin(candidate).subscribe(res => {
      this.tokenService.setToken(res.token);
      this.tokenService.setRefreshToken(res.refresh_token);
      this.router.navigate(['/']);
      this.isLoading = false;
    }, errors => {
      this.login_error.push(errors.error.message);
      this.isLoading = false;
    });
  }

  socialSignIn(provider: string) {
    this.isLoading = true;
    let providerID;
    switch (provider) {
      case 'google':
        providerID = GoogleLoginProvider.PROVIDER_ID;
        break;
      case 'facebook':
        providerID = FacebookLoginProvider.PROVIDER_ID;
        break;
      default:
        break;
    }
    
    this.OAuth.signIn(providerID).then(user => {
      let token = user.authToken;
      if(provider === 'google') {
        token = user.idToken;
      }
      this.socialSigninReq(token, provider);
    }, err => {
      this.error_msg = err;
      this.isLoading = false;
    });
  }

  socialSigninReq(token: string, provider: string) {
    this.authenticationService.socialLogin(token, provider).subscribe( (res: {access_token: string, refresh_token: string}) => {
      this.tokenService.setToken(res.access_token);
      this.tokenService.setRefreshToken(res.refresh_token);
      this.router.navigate(['/']);
      this.isLoading = false;
    }, err => {
      console.log('ok')
      this.error_msg = err.error;
      this.isLoading = false;
    });
  }

}
