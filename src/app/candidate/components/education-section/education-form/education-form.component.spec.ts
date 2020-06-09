import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationFormComponent } from './education-form.component';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { EducationService } from 'src/app/core/services/resume/education/education.service';
import { NgbDateService } from 'src/app/core/services/date/ngb-date.service';
import { of } from 'rxjs';
import { Education } from 'src/app/core/models/candidate/education.model';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent{}

@Component({selector: 'sp-error-msg', template: ''})
export class ErrorMsgStubComponent {
  @Input() errorMsg;
}

describe('EducationFormComponent', () => {
  let component: EducationFormComponent;
  let fixture: ComponentFixture<EducationFormComponent>;
  let ngbActiveModal;
  let educationService;
  let ngbDateService;
  let editSpy: jasmine.Spy;
  let addSpy: jasmine.Spy;
  let stringToDateSpy: jasmine.Spy;
  let dateToStringaddSpy: jasmine.Spy;
  let closeSpy: jasmine.Spy;
  let dismissSpy: jasmine.Spy;

  beforeEach(async(() => {
    educationService = jasmine.createSpyObj('EducationService', ['edit', 'add']);
    ngbDateService = jasmine.createSpyObj('NgbDateService', ['dateToString', 'stringToDate']);
    ngbActiveModal = jasmine.createSpyObj('NgbActiveModal', ['close', 'dismiss']);
    TestBed.configureTestingModule({
      declarations: [ 
        EducationFormComponent,
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
        { provide: EducationService, useValue: educationService },
        { provide: NgbDateService, useValue: ngbDateService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#save (add success)', () => {
    const expectededu = {
      school: 'school',
      degree: 'degree',
      dateStart: new Date(),
      dateEnd: new Date(),
    };
    addSpy = educationService.add.and.returnValue(of(expectededu));
    closeSpy = ngbActiveModal.close.and.returnValue();
    stringToDateSpy = ngbDateService.stringToDate.and.returnValue(new Date);
    component.eduForm.setValue(expectededu);
    component.resumeID = 1;
    fixture.detectChanges();
    component.save();
    expect(ngbActiveModal.close).toHaveBeenCalledWith(expectededu);
  });

  it('#save (edit success)', () => {
    const expectededu = {
      id: 1,
      school: 'school',
      degree: 'degree',
      dateStart: new Date(),
      dateEnd: new Date(),
    };
    editSpy = educationService.edit.and.returnValue(of(true));
    closeSpy = ngbActiveModal.close.and.returnValue();
    stringToDateSpy = ngbDateService.stringToDate.and.returnValue(new Date);
    component.eduForm.setValue(
      {
        school: 'school',
        degree: 'degree',
        dateStart: new Date(),
        dateEnd: new Date(),
      }
    );
    component.index = 0;
    const edu = new Education;
    edu.id = 1;
    component.education = edu;
    fixture.detectChanges();
    component.save();
    expect(ngbActiveModal.close).toHaveBeenCalledWith({edu: expectededu, index: 0});
  });
});
