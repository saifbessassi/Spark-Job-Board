import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService as SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { TokenService } from 'src/app/core/services/token/token.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'sp-social-authentication',
  templateUrl: './social-authentication.component.html',
  styleUrls: ['./social-authentication.component.scss']
})
export class SocialAuthenticationComponent implements OnInit {

  @Output() outputIsLoading = new EventEmitter<boolean>();
  @Output() outputerrorMsg = new EventEmitter<string>();
  @Output() outputAuth = new EventEmitter<boolean>();
  @Input() location: string;

  isLoading: boolean;
  errorMsg: string;

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
      if (provider === 'google') {
        token = user.idToken;
      }
      this.socialSigninReq(token, provider);
    }, err => {
      this.errorMsg = err;
      this.outputerrorMsg.emit(this.errorMsg);
      this.isLoading = false;
      this.outputIsLoading.emit(this.isLoading);
  });
  }

  socialSigninReq(token: string, provider: string) {
    this.authenticationService.socialSignin(token, provider)
      .pipe(first())
      .subscribe(
        data => {
          if (this.location === 'signin' || this.location === 'signup') {
            this.router.navigate(['/']);
          } else if (this.location === 'apply') {
            this.outputAuth.emit(true);
          }
          this.isLoading = false;
          this.outputIsLoading.emit(this.isLoading);
        },
        error => {
          this.errorMsg = error.error;
          this.outputerrorMsg.emit(this.errorMsg);
          this.isLoading = false;
          this.outputIsLoading.emit(this.isLoading);
        }
      );
  }
}
