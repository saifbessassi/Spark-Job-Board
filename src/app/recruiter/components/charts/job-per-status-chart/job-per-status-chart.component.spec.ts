import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPerStatusChartComponent } from './job-per-status-chart.component';

describe('JobPerStatusChartComponent', () => {
  let component: JobPerStatusChartComponent;
  let fixture: ComponentFixture<JobPerStatusChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPerStatusChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPerStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
