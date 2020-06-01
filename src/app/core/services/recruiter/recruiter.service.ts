import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class RecruiterService {

readonly API_URL = environment.API_URL + '/api';

constructor(private http: HttpClient) { }

  sendMail(mail: {subject: string, message: string, email: string}) {
    return this.http.post(this.API_URL + '/send-mail', mail);
  }

  getTotalCount() {
    return this.http.get(this.API_URL + '/total-count');
  }
}

