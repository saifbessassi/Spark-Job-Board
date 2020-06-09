import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionFormComponent } from './description-form.component';
import { Component, Input } from '@angular/core';
import { DescriptionService } from 'src/app/core/services/resume/description/description.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent{}

@Component({selector: 'sp-error-msg', template: ''})
export class ErrorMsgStubComponent {
  @Input() errorMsg;
}

describe('DescriptionFormComponent', () => {
  let component: DescriptionFormComponent;
  let fixture: ComponentFixture<DescriptionFormComponent>;
  let ngbActiveModal;
  let descriptionService;
  let editSpy: jasmine.Spy;
  let closeSpy: jasmine.Spy;
  let dismissSpy: jasmine.Spy;

  beforeEach(async(() => {
    descriptionService = jasmine.createSpyObj('DescriptionService', ['edit']);
    ngbActiveModal = jasmine.createSpyObj('NgbActiveModal', ['close', 'dismiss']);
    TestBed.configureTestingModule({
      declarations: [ 
        DescriptionFormComponent,
        SpinnerStubComponent,
        ErrorMsgStubComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: NgbActiveModal, useValue: ngbActiveModal },
        { provide: DescriptionService, useValue: descriptionService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#save (success)', () => {
    const expectedDescription = 'this is a description';
    editSpy = descriptionService.edit.and.returnValue(of(true));
    closeSpy = ngbActiveModal.close.and.returnValue();
    component.descForm.setValue({description: expectedDescription});
    fixture.detectChanges();
    component.save();
    expect(ngbActiveModal.close).toHaveBeenCalledWith(expectedDescription);
  });

  it('#save (failure)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'error',
      status: 500, 
      statusText: 'Internal Server Error'
    });
    editSpy = descriptionService.edit.and.returnValue(throwError(errorResponse));
    fixture.detectChanges();
    component.save();
    expect(component.errorMsg).toEqual('An error occurred, please try again later.');
  });

  it('should dismiss modal', () => {
    dismissSpy = ngbActiveModal.dismiss.and.returnValue();
    component.dismissModal();
    expect(ngbActiveModal.dismiss).toHaveBeenCalled();
  });
});
