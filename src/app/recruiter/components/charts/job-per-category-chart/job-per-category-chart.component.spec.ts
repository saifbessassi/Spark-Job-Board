import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPerCategoryChartComponent } from './job-per-category-chart.component';

describe('JobPerCategoryChartComponent', () => {
  let component: JobPerCategoryChartComponent;
  let fixture: ComponentFixture<JobPerCategoryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPerCategoryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPerCategoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
