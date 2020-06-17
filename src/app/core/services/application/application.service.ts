import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  readonly API_URL = environment.API_URL + '/api/job_applications';

  constructor(private http: HttpClient) { }

  apply(jobId: number, message: string) {
    const application = {
      job: '/api/jobs/' + jobId,
      message
    };
    return this.http.post(this.API_URL, application);
  }

  makeDecision(status: string, id) {
    const statusJson = {status};
    return this.http.put(this.API_URL + '/' + id, statusJson);
  }

  getRecentApplications() {
    return this.http.get(this.API_URL + '?order[applicationDate]=desc&itemsPerPage=5');
  }
}
