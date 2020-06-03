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

  title = 'Our Available Offers';
  text = '';
  nbJobs: number;
  nbJobsPerPage = 10;
  isLoading = false;
  jobs: Job[] = [];
  categoryFilterParam;
  getJobsError: string;
  getFiltersError: string;
  filterOptions: any;
  filterParams: FilterChoice[] = [];
  orderParam = '';
  pageParam = 1;
  checkedValues: string[] = [];
  filterChoice: FilterChoice;

  constructor(
    private jobService: JobService
  ) { }

  ngOnInit() {
    if (history.state.data) {
      history.state.data.forEach(element => {
        this.checkedValues.push(element.value);
      });
      this.filterParams = (history.state.data);
    }

    // Get jobs
    this.getJobs();

    // Get filter options with jobs count
    this.jobService.getFilterOptions().subscribe( res => {
      this.filterOptions = res;
    }, err => {
      this.getFiltersError = err.statusText + '! Please try again later.';
    });

  }

  getJobs() {
    this.isLoading = true;
    this.jobService.getCandidateJobs(this.filterParams, this.pageParam, this.orderParam).subscribe( res => {
      this.jobs = res['hydra:member'];
      this.nbJobs = res['hydra:totalItems'];
      this.isLoading = false;
    }, err => {
      this.getJobsError = err.statusText + '! Please try again later.';
      this.isLoading = false;
    });
  }

  addFilter($event) {
    this.pageParam = 1;
    this.filterChoice = $event;
    const index = this.filterParams.findIndex(element => element.value === this.filterChoice.value);

    if (index > -1) {
      this.filterParams.splice(index, 1);
    } else {
      this.filterParams.push(this.filterChoice);
    }

    this.getJobs();
  }

  onOrder($event) {
    this.orderParam = $event.target.value;
    this.getJobs();
  }

  onPage($event) {
    this.pageParam = $event;
    this.getJobs();
  }

}
