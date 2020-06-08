import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { Component, Input } from '@angular/core';
import { CandidateService } from 'src/app/core/services/candidate/candidate.service';
import { of } from 'rxjs';
import { Candidate } from 'src/app/core/models/candidate/candidate.model';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent{}

@Component({selector: 'sp-identity', template: ''})
export class IdentityStubComponent{@Input() identity;}

@Component({selector: 'sp-skill', template: ''})
export class SkillStubComponent{
  @Input() skills;
  @Input() resumeID;
}

@Component({selector: 'sp-language', template: ''})
export class LanguageStubComponent{
  @Input() languages;
  @Input() resumeID;
}

@Component({selector: 'sp-description', template: ''})
export class DescriptionStubComponent{
  @Input() description;
  @Input() resumeID;
}

@Component({selector: 'sp-document', template: ''})
export class DocumentStubComponent{
  @Input() cv;
  @Input() resumeID;
}

@Component({selector: 'sp-education', template: ''})
export class EducationStubComponent{
  @Input() educations;
  @Input() resumeID;
}

@Component({selector: 'sp-experience', template: ''})
export class ExperienceStubComponent{
  @Input() experiences;
  @Input() resumeID;
}

@Component({selector: 'sp-project', template: ''})
export class ProjectStubComponent{
  @Input() projects;
  @Input() resumeID;
}

describe('ProfileComponentPage', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let candidateService;
  let getCandidateProfileSpy: jasmine.Spy;
  let expectedCandidate: Candidate = {
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
    resume: {
        id: 1425,
        description: "",
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
    }
  };

  beforeEach(async(() => {
    candidateService = jasmine.createSpyObj('CandidateService', ['getCandidateProfile']);
    TestBed.configureTestingModule({
      declarations: [ 
        ProfileComponent,
        SpinnerStubComponent,
        IdentityStubComponent,
        SkillStubComponent,
        LanguageStubComponent,
        DescriptionStubComponent,
        DocumentStubComponent,
        ExperienceStubComponent,
        EducationStubComponent,
        ProjectStubComponent
      ],
      providers: [
        { provide: CandidateService, useValue: candidateService }
      ]
    })
    .compileComponents();
    getCandidateProfileSpy = candidateService.getCandidateProfile.and.returnValue(of(expectedCandidate));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.resume).toEqual(expectedCandidate.resume);
  });
});
