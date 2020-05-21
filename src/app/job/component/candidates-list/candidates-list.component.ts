import { Component, OnInit, Input } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { CandidateService } from 'src/app/core/services/candidate/candidate.service';
import { JobService } from 'src/app/core/services/job/job.service';

export class NbApplicationsPerStatus {
  total: number = 0;
  accepted: number = 0;
  waiting: number = 0;
  rejected: number = 0;
}

@Component({
  selector: 'sp-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {

  @Input() jobID: number;
  jobParam: string = '';
  allCand: ServerDataSource;
  candStatus: string = '';
  nbCand = new NbApplicationsPerStatus;

  constructor(
    private jobService: JobService,
    private http: HttpClient,
  ) 
  { }

  ngOnInit() {
    this.jobService.getNbApplicationPerStatus(this.jobID).subscribe(
      (res: NbApplicationsPerStatus) => {
        for (var key in this.nbCand) {
          if (res[key]) {
            this.nbCand[key] = res[key];
          } else {
            res[key] = 0;
          }
        }
      }
    )
    this.allCand  = new ServerDataSource(
      this.http,
      {
        endPoint: 'http://localhost:8000/api/candidates?jobApplications.job.id=' + this.jobID,
        dataKey: 'hydra:member',
        pagerPageKey: '_page',
        filterFieldKey: '#field#',
        totalKey: 'hydra:totalItems',
      },
    );
  }

  settings = {
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
          name: 'delete',
          title: '<i class="fas fa-trash-alt text-danger"></i> ',
        }
      ]
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      fullname: {
        title: 'Full Name',
        type: 'string',
      },
      address: {
        title: 'Location',
        type: 'string',
      },
      resume: {
        title: 'Seniority',
        type: 'string',
        valuePrepareFunction: (data) => {
          if (data) {
            return data.seniorityLevel;
          }
          return null;
        }
      },
      candidateSkills: {
        title: 'Skills',
        type: 'string',
        valuePrepareFunction: (data) => {
          if(data) {
            const skills = [];
            data.forEach(element => {
              skills.push(element.skill.label);
            });
            return skills;
          }
          return null;
        },
      },
    },
  };

  onStatusFilter() {
    let statusFilter = '';
    if (this.candStatus) {
      statusFilter = '&jobApplications.status[]=' + this.candStatus;      
    }
    this.allCand  = new ServerDataSource(
      this.http,
      {
        endPoint: 'http://localhost:8000/api/candidates?jobApplications.job.id=' + this.jobID + statusFilter,
        dataKey: 'hydra:member',
        pagerPageKey: '_page',
        filterFieldKey: '#field#',
        totalKey: 'hydra:totalItems',
      },
    );
  }

}
