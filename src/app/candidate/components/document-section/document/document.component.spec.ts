import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DocumentComponent } from './document.component';
import { Component } from '@angular/core';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentFormComponent } from '../document-form/document-form.component';
import { Document } from 'src/app/core/models/candidate/document.model';

export class MockNgbModalRef {
  componentInstance = {
      cv: undefined,
      resumeID: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve('cv'));
}

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent{}

describe('DocumentComponent', () => {
  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;
  let ngbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  const document: Document = {
    id: 1,
    updatedAt: new Date(),
    url: 'url'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DocumentComponent,
        SpinnerStubComponent
      ],
      imports: [
        NgbModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentComponent);
    component = fixture.componentInstance;
    ngbModal = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    component.open();
    expect(ngbModal.open).toHaveBeenCalledWith(
      DocumentFormComponent, 
      { 
        centered: true,
        size: 'md',
        backdrop: 'static',
        keyboard: false 
      }
    );
  });

  it('should update closeResult when modal dismissed', fakeAsync(() => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    mockModalRef.result = new Promise((resolve, reject) => resolve(document));

    component.open();
    tick();
    expect(component.cv).toBe(document);
  }));

  it('', () => {
    spyOn(window, 'open');
    component.cv = document;
    fixture.detectChanges();
    component.viewCv();
    expect(window.open).toHaveBeenCalled();
  })
});
