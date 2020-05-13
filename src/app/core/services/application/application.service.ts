import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }
 
  apply(jobId: number, candidateId: number, message: string) {
    const application = {
      job: '/api/jobs/' + jobId,
      candidate: '/api/candidates/' + candidateId,
      message: message
    }
    return this.http.post(API_URL + '/api/job_applications', application);
  }
}
