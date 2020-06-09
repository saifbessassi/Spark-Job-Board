import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentFormComponent } from './document-form.component';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { CvService } from 'src/app/core/services/resume/document/cv.service';
import { Document } from 'src/app/core/models/candidate/document.model';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent{}

@Component({selector: 'ngb-progressbar', template: ''})
export class ProgressBarStubComponent{
  @Input() value;
}

describe('DocumentFormComponent', () => {
  let component: DocumentFormComponent;
  let fixture: ComponentFixture<DocumentFormComponent>;
  let ngbActiveModal;
  let cvService;
  let addSpy: jasmine.Spy;
  let closeSpy: jasmine.Spy;
  let deleteSpy: jasmine.Spy;
  const document: Document = {
    id: 1,
    updatedAt: new Date(),
    url: 'url'
  }


  beforeEach(async(() => {
    cvService = jasmine.createSpyObj('CvService', ['add', 'delete']);
    ngbActiveModal = jasmine.createSpyObj('NgbActiveModal', ['close']);
    TestBed.configureTestingModule({
      declarations: [
        DocumentFormComponent,
        SpinnerStubComponent,
        ProgressBarStubComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: NgbActiveModal, useValue: ngbActiveModal },
        { provide: CvService, useValue: cvService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#addCv (success)', () => {
    const expectedRes = {
      file: null,
      id: 42,
      resumeID: 1441,
      updatedAt: "2020-06-09T11:14:16+00:00",
      url: "/documents/saif_bessassi_3444/saif_bessassi_1591701256.pdf"
    };
    const event = {
      target: {
        files: [
          new File([new Blob()], 'name')
        ]
      }
    }
    addSpy = cvService.add.and.returnValue(of({type: 4, body: expectedRes}));
    component.addCv(event);
    expect(component.cv.url).toEqual('/documents/saif_bessassi_3444/saif_bessassi_1591701256.pdf');
  });

  it('#deleteCv (success)', () => {
    component.cv = document;
    fixture.detectChanges();
    deleteSpy = cvService.delete.and.returnValue(of({type: 4}));
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteCv();
    expect(component.cv).toBeNull();
  });

  it('#deleteCv (loading)', () => {
    component.cv = document;
    fixture.detectChanges();
    deleteSpy = cvService.delete.and.returnValue(of({type: 1, loaded: 10, total: 100}));
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteCv();
    expect(component.uploadProgress).toEqual(10);
  });

  it('#deleteCv (failure)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'error',
      status: 500, 
      statusText: 'Internal Server Error'
    });
    component.cv = document;
    fixture.detectChanges();
    deleteSpy = cvService.delete.and.returnValue(throwError(errorResponse));
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteCv();
    expect(component.errorMsg[0]).toEqual('An error occurred, please try again later.');
  });
});
