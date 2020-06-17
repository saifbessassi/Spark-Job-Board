import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/core/services/auth/passwordValidator.service';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/core/services/password/password.service';
import { Token } from 'src/app/core/models/token.model';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'sp-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  isLoading = false;
  passwordForm: FormGroup;
  errorMsg: string;
  passwordError: string;
  successMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private passwordValidator: PasswordValidator,
    private passwordService: PasswordService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initPasswordForm();
  }

  private initPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      'newPassword': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'newRetypedPassword': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'oldPassword': new FormControl(null, [Validators.required, Validators.minLength(8)]),
    }, {
      validators: ([
        this.passwordValidator.MustMatch('newPassword', 'newRetypedPassword'),
        this.passwordValidator.DontMatch('oldPassword', 'newPassword')
      ]),
    });
  }

  changePassword() {
    this.errorMsg = null;
    this.successMsg = null;
    this.isLoading = true;
    const passwords = this.passwordForm.value;
    this.passwordService.changePassword(passwords).subscribe(res => {
      this.tokenService.setToken(res);
      this.successMsg = 'Your password has been successfully changed.';
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);
      this.isLoading = false;
    }, err => {
      console.log(err)
      if(err.status === 400) {
        this.errorMsg = err.error;
      } else {
        this.errorMsg = "Unknown error! Please try again later.";
      }
      this.isLoading = false;
    });
  }

}
