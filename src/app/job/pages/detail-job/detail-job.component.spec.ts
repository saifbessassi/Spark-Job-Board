import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailJobComponent } from './detail-job.component';
import { Component, Input, DebugElement } from '@angular/core';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobService } from 'src/app/core/services/job/job.service';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { User } from 'src/app/core/models/user.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/testing';
import { By } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent {}

@Component({selector: 'sp-carousel', template: ''})
export class CarouselStubComponent {
  @Input() text: string;
  @Input() title: string;
}

@Component({selector: 'sp-change-job-status', template: ''})
export class ChangeJobStatusBoxStubComponent {
  @Input() jobID;
  @Input() status;
}

@Component({selector: 'sp-error-msg', template: ''})
export class ErrorMsgStubComponent {
  @Input() errorMsg;
}

@Component({selector: 'sp-job-card-detail', template: ''})
export class JobCardDetailStubComponent {
  @Input() job;
}

@Component({selector: 'sp-candidate-list', template: ''})
export class CandidateListStubComponent {
  @Input() jobID;
  @Input() columnDecision;
}

describe('DetailJobComponent', () => {
  let component: DetailJobComponent;
  let fixture: ComponentFixture<DetailJobComponent>;
  let activatedRoute;
  let userService;
  let jobService;
  let isRecruiterSpy: jasmine.Spy;
  let oneJobSpy: jasmine.Spy;
  const expectedJob = {
    'id': 1,
    'title': 'saif saif saif3',
    'location': 'tunis',
    'description': 'this is a description',
    'employmentType': 'Volunteer',
    'seniorityLevel': '6 to 9 years',
    'status': 'open',
    'skills': [
      {
          'id': 315,
          'label': 'Laravel'
      },
      {
          'id': 318,
          'label': 'VueJs'
      }
    ],
    'category': {
      'id': 19,
      'label': 'Design And Multimedia'
    },
    'deadline': new Date('2020-06-04T00:00:00+00:00'),
    'createdAt': new Date('2020-05-12T16:42:44+00:00'),
    'updatedAt': new Date('2020-05-28T15:37:26+00:00'),
    'createdBy': 'recruiter one',
    'updatedBy': 'recruiter one'
  }
  const user = new User; 

  beforeEach(async(() => {
    userService = jasmine.createSpyObj('UserService', ['isRecruiter']);
    jobService = jasmine.createSpyObj('JobService', ['getOneJob']);
    TestBed.configureTestingModule({
      imports: [
        NgbModule
      ],
      declarations: [ 
        DetailJobComponent,
        SpinnerStubComponent,
        CarouselStubComponent,
        ChangeJobStatusBoxStubComponent,
        ErrorMsgStubComponent,
        JobCardDetailStubComponent,
        CandidateListStubComponent
      ],
      providers: [
        {provide: JobService, useValue: jobService},
        {provide: AuthenticationService, useValue: {currentUser: of(user)}},
        {provide: NgbModal, useValue: {open: () => 'is open'}},
        {provide: UserService, useValue: userService},
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id: 1}}}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailJobComponent);
    component = fixture.componentInstance;
    jobService.getOneJob.and.returnValue(of(expectedJob));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get expected job', () => {
    expect(component.job).toEqual(expectedJob);
  });

  it('should set new deadline', () => {
    const date = new Date();
    component.newDeadline(date);
    fixture.detectChanges();
    expect(component.job.deadline).toEqual(date);
  });

  describe('Recruiter view', () => {
    beforeEach(() => {
      isRecruiterSpy = userService.isRecruiter.and.returnValue(true);
      component.isRecruiter = true;
      fixture.detectChanges();
    });

    it('should be a recruiter', () => {
      expect(component.isRecruiter).toEqual(true);
    });

    it('should dispaly candidate list', () => {
      let detailJobElement: HTMLElement = fixture.nativeElement;
      const candidateTabButton = detailJobElement.querySelectorAll('a')[1];
      candidateTabButton.click();
      fixture.detectChanges();
      detailJobElement = fixture.nativeElement;
      const candidateList = detailJobElement.querySelector('sp-candidate-list');
      expect(candidateList).toBeTruthy();
    });
  });

  describe('User view', () => {
    beforeEach(() => {
      isRecruiterSpy = userService.isRecruiter.and.returnValue(false);
      component.isRecruiter = false;
      fixture.detectChanges();
    });

    it('should not be a recruiter', () => {
      expect(component.isRecruiter).toEqual(false);
    });

    it('should dispaly job card detail', () => {
      let detailJobElement: HTMLElement = fixture.nativeElement;
      const jobCardDetail = detailJobElement.querySelector('sp-job-card-detail');
      expect(jobCardDetail).toBeTruthy();
    });
  });

  describe('job not found', () => {
    beforeEach(async(() => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404, 
        statusText: 'Not Found'
      });
      jobService.getOneJob.and.returnValue(throwError(errorResponse));
      fixture.detectChanges();
    }));

    it('should return error when job not found', () => {
      component.ngOnInit();
      expect(component.getJobError).toEqual('No job found with id 1 !');
    })
  })
});
