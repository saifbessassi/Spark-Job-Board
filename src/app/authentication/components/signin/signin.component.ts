import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { Router } from '@angular/router';
import { AuthService as SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { first } from 'rxjs/operators';

@Component({
  selector: 'sp-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  @Input() location = 'signin';
  @Output() outputAuth = new EventEmitter<boolean>();

  focus;
  focus1;
  isLoading = false;
  errorMsg = null;
  loginForm: FormGroup;
  loginError: string[] = [];


  constructor(
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    public OAuth: SocialAuthService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      email : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  emailSignin() {
    this.loginError = [];
    this.isLoading = true;
    const candidate = this.loginForm.value;

    this.authenticationService.signin(candidate)
      .pipe(first())
      .subscribe(
        data => {
          if (this.location === 'signin') {
            this.router.navigate(['/']);
          } else if (this.location === 'apply') {
            this.outputAuth.emit(true);
          }
          this.isLoading = false;
        },
        error => {
          this.loginError.push(error.error.message);
          this.isLoading = false;
        }
      );
  }

  getSocialAuthIsLoading($event) {
    this.isLoading = $event;
  }

  getSocialAutherrorMsg($event) {
    this.errorMsg = $event;
  }

  getSocialAuthTrue($event) {
    this.outputAuth.emit($event);
  }
}
