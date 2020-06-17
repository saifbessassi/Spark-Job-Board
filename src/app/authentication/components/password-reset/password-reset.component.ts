import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/core/services/password/password.service';
import { PasswordValidator } from 'src/app/core/services/auth/passwordValidator.service';

@Component({
  selector: 'sp-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  stepper: Stepper;
  codeRecoveryForm: FormGroup;
  newPasswordForm: FormGroup;
  isLoading = false;
  successMsg: string;
  errorMsg: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private passwordService: PasswordService,
    private passwordValidator: PasswordValidator
  ) { }

  ngOnInit() {
    // Init Stepper
    this.stepper = new Stepper(document.querySelector('#stepper'), {
      linear: true,
      animation: true
    });
    this.initRecoveryCodeForm();
    this.initNewPasswordForm();
  }

  initRecoveryCodeForm() {
    this.codeRecoveryForm = this.formBuilder.group({
      'passwordRecoveryCode' : new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    })
  }

  initNewPasswordForm() {
    this.newPasswordForm = this.formBuilder.group({
      'newPassword' : new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'newRetypedPassword' : new FormControl(null, [Validators.required, Validators.minLength(8)]),
    },{
        validator: (
          this.passwordValidator.MustMatch('newPassword', 'newRetypedPassword')
        ),
      }
    );
  }
  onCodeSubmit() {
    this.errorMsg = null;
    this.isLoading = true;
    this.passwordService.verifyPasswordRecoveryCode(this.codeRecoveryForm.value.passwordRecoveryCode).subscribe(
      res => {
        this.isLoading = false;
        this.stepper.next();
      },
      err => {
        this.isLoading = false;
        if (err.status === 404) {
          this.errorMsg = err.error;
        } else {
          this.errorMsg = "Unknown error! Please try again later.";
        }
      }
    );
  }
  onPasswordSubmit() {
    this.errorMsg = null;
    this.successMsg = null;
    this.isLoading = true;
    const request = {
      passwordRecoveryCode: this.codeRecoveryForm.value.passwordRecoveryCode,
      newPassword: this.newPasswordForm.value.newPassword,
      newRetypedPassword: this.newPasswordForm.value.newRetypedPassword
    }
    this.passwordService.resetPasswordWithCode(request).subscribe(
      res => {
        this.successMsg = res['message'];
        setTimeout(() => {
          this.router.navigate(['auth/signin']);
        }, 3000);
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
        this.errorMsg = "Unknown error! Please try again later.";
      }
    )
  }
}
