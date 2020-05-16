import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { JobService } from 'src/app/core/services/job/job.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Job } from 'src/app/core/models/job';

export class NbJobsPerStatus {
  closed: number = 0;
  open: number = 0;
  saved: number = 0;
}

@Component({
  selector: 'sp-jobs-table',
  templateUrl: './jobs-table.component.html',
  styleUrls: ['./jobs-table.component.scss']
})
export class JobsTableComponent implements OnInit{

  allJobs: ServerDataSource;
  allJobsNb: number = 0;
  params: string;
  jobStatus: string = '';
  nbJobs = new NbJobsPerStatus;
  nbResult: number;

  constructor(
    private jobService: JobService,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe
  ) 
  {
    this.allJobs  = new ServerDataSource(
      this.http,
      {
        endPoint: 'http://localhost:8000/api/jobs.jsonld',
        dataKey: 'hydra:member',
        pagerPageKey: '_page',
        filterFieldKey: '#field#',
        totalKey: 'hydra:totalItems',
      },
    );
    this.allJobs.onChanged().subscribe(res => {
      this.nbResult = this.allJobs.count();
    });
  }

  ngOnInit() {
    this.jobService.getNbJobsPerStatus().subscribe((res: NbJobsPerStatus) => {
      for(let key in res) {
        this.nbJobs[key] = res[key];
      }
      this.allJobsNb = this.nbJobs.open + this.nbJobs.closed + this.nbJobs.saved
    })
  }

  settings = {
    mode: 'external',
    actions: {
        add: false,
        delete: false,
        edit: false,
        custom: [
          {
            name: 'view',
            title: '<i class="fas fa-eye text-secondary"></i> ',
          },
          {
            name: 'edit',
            title: '<i class="fas fa-pen text-primary"></i> ',
          },
          {
            name: 'delete',
            title: '<i class="fas fa-trash-alt text-danger"></i> ',
          }
        ]
    },
    columns: {
      title: {
        title: 'Job Title',
        type: 'string',
      },
      location: {
        title: 'Location',
        type: 'string',
        width: '10%',
      },
      skills: {
        title: 'Skills',
        type: 'string',
        valuePrepareFunction: (data) => {
          const skills = [];
          data.forEach(element => {
            skills.push(element.label);
          });
          return skills;
        },
      },
      category: {
        title: 'category',
        type: 'string',
        valuePrepareFunction: (data) => {
          return data.label;
        },
      },
      createdAt: {
        title: 'Date',
        type: 'date',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);

          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        },
        filter: false,
      },
      deadline: {
        title: 'Deadline',
        type: 'date',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);

          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        },
        filter: false,
      },   
      // recruiter: {
      //   title: 'Created By',
      //   valuePrepareFunction: (data) => {
      //     return data.fullname;
      //   },
      // },
      // employmentType: {
      //   title: 'Type',
      //   type: 'string',
      //   filter: {
      //     type: 'list',
      //     config: {
      //       selectText: 'Select type...',
      //       list: [
      //         { value: 'Full-time', title: 'Full-time' },
      //         { value: 'Part-time', title: 'Part-time' },
      //         { value: 'Contract', title: 'Contract' },
      //         { value: 'Temporary', title: 'Temporary' },
      //         { value: 'Volunteer', title: 'Volunteer' },
      //         { value: 'Internship', title: 'Internship' },
      //       ],
      //     },
      //   },
      // },
      // seniorityLevel: {
      //   title: 'Seniority',
      //   type: 'string',
      //   filter: {
      //     type: 'list',
      //     config: {
      //       selectText: 'Select seniority...',
      //       list: [
      //         { value: '0 to 2 years', title: '0 to 2 years' },
      //         { value: '3 to 5 years', title: '3 to 5 years' },
      //         { value: '6 to 9 years', title: '6 to 9 years' },
      //         { value: '10 years or more', title: '10 years or more' },
      //       ],
      //     },
      //   },
      // },
    },
  };

  onDeleteJob(event) {
    if (
      window.confirm(
        'If you delete a job you will lose all its applications. Are you sure you want to delete job "' + event.data.title +'"?'
      )
    ) {
      this.jobService.deleteJob(event.data.id).subscribe(res => {
      this.allJobs.remove(event.data);
      this.nbJobs[event.data.status]--;
      this.allJobsNb--;
      });
    }
  }

  onViewJob(id) {
    this.router.navigate(['/jobs/' + id]);
  }

  onEditJob(job: Job) {
    console.log(job);
  }

  onAction(event) {
    switch (event.action) {
      case 'view':
        this.onViewJob(event.data.id);
        break;
      case 'edit':
        this.onEditJob(event.data);
        break;
      case 'delete':
        this.onDeleteJob(event);
        break;
    
      default:
        break;
    }
  }

  onStatusFilter() {
    let statusFilter = '';
    if (this.jobStatus) {
      statusFilter = '?status[]=' + this.jobStatus;
    }
    this.allJobs  = new ServerDataSource(
      this.http,
      {
        endPoint: 'http://localhost:8000/api/jobs.jsonld' + statusFilter,
        dataKey: 'hydra:member',
        pagerPageKey: '_page',
        filterFieldKey: '#field#',
        totalKey: 'hydra:totalItems',
      },
    );
  }

}
