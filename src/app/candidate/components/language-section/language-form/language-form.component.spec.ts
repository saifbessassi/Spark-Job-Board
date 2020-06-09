import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageFormComponent } from './language-form.component';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageCandidateService } from 'src/app/core/services/resume/lang-candidate/lang-candidate.service';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { of } from 'rxjs';
import { LanguageCandidate } from 'src/app/core/models/candidate/lang-candidate.model';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent{}

@Component({selector: 'sp-error-msg', template: ''})
export class ErrorMsgStubComponent {
  @Input() errorMsg;
}

describe('LanguageCandidateFormComponent', () => {
  let component: LanguageFormComponent;
  let fixture: ComponentFixture<LanguageFormComponent>;
  let ngbActiveModal;
  let langCandidateService;
  let langService;
  let getAllLanguagesSpy: jasmine.Spy;
  let editSpy: jasmine.Spy;
  let addSpy: jasmine.Spy;
  let closeSpy: jasmine.Spy;
  let dismissSpy: jasmine.Spy;

  beforeEach(async(() => {
    langCandidateService = jasmine.createSpyObj('LangCandidateService', ['edit', 'add']);
    langService = jasmine.createSpyObj('LangService', ['getAllLanguages']);
    ngbActiveModal = jasmine.createSpyObj('NgbActiveModal', ['close', 'dismiss']);
    TestBed.configureTestingModule({
      declarations: [ 
        LanguageFormComponent,
        SpinnerStubComponent,
        ErrorMsgStubComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: NgbActiveModal, useValue: ngbActiveModal },
        { provide: LanguageCandidateService, useValue: langCandidateService },
        { provide: LanguageService, useValue: langService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageFormComponent);
    component = fixture.componentInstance;
    getAllLanguagesSpy = langService.getAllLanguages.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('#save (add success)', () => {
    const expectedLang = {
      id: 1,
      proficiency: 'good'
    };
    addSpy = langCandidateService.add.and.returnValue(of(expectedLang));
    closeSpy = ngbActiveModal.close.and.returnValue();
    component.langForm.setValue(expectedLang);
    component.resumeID = 1;
    fixture.detectChanges();
    component.save();
    expect(ngbActiveModal.close).toHaveBeenCalledWith(expectedLang);
  });

  it('#save (edit success)', () => {
    const expectedLang = {
      id: 1,
      proficiency: 'good'
    };
    editSpy = langCandidateService.edit.and.returnValue(of(expectedLang));
    closeSpy = ngbActiveModal.close.and.returnValue();
    component.langForm.setValue(
      {
        id: 1,
        proficiency: 'good'
      }
    );
    component.index = 0;
    const skillCand = new LanguageCandidate;
    skillCand.id = 1;
    component.languageCandidate = skillCand;
    fixture.detectChanges();
    component.save();
    expect(ngbActiveModal.close).toHaveBeenCalledWith({language: expectedLang, index: 0});
  });

  it('should dismiss modal', () => {
    dismissSpy = ngbActiveModal.dismiss.and.returnValue();
    component.dismissModal();
    expect(ngbActiveModal.dismiss).toHaveBeenCalled();
  });
});
