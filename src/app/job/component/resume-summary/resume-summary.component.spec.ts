import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSummaryComponent } from './resume-summary.component';

describe('EditResumeFormComponent', () => {
  let component: ResumeSummaryComponent;
  let fixture: ComponentFixture<ResumeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeSummaryComponent ]
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
});
