import { Component, OnInit, Input } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CandidateService, NbCandPerStatus } from 'src/app/core/services/candidate/candidate.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CandidateProfileComponent } from '../candidate-profile/candidate-profile.component';
import { JobService } from 'src/app/core/services/job/job.service';
import { DecisionButtonsComponent } from './decision-buttons/decision-buttons.component';


@Component({
  selector: 'sp-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {

  @Input() jobID: number;
  @Input() columnDecision: boolean = false;
  allCand: ServerDataSource;
  params: string;
  candStatus: string = '';
  nbCand = new NbCandPerStatus;
  endpoint: string;
  settings: any;

  constructor(
    private jobService: JobService,
    private candidateService: CandidateService,
    private http: HttpClient,
    private modalService: NgbModal,
  ) 
  { }

  ngOnInit() {
    // Get numbers of applications per status
    if (this.jobID) {
      // change endpoint to get applications for a job
      this.endpoint = 'http://localhost:8000/api/job_applications?job.id=' + this.jobID;
      this.setSettingsApplications();

      this.jobService.getNbApplicationPerStatus(this.jobID).subscribe(
        (res: NbCandPerStatus) => {
          for (var key in this.nbCand) {
            if (res[key]) {
              this.nbCand[key] = res[key];
            } else {
              res[key] = 0;
            }
          }
        }
      )
    } 
    // Get number of candidates par applications status
    else {
      // Endpoint to get all candidates
      this.endpoint = 'http://localhost:8000/api/candidates?';
      this.setSettingsAllCandidates();

      this.candidateService.getNbCandidate().subscribe(
        (res: NbCandPerStatus) => {
          for (var key in this.nbCand) {
            if (res[key]) {
              this.nbCand[key] = res[key];
            } else {
              res[key] = 0;
            }
          }
        }
      )
    }
    // set value of behaviour subject
    this.candidateService.setNbCandPerStatus(this.nbCand);


    this.allCand  = new ServerDataSource(
      this.http,
      {
        endPoint: this.endpoint,
        dataKey: 'hydra:member',
        pagerPageKey: '_page',
        filterFieldKey: '#field#',
        totalKey: 'hydra:totalItems',
      },
    );

    // Add column with decisions buttons
    if (this.columnDecision) {
      this.settings.columns['decision'] = {
        title: 'Decesion',
        type: 'custom',
        filter: false,
        renderComponent: DecisionButtonsComponent,
        valuePrepareFunction: (value, row) => {
          return row;
        },
        onComponentInitFunction: (instance) => {
          instance.outputStatus.subscribe(data => {
            this.allCand.refresh();
          });
        },
      }
    }
  }

  setSettingsAllCandidates() {
    this.settings = {
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
  }

  setSettingsApplications() {
    this.settings = {
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
      columns: {
        'candidate.fullname': {
          title: 'Full Name',
          type: 'string',
          valuePrepareFunction: (value, row) => {
            return row.candidate.fullname;
          }
        },
        'candidate.address': {
          title: 'Location',
          type: 'string',
          valuePrepareFunction: (value, row) => {
            return row.candidate.address;
          }
        },
        'candidate.resume.seniorityLevel': {
          title: 'Seniority',
          type: 'string',
          valuePrepareFunction: (value, row) => {
            if (row.resume) {
              return row.resume.seniorityLevel;
            }
            return null;
          }
        },
        'candidate.resume.skillsCandidate': {
          title: 'Skills',
          type: 'string',
          valuePrepareFunction: (value, row) => {
            if(row.candidate.resume) {
              const skills = [];
              row.candidate.resume.skillsCandidate.forEach(element => {
                skills.push(element.skill.label);
              });
              return skills;
            }
            return null;
          },
        },
        status: {
          title: 'Status',
          type: 'string'
        }
        // jobApplications: {
        //   title: 'Applications',
        //   type: 'string',
        //   filter: false,
        //   valuePrepareFunction: (data) => {
        //     return data.length;
        //   }
        // }
      },
    };
  }

  onStatusFilter() {
    let statusFilter = '';
    // If we filter applications
    if (this.candStatus && this.jobID) {
      statusFilter = '&status[]=' + this.candStatus;
    }
    // If we filter candidates
    else if (this.candStatus) {
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
        endPoint: this.endpoint + statusFilter,
        dataKey: 'hydra:member',
        pagerPageKey: '_page',
        filterFieldKey: '#field#',
        totalKey: 'hydra:totalItems',
      },
    );
  }

  onAction(event) {
    const modalRef = this.modalService.open(CandidateProfileComponent, { centered: true, size: 'xl' });
    if (this.jobID) {
      modalRef.componentInstance.candidateID = event.data.candidate.id;
    } else {
      modalRef.componentInstance.candidateID = event.data.id;
    }
    
    modalRef.result.then(res => {
      if (res) {
        this.allCand.refresh();
      }
    })
  }
}
