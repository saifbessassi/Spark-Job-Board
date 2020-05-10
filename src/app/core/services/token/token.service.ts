import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Token } from '../../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  token: Token;
  
  constructor(

  ) {
    this.token = JSON.parse(localStorage.getItem('token'));
  }

  getToken() {
    if (this.token) {
      return this.token.access_token;
    }
    return null;
  }

  getRefreshToken() {
    if (this.token) {
      return this.token.refrech_token;
    }
    return null;
  }

  clear() {
    localStorage.clear();
  }
}
