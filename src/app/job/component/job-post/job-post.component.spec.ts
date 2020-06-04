import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostComponent } from './job-post.component';
import { RouterLinkDirectiveStub } from 'src/testing';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user.service';
import { of } from 'rxjs';
import { Job } from 'src/app/core/models/job';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('JobPostComponent', () => {
  let component: JobPostComponent;
  let fixture: ComponentFixture<JobPostComponent>;
  let authService: AuthenticationService;
  let isCandidateSpy: jasmine.Spy;
  let userService;
  let job = new Job;
  let user = new User;
  user.roles = ['ROLE_CANDIDATE'];
  user.appliedJobs = [1,3,5];

  beforeEach(async(() => {
    userService = jasmine.createSpyObj('UserService', ['isCandidate']);
    TestBed.configureTestingModule({
      declarations: [ 
        JobPostComponent, 
        RouterLinkDirectiveStub 
      ],
      providers: [
       {provide: AuthenticationService, useValue: {currentUser: of(user)}},
       {provide: UserService, useValue: userService},
     ]
    })
    .compileComponents();
    isCandidateSpy = userService.isCandidate.and.returnValue(true);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthenticationService);
    job.id = 1;
    component.job = job;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display applied if candidate was applied for the job', () => {
    component.ngOnInit();
    const jobPostDeb: DebugElement = fixture.debugElement;
    const buttonAppliedDeb = jobPostDeb.query(By.css('#applied'));
    const buttonApplied: HTMLElement = buttonAppliedDeb.nativeElement;
    expect(buttonApplied).toBeTruthy();
    expect(component.isApplied).toBeTruthy();
  })
});
