import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/core/models/job';

@Component({
  selector: 'sp-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent implements OnInit {

  @Input() job: Job;

  constructor() { }

  ngOnInit() {
  }

}
