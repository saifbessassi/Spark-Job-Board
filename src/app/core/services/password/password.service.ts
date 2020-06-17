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

  changePassword(passwords) {
    const id = JSON.parse(localStorage.getItem('currentUser')).id;
    return this.http.put<{token: string, refresh_token: string}>(API_URL + '/api/users/' + id + '/reset-password', passwords);
  }
}
