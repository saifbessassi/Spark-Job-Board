import { Component, OnInit } from '@angular/core';
import { NbJobsPerStatus } from 'src/app/recruiter/pages/jobs-table/jobs-table.component';
import { Label, MultiDataSet, Colors } from 'ng2-charts';
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
  colors: Colors[] = [
    {
      borderColor: '#fff',
      backgroundColor: [
        '#28a745',
        '#dc3545',
        '#ffc107',
        '#17a2b8',
        '#343a40',
        '#6c757d',
        '#007bff',
        '#6c757d',
      ],
    }
  ];

  constructor(
    private jobService: JobService
  ) { }

  ngOnInit() {
    this.jobService.getNbJobsPerCategory().subscribe(
      res => {
        for (const key of Object.keys(res)) {
          this.data[0].push(res[key]);
          this.labels.push(key);
        }
      }
    );
  }

}
