import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../../models/job';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getRecentJobs() {
    return this.http.get<Job[]>(API_URL + '/api/jobs.json?status=open');
  }


  getJobs(options?: {key: string, value: string}[]) {
    let filter = '';
    if(options) {
      options.forEach(option => {
        filter += '&' + option.key + '[]=' + option.value;
      })
    }
    
    return this.http.get<Job[]>(API_URL + '/api/jobs.json?status=open' + filter);
  }

  getNbJobsPerCategory() {
    return this.http.get(API_URL + '/api/jobs/nb-per-category');
  }

  getFilterOptions() {
    return this.http.get(API_URL + '/api/jobs/filter-options');
  }
 
  applyForJob(jobId: number, candidateId: number) {
    const application = {
      job: '/api/jobs/' + jobId,
      candidate: '/api/candidates/' + candidateId,
      status: 'waiting'
    }
    return this.http.post(API_URL + '/api/job_applications', application);
  }
}
