import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LanguageComponent } from './language.component';
import { Component } from '@angular/core';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageCandidateService } from 'src/app/core/services/resume/lang-candidate/lang-candidate.service';
import { LanguageFormComponent } from '../language-form/language-form.component';
import { LanguageCandidate } from 'src/app/core/models/candidate/lang-candidate.model';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { Language } from 'src/app/core/models/language.model';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent{}

export class MockNgbModalRef {
  componentInstance = {
      description: undefined,
      resumeID: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve('description'));
}

describe('LanguageComponent', () => {
  let component: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;
  let ngbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  let langCandidateService;
  let deleteSpy: jasmine.Spy;

  beforeEach(async(() => {
    langCandidateService = jasmine.createSpyObj('LanguageCandidateService', ['delete']);
    TestBed.configureTestingModule({
      declarations: [ 
        LanguageComponent,
        SpinnerStubComponent 
      ],
      imports: [
        NgbModule
      ],
      providers: [
        { provide: LanguageCandidateService, useValue: langCandidateService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageComponent);
    component = fixture.componentInstance;
    ngbModal = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should open modal', () => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    component.openNewForm();
    expect(ngbModal.open).toHaveBeenCalledWith(
      LanguageFormComponent, 
      { 
        centered: true, 
        size: 'lg'
      }
    );
  });

  it('should update closeResult when modal dismissed', fakeAsync(() => {
    component.languages = [];
    fixture.detectChanges();
    const lang = new LanguageCandidate;
    lang.id = 1;
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    mockModalRef.result = new Promise((resolve, reject) => resolve(lang));

    component.openNewForm();
    tick();
    expect(component.languages[0]).toBe(lang);
  }));

  it('#delete (success)', () => {
    const lang = new Language;
    lang.id = 1;
    lang.label = 'arabic';
    const langCand = new LanguageCandidate;
    langCand.id = 1;
    langCand.language = lang;
    langCand.proficiency = 'good';
    component.languages = [langCand];
    fixture.detectChanges();
    deleteSpy = langCandidateService.delete.and.returnValue(of(true));
    spyOn(window, 'confirm').and.returnValue(true);
    component.delete(1, 0);
    expect(component.languages.length).toEqual(0);
  });

  it('#deleteCv (failure)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'error',
      status: 500, 
      statusText: 'Internal Server Error'
    });
    deleteSpy = langCandidateService.delete.and.returnValue(throwError(errorResponse));
    spyOn(window, 'confirm').and.returnValue(true);
    component.delete(1,0);
    expect(component.isLoading).toBeFalsy();
  });

  it('#delete (cancel)', () => {
    deleteSpy = langCandidateService.delete.and.returnValue(of(true));
    spyOn(window, 'confirm').and.returnValue(false);
    component.delete(1, 0);
    expect(deleteSpy).not.toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
  })
});
