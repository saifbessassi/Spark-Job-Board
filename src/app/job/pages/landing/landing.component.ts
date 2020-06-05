import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/core/models/job';
import { JobService } from 'src/app/core/services/job/job.service';
import { JobFiltersOptions } from 'src/app/core/models/job-filters-options.model';

@Component({
  selector: 'sp-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  title = 'Find Jobs Now more Easy Way';
  // tslint:disable-next-line:max-line-length
  text = 'Spark-it is a digital services company. We offer digital development and consulting solutions for all market players: Start-up, SMEs and large groups.';

  isLoading = false;
  isLoadingCategory = false;
  recentJobs: Job[] = [];
  nbJobsPerCategory: any = null;
  errorMsg: string;
  filterOptions: JobFiltersOptions;

  constructor(
    private jobService: JobService
  ) { }

  ngOnInit() {
    // Get recent jobs
    this.isLoading = true;
    this.jobService.getRecentOpenJobs().subscribe( (res: Job[]) => {
      this.recentJobs = res;
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      this.errorMsg = 'Unknown error! Please try again later.';
    });

    // Get number of jobs per category
    this.isLoadingCategory = true;
    this.jobService.getNbJobsPerCategory(true).subscribe( res => {
      this.nbJobsPerCategory = res;
      this.isLoadingCategory = false;
    }, err => {
      this.isLoadingCategory = false;
    });

    // Get filter options with jobs count
    this.jobService.getFilterOptions().subscribe( res => {
      this.filterOptions = res;
    }, err => {
    });
  }
}
