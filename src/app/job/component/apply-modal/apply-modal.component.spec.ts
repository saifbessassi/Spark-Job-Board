import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyModalComponent } from './apply-modal.component';
import { Component, Input, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { CandidateService } from 'src/app/core/services/candidate/candidate.service';
import { Candidate } from 'src/app/core/models/candidate/candidate.model';
import { ApplicationService } from 'src/app/core/services/application/application.service';
import { EditorModule } from '@tinymce/tinymce-angular';
import { By } from '@angular/platform-browser';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent {}

@Component({selector: 'sp-signin', template: ''})
export class SigninStubComponent {@Input() location: string;}

@Component({selector: 'sp-resume-summary', template: ''})
export class ResumeSummaryStubComponent {@Input() candidate;}

describe('ApplyModalComponent', () => {
  let component: ApplyModalComponent;
  let fixture: ComponentFixture<ApplyModalComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const activeModalSpy = jasmine.createSpyObj('NgbActiveModal', ['close']);
  let authService: AuthenticationService;
  let userService;
  let candidateService: CandidateService;
  let applicationService;
  let isConnectedSpy: jasmine.Spy;
  let isRecruiterSpy: jasmine.Spy;
  let getCandidateProfileSpy: jasmine.Spy;
  let applySpy: jasmine.Spy;
  let user = new User;
  user.appliedJobs = [1,2,3];
  let candidate = new Candidate;
  candidate.id = 1;
  candidate.fullname = 'user user';

  beforeEach(async(() => {
    userService = jasmine.createSpyObj('UserService', ['isConnected', 'isRecruiter']);
    authService = jasmine.createSpyObj('AuthenticationService', ['addAppliedJob']);
    // candidateService = jasmine.createSpyObj('CandidateService', ['getCandidateProfile']);
    applicationService = jasmine.createSpyObj('ApplicationService', ['apply']);
    TestBed.configureTestingModule({
      declarations: [ 
        ApplyModalComponent,
        SpinnerStubComponent,
        SigninStubComponent,
        ResumeSummaryStubComponent
       ],
       imports: [
         FormsModule,
         ReactiveFormsModule,
         EditorModule
       ],
       providers: [      
        { provide: NgbActiveModal, useValue: activeModalSpy },
        {
          provide: AuthenticationService, 
          useValue: {
            currentUser: of(user), 
            currentUserValue: user,
            addAppliedJob: () => null
            }
        },
        { provide: Router, useValue: routerSpy },
        {provide: UserService, useValue: userService},
        {provide: CandidateService, useValue: {getCandidateProfile: () => of(candidate)}},
        {provide: ApplicationService, useValue: applicationService}
       ]
    })
    .compileComponents();
    isConnectedSpy = userService.isConnected.and.returnValue(true);
    isRecruiterSpy = userService.isRecruiter.and.returnValue(false);
    applySpy = applicationService.apply.and.returnValue(true);
    // getCandidateProfileSpy = candidateService.getCandidateProfile.and.returnValue(of(candidate));
  }));

  beforeEach(() => {
    const jobID = 1;
    const message = 'this is a message';
    fixture = TestBed.createComponent(ApplyModalComponent);
    component = fixture.componentInstance;
    component.jobId = jobID;
    // component.ngOnInit();
    // component.messageForm.setValue({message: message});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get candidate', () => {
    component.getCandidate();
    expect(component.candidate).toEqual(candidate);
  });
});
