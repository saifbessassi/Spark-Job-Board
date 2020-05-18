import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../../models/job';
import { JobFiltersOptions } from '../../models/job-filters-options.model';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getOneJob(id: number) {
    return this.http.get<Job>(API_URL + '/api/jobs/' + id +'.json');
  }

  addNewJob(job) {
    job.skills.forEach((element, index) => {
      job['skills'][index] = '/api/skills/' + element;
    });
    job.category = '/api/categories/' + job.category;
    job.status = 'open';
    return this.http.post<Job>(API_URL + '/api/jobs', job);
  }

  editJob(job, id) {
    job.skills.forEach((element, index) => {
      job['skills'][index] = '/api/skills/' + element;
    });
    job.category = '/api/categories/' + job.category;
    return this.http.put<Job>(API_URL + '/api/jobs/' + id, job);
  }

  getRecentJobs() {
    return this.http.get(API_URL + '/api/jobs?status=open&order[createdAt]=desc&itemsPerPage=5');
  }


  getCandidateJobs(options: {key: string, value: string}[], pageNb: number, orderParam?: string) {
    let filter = '';
    let pageParam = '';
    if(options) {
      options.forEach(option => {
        filter += '&' + option.key + '[]=' + option.value;
      })
    }
    if(orderParam) {
      orderParam = '&' + orderParam;
    }
    if (pageNb) {
      pageParam = '&_page=' + pageNb;
    }
    
    return this.http.get(API_URL + '/api/jobs?status=open' + filter + orderParam + pageParam);
  }

  getNbJobsPerCategory() {
    return this.http.get(API_URL + '/api/jobs/nb-per-category');
  }

  getNbJobsPerStatus() {
    return this.http.get(API_URL + '/api/jobs/nb-per-status');
  }

  getFilterOptions() {
    return this.http.get<JobFiltersOptions>(API_URL + '/api/jobs/filter-options');
  }

  deleteJob(id) {
    return this.http.delete(API_URL + '/api/jobs/' + id);
  }
}
