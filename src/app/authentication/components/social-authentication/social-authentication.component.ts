import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService as SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { TokenService } from 'src/app/core/services/token/token.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sp-social-authentication',
  templateUrl: './social-authentication.component.html',
  styleUrls: ['./social-authentication.component.scss']
})
export class SocialAuthenticationComponent implements OnInit {

  @Output() outputIsLoading = new EventEmitter<boolean>();
  @Output() outputError_msg = new EventEmitter<string>();
  @Output() outputAuth = new EventEmitter<boolean>();
  @Input() location: string;

  isLoading: boolean;
  error_msg: string;

  constructor(
    private tokenService: TokenService,
    public OAuth: SocialAuthService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  socialSignIn(provider: string) {
    this.isLoading = true;
    this.outputIsLoading.emit(this.isLoading);
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
      this.outputError_msg.emit(this.error_msg);
      this.isLoading = false;
      this.outputIsLoading.emit(this.isLoading);
  });
  }

  socialSigninReq(token: string, provider: string) {
    this.authenticationService.socialLogin(token, provider).subscribe( (res: {access_token: string, refresh_token: string}) => {
      this.tokenService.setToken(res.access_token);
      this.tokenService.setRefreshToken(res.refresh_token);
      if (this.location === 'signin') {
        this.router.navigate(['/']);
      } else if (this.location === 'apply') {
        this.outputAuth.emit(true);
      }
      
      this.isLoading = false;
      this.outputIsLoading.emit(this.isLoading);
  }, err => {
      this.error_msg = err.error;
      this.outputError_msg.emit(this.error_msg);
      this.isLoading = false;
      this.outputIsLoading.emit(this.isLoading);
  });
  }
}
