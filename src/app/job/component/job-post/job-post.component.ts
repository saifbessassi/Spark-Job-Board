import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/core/models/job';
import { ApplicationService } from 'src/app/core/services/application/application.service';

@Component({
  selector: 'sp-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent implements OnInit {

  @Input() job: Job;
  isApplied: boolean;

  constructor(
    private applyService: ApplicationService
  ) { }

  ngOnInit() {
    this.isApplied = this.applyService.isApplied(this.job.id);
  }

}
