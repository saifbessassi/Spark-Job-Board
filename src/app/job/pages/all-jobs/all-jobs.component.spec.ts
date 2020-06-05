import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJobsComponent } from './all-jobs.component';
import { Component, Input } from '@angular/core';
import { JobService } from 'src/app/core/services/job/job.service';
import { Job } from 'src/app/core/models/job';
import { of } from 'rxjs';
import { FilterChoice } from 'src/app/core/models/filter-choice.model';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent {}

@Component({selector: 'sp-carousel', template: ''})
export class CarouselStubComponent {
  @Input() text: string;
  @Input() title: string;
}

@Component({selector: 'sp-jobs-filters', template: ''})
export class JobsFiltersStubComponent {
  @Input() filterOptions;
  @Input() checkedValues;
}

@Component({selector: 'sp-error-msg', template: ''})
export class ErrorMsgStubComponent {
  @Input() errorMsg;
}

@Component({selector: 'sp-job-post', template: ''})
export class JobPostStubComponent {
  @Input() job;
}

@Component({selector: 'sp-pagination', template: ''})
export class PaginationStubComponent {
  @Input() nbItems;
  @Input() nbItemsPerPage;
  @Input() currentPage;
}

describe('AllJobsComponent', () => {
  let component: AllJobsComponent;
  let fixture: ComponentFixture<AllJobsComponent>;
  const expectedJobs: Job[] = [
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
  let expectedFilterParams = [
    {key: 'category.label', value: 'category 1'}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AllJobsComponent,
        SpinnerStubComponent,
        CarouselStubComponent,
        JobsFiltersStubComponent,
        ErrorMsgStubComponent,
        JobPostStubComponent,
        PaginationStubComponent
      ],
      providers: [
        { 
          provide: JobService, 
          useValue: {
            getCandidateJobs: () => of(
              {
                'hydra:member': expectedJobs,
                'hydra:totalItems': expectedJobs.length
              }
              ),
            getFilterOptions: () => of(expectedOptions)
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllJobsComponent);
    component = fixture.componentInstance;
    window.history.pushState({data: expectedFilterParams}, '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get history state data', () => {
    component.ngOnInit();
    expect(component.filterParams).toEqual(expectedFilterParams);
  });

  it('should get expected values', () => {
    component.ngOnInit();
    const allJobsElement: HTMLElement = fixture.nativeElement;
    const select = allJobsElement.querySelector('select');
    expect(select).toBeTruthy();
    expect(component.jobs).toEqual(expectedJobs);
    expect(component.filterOptions).toEqual(expectedOptions);
  });

  describe('#addFilter', () => {
    let filter: FilterChoice;
    beforeEach(() => {
      component.ngOnInit();
      expectedFilterParams = [
        {key: 'category.label', value: 'category 1'}
      ];
    })

    it('should select new filter', () => {
      filter = {
        key: 'filter key',
        value: 'filter value'
      }
      expectedFilterParams.push(filter);
      component.addFilter(filter);
      expect(component.filterParams).toEqual(expectedFilterParams);
    });

    it('should deselect selected filter', () => {
      component.ngOnInit();
      fixture.detectChanges();
      filter = {
        key: 'category.label',
        value: 'category 1'
      }
      component.ngOnInit();
      fixture.detectChanges();
      component.addFilter(filter);
      fixture.detectChanges();
      expect(component.filterParams).not.toContain(filter);
    });
  });

  describe('#onOrder', () => {
    const orderParam = 'order[createdAt]=desc';
    it('should add order param', () => {
      component.onOrder({target: {value: orderParam}});
      expect(component.orderParam).toEqual(orderParam);
      expect(component.jobs).toEqual(expectedJobs);
    });
  });

  describe('#onPage', () => {
    it('should add order param', () => {
      component.onPage(5);
      expect(component.pageParam).toEqual(5);
      expect(component.jobs).toEqual(expectedJobs);
    });
  });
});
