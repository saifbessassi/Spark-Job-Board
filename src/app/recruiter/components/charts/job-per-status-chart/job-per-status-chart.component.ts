import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { JobService } from 'src/app/core/services/job/job.service';
import { NbJobsPerStatus } from 'src/app/recruiter/pages/jobs-table/jobs-table.component';

@Component({
  selector: 'sp-job-per-status-chart',
  templateUrl: './job-per-status-chart.component.html',
  styleUrls: ['./job-per-status-chart.component.scss']
})
export class JobPerStatusChartComponent implements OnInit {

  nbJobs = new NbJobsPerStatus;
  allJobsNb: number;
  
  labels: Label[] = [];
  data: MultiDataSet = [[]];
  doughnutChartType: ChartType = 'doughnut';
  
  constructor(
    private jobService: JobService
  ) { }

  ngOnInit() {
    this.jobService.getNbJobsPerStatus().subscribe(
      res => {
        for(let key in res) {
          this.nbJobs[key] = res[key];
        }
        this.allJobsNb = this.nbJobs.open + this.nbJobs.closed + this.nbJobs.saved;
        let nb = [];
        for(let key in this.nbJobs) {
          this.data[0].push(this.nbJobs[key]);
          this.labels.push(key);
        }
      }
    )
  }

}
