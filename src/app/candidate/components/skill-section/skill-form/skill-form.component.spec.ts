import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillFormComponent } from './skill-form.component';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SkillCandidateService } from 'src/app/core/services/resume/skill-candidate/skill-candidate.service';
import { SkillService } from 'src/app/core/services/skill/skill.service';
import { of } from 'rxjs';
import { SkillCandidate } from 'src/app/core/models/candidate/skill-candidate.model';


@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent{}

@Component({selector: 'sp-error-msg', template: ''})
export class ErrorMsgStubComponent {
  @Input() errorMsg;
}

describe('SkillCandidateFormComponent', () => {
  let component: SkillFormComponent;
  let fixture: ComponentFixture<SkillFormComponent>;
  let ngbActiveModal;
  let skillCandidateService;
  let skillService;
  let getAllSkillsSpy: jasmine.Spy;
  let editSpy: jasmine.Spy;
  let addSpy: jasmine.Spy;
  let closeSpy: jasmine.Spy;
  let dismissSpy: jasmine.Spy;

  beforeEach(async(() => {
    skillCandidateService = jasmine.createSpyObj('SkillCandidateService', ['edit', 'add']);
    skillService = jasmine.createSpyObj('SkillService', ['getAllSkills']);
    ngbActiveModal = jasmine.createSpyObj('NgbActiveModal', ['close', 'dismiss']);
    TestBed.configureTestingModule({
      declarations: [ 
        SkillFormComponent,
        SpinnerStubComponent,
        ErrorMsgStubComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: NgbActiveModal, useValue: ngbActiveModal },
        { provide: SkillCandidateService, useValue: skillCandidateService },
        { provide: SkillService, useValue: skillService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillFormComponent);
    component = fixture.componentInstance;
    getAllSkillsSpy = skillService.getAllSkills.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('#save (add success)', () => {
    const expectedskill = {
      id: 1,
      proficiency: 'good'
    };
    addSpy = skillCandidateService.add.and.returnValue(of(expectedskill));
    closeSpy = ngbActiveModal.close.and.returnValue();
    component.skillForm.setValue(expectedskill);
    component.resumeID = 1;
    fixture.detectChanges();
    component.save();
    expect(ngbActiveModal.close).toHaveBeenCalledWith(expectedskill);
  });

  it('#save (edit success)', () => {
    const expectedskill = {
      id: 1,
      proficiency: 'good'
    };
    editSpy = skillCandidateService.edit.and.returnValue(of(expectedskill));
    closeSpy = ngbActiveModal.close.and.returnValue();
    component.skillForm.setValue(
      {
        id: 1,
        proficiency: 'good'
      }
    );
    component.index = 0;
    const skillCand = new SkillCandidate;
    skillCand.id = 1;
    component.skillCandidate = skillCand;
    fixture.detectChanges();
    component.save();
    expect(ngbActiveModal.close).toHaveBeenCalledWith({skill: expectedskill, index: 0});
  });

  it('should dismiss modal', () => {
    dismissSpy = ngbActiveModal.dismiss.and.returnValue();
    component.dismissModal();
    expect(ngbActiveModal.dismiss).toHaveBeenCalled();
  });
});
