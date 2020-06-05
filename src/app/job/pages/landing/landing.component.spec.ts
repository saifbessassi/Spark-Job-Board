import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { Component, Input } from '@angular/core';
import { RouterLinkDirectiveStub } from 'src/testing';
import { JobService } from 'src/app/core/services/job/job.service';
import { of } from 'rxjs';
import { Job } from 'src/app/core/models/job';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent {}

@Component({selector: 'sp-carousel', template: ''})
export class CarouselStubComponent {
  @Input() text: string;
  @Input() title: string;
}

@Component({selector: 'sp-search-bar', template: ''})
export class SearchBarStubComponent {
  @Input() filterOptions;
}

@Component({selector: 'sp-category-box', template: ''})
export class CategoryBoxStubComponent {
  @Input() label;
  @Input() count;
}

@Component({selector: 'sp-job-post', template: ''})
export class JobPostStubComponent {
  @Input() job;
}

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  const expectedRecentJobs: Job[] = [
    {
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
    },
    {
      'id': 2,
      'title': 'job 2',
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
  ];
  const expectedNbJobs = {
    'Sales and Marketing': 4,
    'Computer Programing': 6,
    'Design And Multimedia': 7,
    'Web Development': 7,
    'test category': 0,
    'java': 0
  };
  const expectedOptions = {
    'categories': [
      {
          'label': 'Design And Multimedia',
          'count': '1'
      },
      {
          'label': 'Web Development',
          'count': '1'
      }
    ],
    'skills': [
        {
            'label': 'AI',
            'count': '0'
        },
        {
            'label': 'Angular',
            'count': '1'
        },
        {
            'label': 'C/C++',
            'count': '0'
        },
    ],
    'experiences': [
        {
            'label': '10 years or more',
            'count': '1'
        },
        {
            'label': '6 to 9 years',
            'count': '1'
        }
    ],
    'types': [
        {
            'label': 'Volunteer',
            'count': '2'
        }
    ],
    'locations': [
        {
            'label': 'tunis',
            'count': '2'
        }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LandingComponent,
        SpinnerStubComponent,
        CarouselStubComponent,
        SearchBarStubComponent,
        CategoryBoxStubComponent,
        JobPostStubComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        { 
          provide: JobService, 
          useValue: {
            getRecentOpenJobs: () => of(expectedRecentJobs),
            getNbJobsPerCategory: () => of(expectedNbJobs),
            getFilterOptions: () => of(expectedOptions)
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get expected values', () => {
    expect(component.filterOptions).toEqual(expectedOptions, 'shouled get filter options');
    expect(component.nbJobsPerCategory).toEqual(expectedNbJobs, 'should get number of jobs per category');
    expect(component.recentJobs).toEqual(expectedRecentJobs, 'should get recent jobs');
  });
});
