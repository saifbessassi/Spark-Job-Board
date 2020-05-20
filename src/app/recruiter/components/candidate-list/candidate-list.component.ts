import { Component, OnInit, Input } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CandidateService } from 'src/app/core/services/candidate/candidate.service';

export class NbCandPerStatus {
  totla;
  applied: number = 0;
  unapplied: number = 0;
  accepted: number = 0;
  waiting: number = 0;
  rejected: number = 0;
}

@Component({
  selector: 'sp-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {

  @Input() jobID: number;
  jobParam: string = '';
  allCand: ServerDataSource;
  params: string;
  candStatus: string = '';
  nbCand = new NbCandPerStatus;

  constructor(
    private candidateService: CandidateService,
    private router: Router,
    private http: HttpClient,
  ) 
  { }

  ngOnInit() {
    this.candidateService.getNbCandidate().subscribe(
      (res: NbCandPerStatus) => {
        this.nbCand = res;
      }
    )
    if (this.jobID) {
      this.jobParam = 'jobApplications.job.id=' + this.jobID;
    }
    this.allCand  = new ServerDataSource(
      this.http,
      {
        endPoint: 'http://localhost:8000/api/candidates?' + this.jobParam,
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
      jobApplications: {
        title: 'Applications',
        type: 'string',
        filter: false,
        valuePrepareFunction: (data) => {
          return data.length;
        }
      }
    },
  };

  onStatusFilter() {
    let statusFilter = '';
    if (this.candStatus) {
      switch (this.candStatus) {
        case 'true':
          statusFilter = '&applied=' + this.candStatus;
          break;
        case 'false':
          statusFilter = '&applied=' + this.candStatus;
          break;
        default:
          statusFilter = '&jobApplications.status[]=' + this.candStatus;
          break;
      }
      
    }
    this.allCand  = new ServerDataSource(
      this.http,
      {
        endPoint: 'http://localhost:8000/api/candidates?' + this.jobParam + statusFilter,
        dataKey: 'hydra:member',
        pagerPageKey: '_page',
        filterFieldKey: '#field#',
        totalKey: 'hydra:totalItems',
      },
    );
  }

}
