import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/core/models/job';
import { JobService } from 'src/app/core/services/job/job.service';

@Component({
  selector: 'sp-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss']
})
export class AllJobsComponent implements OnInit {

  title = "Our Available Offers";
  text = "";
  nb_jobs: number;
  isLoading = false;
  jobs: Job[] = [];
  category_filter_param;
  getJobs_error: string;
  getFilters_error: string;
  filterOptions: any;
  filterParams: any[] = [];
  checkedCategory: string;

  constructor(
    private jobService: JobService
  ) { }

  ngOnInit() {
    if (history.state.data) {
      this.category_filter_param = history.state.data[0];
      const key = this.category_filter_param.key;
      const value = this.category_filter_param.value;
      this.checkedCategory = value;
      this.filterParams.push({key, value});
    }

    // Get jobs
    this.getJobs(this.filterParams);

    // Get filter options with jobs count
    this.jobService.getFilterOptions().subscribe( res => {
      this.filterOptions = res;
    }, err => {
      this.getFilters_error = err.statusText + '! Please try again later.';
    })
    
  }

  getJobs(params?) {
    this.isLoading = true;
    this.jobService.getJobs(params).subscribe( res => {
      this.jobs = res;
      this.nb_jobs = this.jobs.length;
      this.isLoading = false;
    }, err => {
      this.getJobs_error = err.statusText + '! Please try again later.';
      this.isLoading = false;
    })
  }

  addFilter(key, value) {
    const index = this.filterParams.findIndex(element => element.value === value);

    if (index > -1) {
      this.filterParams.splice(index, 1);
    } else {
      this.filterParams.push({key, value})
    }

    this.getJobs(this.filterParams);
  }

}
