import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsFiltersComponent } from './jobs-filters.component';
import { Component, Input } from '@angular/core';

@Component({selector: 'sp-filter-box', template: ''})
export class FilterBoxStubComponent {
  @Input() filterPossibilities;
  @Input() filterName;
  @Input() checkedValues;
}

describe('JobsFiltersComponent', () => {
  let component: JobsFiltersComponent;
  let fixture: ComponentFixture<JobsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        JobsFiltersComponent,
        FilterBoxStubComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise filterChoice event', () => {
    let event = {data: 'this is an event'};
    let res;
    component.filterChoice.subscribe(data => res = data);
    component.filter(event);
    expect(res).toEqual(event);
  })
});
