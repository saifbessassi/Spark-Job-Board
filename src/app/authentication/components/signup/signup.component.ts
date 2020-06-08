import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token/token.service';
import { AuthService as SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { PasswordValidator } from 'src/app/core/services/auth/passwordValidator.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'sp-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @Input() location: string;

  focus;
  focus1;
  focus2;
  focus3;
  signupForm: FormGroup;
  isAgree: boolean;
  signupError = [];
  isLoading = false;
  errorMsg: string;
  successMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private passwordValidator: PasswordValidator,
    public OAuth: SocialAuthService,
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
        fullname : new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
        email : new FormControl(null, [Validators.required, Validators.email]),
        password : new FormControl(null, [Validators.required, Validators.minLength(8)]),
        retypedPassword : new FormControl(null, [Validators.required]),
        isAgree: new FormControl(null, Validators.required),
    }, {
        validator: this.passwordValidator.MustMatch('password', 'retypedPassword'),
    });
  }

  signup() {
    this.signupError = [];
    this.successMsg = null;
    this.isLoading = true;
    const candidate = {
        email: this.signupForm.get('email').value,
        fullname: this.signupForm.get('fullname').value,
        password: this.signupForm.get('password').value,
        retypedPassword: this.signupForm.get('retypedPassword').value,
    };
    this.authenticationService.signup(candidate).subscribe(res => {
        this.successMsg = 'You have successfully registered. Please check your email inbox to verify your account';
        setTimeout(() => {
            this.router.navigate(['auth/signin']);
        }, 6000);
        this.isLoading = false;
    }, errors => {
        errors.error.violations.forEach(element => {
            this.signupError.push(element.propertyPath + ': ' + element.message);
        });
        this.isLoading = false;
    });
  }

  socialSignUp(provider: string) {
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
        this.errorMsg = 'An error occurred, please try again later.';
        return;
    }

    this.OAuth.signIn(providerID).then(user => {
      let token = user.authToken;
      if (provider === 'google') {
        token = user.idToken;
      }
      this.socialSignupReq(token, provider);
    }, err => {
      this.errorMsg = err;
      this.isLoading = false;
    });
  }

  socialSignupReq(token: string, provider: string) {
    this.authenticationService.socialSignin(token, provider)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
          this.isLoading = false;
        },
        error => {
          this.errorMsg = error.error;
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

}
