import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor(

  ) { }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refrech_token');
  }

  setToken(access_token) {
    localStorage.setItem('access_token', access_token);
  }

  setRefreshToken(refrech_token) {
    localStorage.setItem('refrech_token', refrech_token);
  }

  clear() {
    localStorage.clear();
  }

  getPayload() {
    const token = this.getToken();
    if (token) {
      return jwt_decode(token);
    }
    return null;
  }
}
