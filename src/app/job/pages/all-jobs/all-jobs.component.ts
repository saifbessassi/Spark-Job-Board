import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/core/models/job';
import { JobService } from 'src/app/core/services/job/job.service';
import { FilterChoice } from 'src/app/core/models/filter-choice.model';

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
  filterParams: FilterChoice[] = [];
  orderParam: string = "";
  checkedCategory: string;
  filterChoice: FilterChoice;

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
    this.getJobs(this.filterParams, this.orderParam);

    // Get filter options with jobs count
    this.jobService.getFilterOptions().subscribe( res => {
      this.filterOptions = res;
    }, err => {
      this.getFilters_error = err.statusText + '! Please try again later.';
    })
    
  }

  getJobs(params, orderParam) {
    this.isLoading = true;
    this.jobService.getJobs(params, orderParam).subscribe( res => {
      this.jobs = res;
      this.nb_jobs = this.jobs.length;
      this.isLoading = false;
    }, err => {
      this.getJobs_error = err.statusText + '! Please try again later.';
      this.isLoading = false;
    })
  }

  addFilter($event) {
    this.filterChoice = $event;
    const index = this.filterParams.findIndex(element => element.value === this.filterChoice.value);

    if (index > -1) {
      this.filterParams.splice(index, 1);
    } else {
      this.filterParams.push(this.filterChoice);
    }

    this.getJobs(this.filterParams, this.orderParam);
  }

  order($event) {
    this.orderParam = $event.target.value;
    this.getJobs(this.filterParams, this.orderParam);
  }

}
