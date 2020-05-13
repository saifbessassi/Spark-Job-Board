import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { User } from '../../models/user.service';
import { Token } from '../../models/token.model';

const API_URL = environment.API_URL;

interface SigninResponse {
  token: string;
  refresh_token: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  signin(credentials) {
    return this.http.post<SigninResponse>(API_URL + '/api/login_check', credentials)
      .pipe(map(res => {
        return this.handleAuthentication(res);
      }));
  }

  // // To change provider's token for our application's token
  socialSignin(token: string, provider: string) {
    const request_data = {
      'token': token,
      'provider': provider,
    };
    return this.http.post<SigninResponse>(API_URL + '/api/candidate/social-login', request_data)
      .pipe(map(res => {
        return this.handleAuthentication(res);
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  // store user details and jwt token in local storage to keep user logged in between page refreshes
  handleAuthentication(data: SigninResponse) {
    const payload = jwt_decode(data.token);
    let user = new User();
    let token = new Token();

    token.access_token = data.token;
    token.refrech_token = data.refresh_token;
    token.exp = payload['exp'];
    token.iat = payload['iat'];
    user.id = payload['id'];
    user.email = payload['username'];
    user.fullname = payload['fullname'];
    user.picture = payload['picture'];
    user.roles = payload['roles'];

    // If user is a candidate, get his applied jobs
    if (user.roles.includes('ROLE_CANDIDATE')) {
      this.http.get(API_URL + '/api/job_applications/applied?id=' + user.id).subscribe(
        res => {
          user.appliedJobs = res['jobs'];
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', JSON.stringify(token));
          this.currentUserSubject.next(user);
        }
      )
    } else {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
      this.currentUserSubject.next(user);
    }
    
    return user;
  }

  signup(candidate) {
    return this.http.post(API_URL + '/api/candidates', candidate);
  }

  // changePassword(passwords) {
  //   const id = this.userService.getId();
  //   return this.http.put<{token: string, refresh_token: string}>(API_URL + '/api/users/' + id + '/reset-password', passwords);
  // }

  updatePicture(picture?) {
    let user = this.currentUserValue;
    if (picture) {
      user.picture = picture;
    } else {
      user.picture = null;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
