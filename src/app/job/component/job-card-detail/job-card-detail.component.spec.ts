import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardDetailComponent } from './job-card-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { of } from 'rxjs';
import { User } from 'src/app/core/models/user.service';
import { Job } from 'src/app/core/models/job';

describe('JobCardDetailComponent', () => {
  let component: JobCardDetailComponent;
  let fixture: ComponentFixture<JobCardDetailComponent>;
  const modalSpy = jasmine.createSpyObj('NgbModal', ['close']);
  let authService: AuthenticationService;
  let isCandidateSpy: jasmine.Spy;
  let isRecruiterSpy: jasmine.Spy;
  let userService;
  let user = new User;
  let job = new Job;
  user.appliedJobs = [1,2,3];

  beforeEach(async(() => {
    userService = jasmine.createSpyObj('UserService', ['isCandidate', 'isRecruiter']);
    TestBed.configureTestingModule({
      declarations: [ JobCardDetailComponent ],
      providers: [
        { provide: NgbModal, useValue: modalSpy },
        {provide: AuthenticationService, useValue: {currentUser: of(user)}},
        {provide: UserService, useValue: userService}
      ]
    })
    .compileComponents();
    isCandidateSpy = userService.isCandidate.and.returnValue(true);
    isRecruiterSpy = userService.isRecruiter.and.returnValue(false);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCardDetailComponent);
    component = fixture.componentInstance;
    job.id = 1;
    component.job = job;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
