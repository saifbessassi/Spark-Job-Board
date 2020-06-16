import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/core/services/password/password.service';

@Component({
  selector: 'sp-password-request-recovery-code',
  templateUrl: './password-request-recovery-code.component.html',
  styleUrls: ['./password-request-recovery-code.component.scss']
})
export class PasswordRequestRecoveryCodeComponent implements OnInit {

  requestCodeForm: FormGroup;
  isLoading = false;
  successMsg: string;
  errorMsg: string;
  
  constructor(
    private router: Router,
    private passwordService: PasswordService
  ) { }

  ngOnInit() {
    this.requestCodeForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email])
    });
  }

  requestPasswordRecoveryCode() {
    this.isLoading = true;
    this.errorMsg = null;
    this.successMsg = null;
    const requestData = this.requestCodeForm.value.email;
    
    this.passwordService.requesPasswordRecoveryCode(requestData).subscribe( (res: {message: string}) => {
      this.successMsg = res.message;
      setTimeout(() => {
        this.router.navigate(['candidate/auth/reset-password-with-code']);
      }, 3000);
      this.isLoading = false;
    }, err => {
      this.errorMsg = err.error;
      this.isLoading = false;
    })
  }
}
