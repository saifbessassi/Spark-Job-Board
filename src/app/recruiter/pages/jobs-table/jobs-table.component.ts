import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { JobService } from 'src/app/core/services/job/job.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Job } from 'src/app/core/models/job';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditJobComponent } from '../../components/edit-job/edit-job.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';

export class NbJobsPerStatus {
  closed = 0;
  open = 0;
  saved = 0;
}

@Component({
  selector: 'sp-jobs-table',
  templateUrl: './jobs-table.component.html',
  styleUrls: ['./jobs-table.component.scss']
})
export class JobsTableComponent implements OnInit {

  constructor(
    private jobService: JobService,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe,
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
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

  allJobs: ServerDataSource;
  allJobsNb = 0;
  params: string;
  jobStatus = '';
  nbJobs = new NbJobsPerStatus();
  nbResult: number;

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
      'skills.label': {
        title: 'Skills',
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.skills) {
            const skills = [];
            row.skills.forEach(element => {
              skills.push(element.label);
            });
            return skills.sort((a, b) => a.localeCompare(b));
          }
          return null;
        },
      },
      'category.label': {
        title: 'category',
        type: 'date',
        valuePrepareFunction: (value, row) => {
          if (row.category) {
            return row.category.label;
          }
          return null;
        },
      },
      'createdAt[after]': {
        title: 'Date',
        type: 'date',
        width: '20%',
        filter: {
          type: 'custom',
          component: DatePickerComponent
        },
        valuePrepareFunction: (cell, row) => {
          if (row.createdAt) {
            const formatted = this.datePipe.transform(row.createdAt, 'dd MMM yyyy');
            return formatted;
          }
          return null;
        },
      },
      'deadline[after]': {
        title: 'Deadline',
        type: 'date',
        width: '20%',
        filter: {
          type: 'custom',
          component: DatePickerComponent
        },
        valuePrepareFunction: (cell, row) => {
          if (row.deadline) {
            const formatted = this.datePipe.transform(row.deadline, 'dd MMM yyyy');
            return formatted;
          }
          return null;
        }
      },
    },
  };

  ngOnInit() {
    this.jobService.getNbJobsPerStatus().subscribe((res: NbJobsPerStatus) => {
      for (const key of Object.keys(res)) {
        this.nbJobs[key] = res[key];
      }
      this.allJobsNb = this.nbJobs.open + this.nbJobs.closed + this.nbJobs.saved;
    });
  }

  onDeleteJob(event) {
    if (
      window.confirm(
        'If you delete a job you will lose all its applications. Are you sure you want to delete job "' + event.data.title + '"?'
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
    const modalRef = this.modalService.open(EditJobComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.job = job;
    modalRef.result.then(res => {
      this.allJobs.update(job, res);
    });
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
