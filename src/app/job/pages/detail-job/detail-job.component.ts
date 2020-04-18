import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/core/models/job';
import { JobService } from 'src/app/core/services/job/job.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sp-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.scss']
})
export class DetailJobComponent implements OnInit {

  title = 'Job details';
  text = '';
  isLoading = false;
  job: Job;
  jobId: number;
  getJob_error: string;

  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.jobId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.isLoading = true;
    this.jobService.getOneJob(this.jobId).subscribe(res => {
      this.job = res;
      this.isLoading = false;
    }, err => {
      this.getJob_error = err.statusText;
      if (this.getJob_error === 'Not Found') {
        this.getJob_error = 'No job found with id ' + this.jobId + ' !';
      }
      this.isLoading = false;
    })
  }

}
