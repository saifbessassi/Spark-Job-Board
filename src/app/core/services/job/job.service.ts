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

  getFilterOptions() {
    return this.http.get<JobFiltersOptions>(API_URL + '/api/jobs/filter-options');
  }
}
