import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { Router } from '@angular/router';

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
    private router: Router
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

}
