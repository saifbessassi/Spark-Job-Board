import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Token } from '../../models/token.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


const API_URL = environment.API_URL;

interface RefreshResponse {
  token: string;
  refresh_token: string
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  
  constructor(
    private http: HttpClient
  ) { }

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

  refreshToken() {
    const refresh = {
      'refresh_token': this.getRefreshToken()
    }
    return this.http.post<RefreshResponse>(API_URL + '/api/token/refresh', refresh)
      .pipe(tap((data) => {
        const payload = jwt_decode(data.token);
        let token = new Token();
  
        token.access_token = data.token;
        token.refrech_token = data.refresh_token;
        token.exp = payload['exp'];
        token.iat = payload['iat'];
        localStorage.setItem('token', JSON.stringify(token));
      }));
  }

}
