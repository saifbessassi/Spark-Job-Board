import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsFiltersComponent } from './jobs-filters.component';

describe('JobsFiltersComponent', () => {
  let component: JobsFiltersComponent;
  let fixture: ComponentFixture<JobsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsFiltersComponent ]
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
});
