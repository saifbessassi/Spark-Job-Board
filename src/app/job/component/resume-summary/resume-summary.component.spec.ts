import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSummaryComponent } from './resume-summary.component';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({selector: 'ngb-progressbar', template: ''})
export class ProgressbarStubComponent{@Input() value: number}

describe('ResumeSummaryComponent', () => {
  let component: ResumeSummaryComponent;
  let fixture: ComponentFixture<ResumeSummaryComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const activeModalSpy = jasmine.createSpyObj('NgbActiveModal', ['close']);

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
});
