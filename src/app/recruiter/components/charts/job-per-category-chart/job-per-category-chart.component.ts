import { Component, OnInit } from '@angular/core';
import { NbJobsPerStatus } from 'src/app/recruiter/pages/jobs-table/jobs-table.component';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { JobService } from 'src/app/core/services/job/job.service';

@Component({
  selector: 'sp-job-per-category-chart',
  templateUrl: './job-per-category-chart.component.html',
  styleUrls: ['./job-per-category-chart.component.scss']
})
export class JobPerCategoryChartComponent implements OnInit {

  nbJobs;
  allJobsNb: number;
  
  labels: Label[] = [];
  data: MultiDataSet = [[]];
  doughnutChartType: ChartType = 'doughnut';
  
  constructor(
    private jobService: JobService
  ) { }

  ngOnInit() {
    this.jobService.getNbJobsPerCategory().subscribe(
      res => {
        for(let key in res) {
          this.data[0].push(res[key]);
          this.labels.push(key);
        }
      }
    )
  }

}
