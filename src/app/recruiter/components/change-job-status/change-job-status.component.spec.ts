import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeJobStatusComponent } from './change-job-status.component';

describe('ChangeJobStatusComponent', () => {
  let component: ChangeJobStatusComponent;
  let fixture: ComponentFixture<ChangeJobStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeJobStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeJobStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
