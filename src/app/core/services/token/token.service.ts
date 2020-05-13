import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Token } from '../../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  
  constructor() { }

  getAccessToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      return token.access_token;
    }
    return null;
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    return token;
  }

  getRefreshToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      return token.refrech_token;
    }
    return null;
  }

  clear() {
    localStorage.clear();
  }
}
