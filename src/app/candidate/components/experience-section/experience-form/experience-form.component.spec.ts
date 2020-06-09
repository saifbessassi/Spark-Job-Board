import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceFormComponent } from './experience-form.component';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateService } from 'src/app/core/services/date/ngb-date.service';
import { ExperienceService } from 'src/app/core/services/resume/experience/experience.service';
import { of } from 'rxjs';
import { Experience } from 'src/app/core/models/candidate/experience.model';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent{}

@Component({selector: 'sp-error-msg', template: ''})
export class ErrorMsgStubComponent {
  @Input() errorMsg;
}

describe('ExperienceFormComponent', () => {
  let component: ExperienceFormComponent;
  let fixture: ComponentFixture<ExperienceFormComponent>;
  let ngbActiveModal;
  let experienceService;
  let ngbDateService;
  let editSpy: jasmine.Spy;
  let addSpy: jasmine.Spy;
  let stringToDateSpy: jasmine.Spy;
  let dateToStringaddSpy: jasmine.Spy;
  let closeSpy: jasmine.Spy;
  let dismissSpy: jasmine.Spy;

  beforeEach(async(() => {
    experienceService = jasmine.createSpyObj('ExperienceService', ['edit', 'add']);
    ngbDateService = jasmine.createSpyObj('NgbDateService', ['dateToString', 'stringToDate']);
    ngbActiveModal = jasmine.createSpyObj('NgbActiveModal', ['close', 'dismiss']);
    TestBed.configureTestingModule({
      declarations: [ 
        ExperienceFormComponent,
        SpinnerStubComponent,
        ErrorMsgStubComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule
      ],
      providers: [
        { provide: NgbActiveModal, useValue: ngbActiveModal },
        { provide: ExperienceService, useValue: experienceService },
        { provide: NgbDateService, useValue: ngbDateService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#save (add success)', () => {
    const expectedexp = {
      company: 'company',
      title: 'title',
      location: 'location',
      description: 'description',
      dateStart: new Date(),
      dateEnd: new Date(),
    };
    addSpy = experienceService.add.and.returnValue(of(expectedexp));
    closeSpy = ngbActiveModal.close.and.returnValue();
    stringToDateSpy = ngbDateService.stringToDate.and.returnValue(new Date);
    component.expForm.setValue(expectedexp);
    component.resumeID = 1;
    fixture.detectChanges();
    component.save();
    expect(ngbActiveModal.close).toHaveBeenCalledWith(expectedexp);
  });

  it('#save (edit success)', () => {
    const expectedexp = {
      id: 1,
      company: 'company',
      title: 'title',
      location: 'location',
      description: 'description',
      dateStart: new Date(),
      dateEnd: new Date(),
    };
    editSpy = experienceService.edit.and.returnValue(of(true));
    closeSpy = ngbActiveModal.close.and.returnValue();
    stringToDateSpy = ngbDateService.stringToDate.and.returnValue(new Date);
    component.expForm.setValue(
      {
        company: 'company',
        title: 'title',
        location: 'location',
        description: 'description',
        dateStart: new Date(),
        dateEnd: new Date(),
      }
    );
    component.index = 0;
    const exp = new Experience;
    exp.id = 1;
    component.experience = exp;
    fixture.detectChanges();
    component.save();
    expect(ngbActiveModal.close).toHaveBeenCalledWith({exp: expectedexp, index: 0});
  });
});
