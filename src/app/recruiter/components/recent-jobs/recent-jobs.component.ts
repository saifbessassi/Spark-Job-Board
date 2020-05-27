import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/core/services/job/job.service';
import { Job } from 'src/app/core/models/job';

@Component({
  selector: 'sp-recent-jobs',
  templateUrl: './recent-jobs.component.html',
  styleUrls: ['./recent-jobs.component.scss']
})
export class RecentJobsComponent implements OnInit {

  msg_error: string;
  recentJobs: Job[] = [];

  constructor(
    private jobService: JobService
  ) { }

  ngOnInit() {
    this.jobService.getRecentJobs().subscribe( res => {
      this.recentJobs = res['hydra:member'];
      console.log(this.recentJobs)
    }, err => {
      this.msg_error = 'Unknown error! Please try again later.';
    })
  }

}
