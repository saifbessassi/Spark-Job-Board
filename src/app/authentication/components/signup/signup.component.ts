import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token/token.service';
import { AuthService as SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { PasswordValidator } from 'src/app/core/services/auth/passwordValidator.service';

@Component({
  selector: 'sp-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  focus;
  focus1;
  focus2;
  focus3;
  signupForm: FormGroup;
  isAgree: boolean;
  signup_error = [];
  isLoading = false;
  error_msg: string;
  success_msg: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private passwordValidator: PasswordValidator,
    public OAuth: SocialAuthService,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
        'fullname' : new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
        'email' : new FormControl(null, [Validators.required, Validators.email]),
        'password' : new FormControl(null, [Validators.required, Validators.minLength(8)]),
        'retypedPassword' : new FormControl(null, [Validators.required]),
        'isAgree': new FormControl(null, Validators.required),
    }, {
        validator: this.passwordValidator.MustMatch('password', 'retypedPassword'),
    });
  }

  signup() {
    this.signup_error = [];
    this.success_msg = null;
    this.isLoading = true;
    const candidate = {
        email: this.signupForm.get('email').value,
        fullname: this.signupForm.get('fullname').value,
        password: this.signupForm.get('password').value,
        retypedPassword: this.signupForm.get('retypedPassword').value,
    };
    this.authenticationService.signup(candidate).subscribe(res => {
        this.success_msg = 'You have successfully registered. Please check your email inbox to verify your account';
        setTimeout(() => {
            this.router.navigate(['candidate/landing']);
        }, 6000);
        this.isLoading = false;
    }, errors => {
        errors.error.violations.forEach(element => {
            this.signup_error.push(element.propertyPath + ': ' + element.message);
        });
        this.isLoading = false;
    });
  }

  // public socialSignUp(provider) {
  //     this.authenticationService.connect(provider);
  // }

  public socialSignUp(socialProvider: string) {
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.isLoading = true;
    this.OAuth.signIn(socialPlatformProvider).then(googleUser => {
      // TODO: send token and provider name to backend
      this.authenticationService.socialLogin(googleUser.idToken, 'google').subscribe( (res: {access_token: string, refresh_token: string}) => {
        this.tokenService.setToken(res.access_token);
        this.tokenService.setRefreshToken(res.refresh_token);
        this.success_msg = 'You have been successfully logged in.';
        this.router.navigate(['/']);
        this.isLoading = false;
      }, err => {
        this.error_msg = err;
        this.isLoading = false;
      });
    }, err => {
      this.error_msg = err;
      this.isLoading = false;
    });
  }

}
