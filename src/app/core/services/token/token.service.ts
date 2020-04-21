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

  getId() {
    const payload = this.getPayload();
    if (payload) {
      return payload['id'];
    }
    return null;
  }

  getRoles(): string[] | null {
    const payload = this.getPayload();
    if (payload) {
    return payload['roles'];
    }
    return null;
  }

  getFullname(): string | null {
    const payload = this.getPayload();
    if (payload) {
    return payload['fullname'];
    }
    return null;
  }

  getEmail(): string | null {
    const payload = this.getPayload();
    if (payload) {
    return payload['username'];
    }
    return null;
  }

  getPhoto(): string | null {
    const payload = this.getPayload();
    if (payload) {
    return payload['photo'];
    }
    return null;
  }

  isRecruiter() {
    const roles = this.getRoles();
    if (roles) {
      if (roles.includes('ROLE_RECRUITER')) {
        return true;
      }
      return false;
    }
    return null;
  }

  isCandidate() {
    const roles = this.getRoles();
    if (roles) {
      if (roles.includes('ROLE_CANDIDATE')) {
        return true;
      }
      return false;
    }
    return null;
  }

  isValid() {
    if (!this.getToken()) {
      return false;
    }
    const payload = this.getPayload();
    const exp = new Date(0);
    exp.setUTCSeconds(payload['exp']);
    const current_date = new Date();
    return exp > current_date;
  }
}
