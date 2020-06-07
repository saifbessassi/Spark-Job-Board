import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSummaryComponent } from './resume-summary.component';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Candidate } from 'src/app/core/models/candidate/candidate.model';
import { Resume } from 'src/app/core/models/candidate/resume.model';

@Component({selector: 'ngb-progressbar', template: ''})
export class ProgressbarStubComponent{@Input() value: number}

describe('ResumeSummaryComponent', () => {
  let component: ResumeSummaryComponent;
  let fixture: ComponentFixture<ResumeSummaryComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const activeModalSpy = jasmine.createSpyObj('NgbActiveModal', ['close']);
  let candidate: Candidate = {
    phone: "23915906",
    address: "sfax, tunisia",
    id: 3435,
    email: "saif@mail.com",
    fullname: "saif bessassi",
    picture: {
        id: 119,
        url: "/profile_pictures/saif_bessassi_3435/saif_bessassi_1590772389jpg"
    },
    imageUrl: null,
    resume: null
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ResumeSummaryComponent,
        ProgressbarStubComponent
       ],
       providers: [
         { provide: Router, useValue: routerSpy },
         { provide: NgbActiveModal, useValue: activeModalSpy }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to expected url', () => {
    component.goProfile();
    const spy = routerSpy.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first();
    const url = navArgs.args[0];
    expect(url).toEqual('/candidate/profile');
  });

  describe('candidate without incomplete account', () => {
    beforeEach(() => {
      const resume: Resume = {
        id: 1,
        cv: null,
        description: null,
        educations: [],
        experiences: [],
        languagesCandidate: [],
        projects: [],
        seniorityLevel: null,
        skillsCandidate: []
      };
      let expectedCandidate = candidate;
      expectedCandidate.resume = resume;
      component.candidate = expectedCandidate;
      fixture.detectChanges();
    })
    it('should can\'t apply', () => {
      component.ngOnInit();
      expect(component.canApply).toBeFalsy();
      expect(component.percentage).toEqual(27);
    })
  });

  describe('candidate with complete account', () =>  {
    beforeEach(() => {
      const resume: Resume = {
        id: 1425,
        description: "this is description",
        seniorityLevel: "0 to 2 years",
        experiences: [
            {
                id: 1731,
                title: "saif saif edited",
                company: "saif saif",
                location: "saifsafi",
                description: "saifsaifasfieswrxdctfvygbuhnij,ok;pl:m",
                dateStart: new Date("2018-12-31"),
                dateEnd: new Date("2019-12-31")
            },
            {
                id: 1733,
                title: "full stack developer",
                company: "sparkit",
                location: "sfax",
                description: "make a job board for Spark-it using symfony and angular.gggggggggggg",
                dateStart: new Date("2017-12-31"),
                dateEnd: new Date("2018-12-31")
            }
        ],
        educations: [
            {
                id: 1369,
                school: "isims isims",
                degree: "ingenieur",
                dateStart: new Date("2012-12-31"),
                dateEnd: new Date("2013-12-31")
            },
            {
                id: 1370,
                school: "faculté des sciences",
                degree: "license en science informatique",
                dateStart: new Date("2013-12-31"),
                dateEnd: new Date("2014-12-31")
            }
        ],
        projects: [
            {
                id: 1686,
                title: "calculator ",
                description: "calculator calculator calculator calculator "
            }
        ],
        skillsCandidate: [
            {
                id: 3,
                skill: {
                    id: 316,
                    label: "Angular"
                },
                proficiency: "Intermediate"
            },
            {
                id: 5,
                skill: {
                    id: 314,
                    label: "Symfony"
                },
                proficiency: "Intermediate"
            }
        ],
        languagesCandidate: [
            {
                id: 2,
                language: {
                    id: 114,
                    label: "English"
                },
                proficiency: "Professional working proficiency"
            },
            {
                id: 3,
                language: {
                    id: 116,
                    label: "French"
                },
                proficiency: "Professional working proficiency"
            }
        ],
        cv: {
            "id": 40,
            "url": "/documents/saif_bessassi_3435/saif_bessassi_1590081174pdf",
            "updatedAt": new Date("2020-05-21")
        }
      };
      let expectedCandidate = candidate;
      expectedCandidate.resume = resume;
      component.candidate = expectedCandidate;
      fixture.detectChanges();
    });

    it('should can apply', () => {
      component.ngOnInit();
      expect(component.canApply).toBeTruthy();
      expect(component.percentage).toEqual(100);
    })
  });
});
