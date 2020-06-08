import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsComponent } from './applications.component';
import { CandidateService, NbCandPerStatus } from 'src/app/core/services/candidate/candidate.service';
import { of } from 'rxjs';
import { ApplicationService } from 'src/app/core/services/application/application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('ApplicationsComponent', () => {
  let component: ApplicationsComponent;
  let fixture: ComponentFixture<ApplicationsComponent>;
  const modalSpy = jasmine.createSpyObj('NgbModal', ['open']);
  let expectedNbCandPerStatus: NbCandPerStatus = {
    total: 154,
    applied: 81,
    unapplied: 73,
    accepted: 37,
    rejected: 33,
    waiting: 31
  };
  let expectedApplication = [
    {
        id: 518,
        job: {
            title: "Transportation Equipment Painters",
            location: "sfax"
        },
        candidate: {
            address: "sfax, tunisia",
            resume: {
                seniorityLevel: "0 to 2 years",
                skillsCandidate: [
                    {
                        skill: {
                            label: "Angular"
                        }
                    },
                    {
                        skill: {
                            label: "Symfony"
                        }
                    },
                    {
                        skill: {
                            label: "SQL"
                        }
                    }
                ]
            },
            id: 3435,
            email: "saif2@mail.com",
            fullname: "saif bessassi"
        },
        status: "rejected",
        applicationDate: new Date("1999-04-29"),
        message: null
    },
    {
        id: 519,
        job: {
            title: "Licensed Practical Nurse",
            location: "tunis"
        },
        candidate: {
            address: "sfax, tunisia",
            resume: {
                seniorityLevel: "0 to 2 years",
                skillsCandidate: [
                    {
                        skill: {
                            label: "Angular"
                        }
                    },
                    {
                        skill: {
                            label: "Symfony"
                        }
                    },
                    {
                        skill: {
                            label: "SQL"
                        }
                    }
                ]
            },
            id: 3435,
            email: "saif2@mail.com",
            fullname: "saif bessassi"
        },
        status: "waiting",
        applicationDate: new Date("2020-04-29"),
        message: null
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationsComponent ],
      providers: [
        {
          provide: CandidateService,
          useValue: {
            currentNbCandPerStatus: of(expectedNbCandPerStatus),
            getCandidateApplications: () => of(expectedApplication)
          }
        },
        {
          provide: ApplicationService,
          useValue: {makeDecision: () => of(true)}
        },
        { provide: NgbModal, useValue: modalSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onDecion', () => {
    component.onDecision('accepted', 518, 0);
    expect(component.applications[0].status).toEqual('accepted');
  });
});
