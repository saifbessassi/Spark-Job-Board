import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(
    private http: HttpClient
  ) { }

  requesPasswordRecoveryCode(email: string) {
    return this.http.post(API_URL + '/api/users/request-password-code', {email: email});
  }

  resetPasswordWithCode(requestData) {
    return this.http.post(API_URL + '/api/users/reset-password', requestData);
  }

  verifyPasswordRecoveryCode(code: string) {
    return this.http.post(API_URL + '/api/users/verify-password-code', {passwordRecoveryCode: code});
  }
}
