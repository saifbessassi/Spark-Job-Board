import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Job } from '../../models/job';
import { JobFiltersOptions } from '../../models/job-filters-options.model';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  readonly API_URL = environment.API_URL + '/api/jobs';

  constructor(private http: HttpClient) { }

  getOneJob(id: number) {
    return this.http.get<Job>(this.API_URL + '/' + id + '.json');
  }

  addNewJob(job) {
    job.skills.forEach((element, index) => {
      job.skills[index] = '/api/skills/' + element;
    });
    job.category = '/api/categories/' + job.category;
    job.status = 'open';
    return this.http.post<Job>(this.API_URL, job);
  }

  editJob(job, id) {
    job.skills.forEach((element, index) => {
      job.skills[index] = '/api/skills/' + element;
    });
    job.category = '/api/categories/' + job.category;
    return this.http.put<Job>(this.API_URL + '/' + id, job);
  }
  
  deleteJob(id) {
    return this.http.delete(this.API_URL + '/' + id);
  }

  editJobStatus(id, status: string, deadline?) {
    let data;
    if (deadline) {
      data = {
        status,
        deadline
      };
    } else {
      data = {
        status
      };
    }
    return this.http.put<Job>(this.API_URL + '/' + id, data);
  }

  getRecentOpenJobs() {
    const today = this.todayDate();
    return this.http.get(this.API_URL + '.json?status=open&deadline[after]=' + today + '&order[createdAt]=desc&itemsPerPage=5');
  }

  getRecentJobs() {
    return this.http.get(this.API_URL + '?order[createdAt]=desc&itemsPerPage=5');
  }

  getCandidateJobs(options: {key: string, value: string}[], pageNb: number, orderParam?: string) {
    let filter = '';
    let pageParam = '';
    if (options) {
      options.forEach(option => {
        filter += '&' + option.key + '[]=' + option.value;
      });
    }
    if (orderParam) {
      orderParam = '&' + orderParam;
    }
    if (pageNb) {
      pageParam = '&_page=' + pageNb;
    }
    const today = this.todayDate();

    return this.http.get(this.API_URL + '?status=open&deadline[after]=' + today + filter + orderParam + pageParam);
  }

  getNbJobsPerCategory(isOpen?: boolean) {
    if (isOpen !== undefined) {
      return this.http.get(this.API_URL + '/nb-per-category', {params: {open: isOpen.toString()}});
    }
    return this.http.get(this.API_URL + '/nb-per-category');
  }

  getNbJobsPerStatus() {
    return this.http.get(this.API_URL + '/nb-per-status');
  }

  getNbApplicationPerStatus(jobID: number) {
    return this.http.get(this.API_URL + '/nb-applications/' + jobID);
  }

  getFilterOptions() {
    return this.http.get<JobFiltersOptions>(this.API_URL + '/filter-options');
  }

  todayDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return dd + '-' + mm + '-' + yyyy;
  }
}
