import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class RecruiterService {

  constructor(private http: HttpClient) { }

  sendMail(mail) {
      return this.http.post(API_URL + '/api/send-mail', mail);
  }
}

