import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/core/models/job';

@Component({
  selector: 'sp-job-card-detail',
  templateUrl: './job-card-detail.component.html',
  styleUrls: ['./job-card-detail.component.scss']
})
export class JobCardDetailComponent implements OnInit {

  @Input() job: Job;
  
  constructor() { }

  ngOnInit() {
  }

}
