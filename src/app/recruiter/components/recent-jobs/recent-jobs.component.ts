import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/core/services/job/job.service';
import { Job } from 'src/app/core/models/job';

@Component({
  selector: 'sp-recent-jobs',
  templateUrl: './recent-jobs.component.html',
  styleUrls: ['./recent-jobs.component.scss']
})
export class RecentJobsComponent implements OnInit {

  errorMsg: string;
  recentJobs: Job[] = [];

  constructor(
    private jobService: JobService
  ) { }

  ngOnInit() {
    this.jobService.getRecentJobs().subscribe( res => {
      this.recentJobs = res['hydra:member'];
    }, err => {
      this.errorMsg = 'Unknown error! Please try again later.';
    });
  }

}
