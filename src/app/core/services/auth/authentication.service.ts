import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

  signin(user) {
    return this.http.post<{token: string, refresh_token: string}>(API_URL + '/api/login_check', user);
  }

  signup(candidate) {
    return this.http.post(API_URL + '/api/candidates', candidate);
  }

  changePassword(passwords) {
    const id = this.tokenService.getId();
    return this.http.put<{token: string, refresh_token: string}>(API_URL + '/api/users/' + id + '/reset-password', passwords);
  }
}
