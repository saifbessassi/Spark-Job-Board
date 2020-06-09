import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SkillComponent } from './skill.component';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SkillCandidateService } from 'src/app/core/services/resume/skill-candidate/skill-candidate.service';
import { SkillFormComponent } from '../skill-form/skill-form.component';
import { SkillCandidate } from 'src/app/core/models/candidate/skill-candidate.model';
import { Skill } from 'src/app/core/models/skill.model';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export class MockNgbModalRef {
  componentInstance = {
      description: undefined,
      resumeID: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve('description'));
}

describe('SkillComponent', () => {
  let component: SkillComponent;
  let fixture: ComponentFixture<SkillComponent>;
  let ngbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  let skillCandidateService;
  let deleteSpy: jasmine.Spy;

  beforeEach(async(() => {
    skillCandidateService = jasmine.createSpyObj('SkillCandidateService', ['delete']);
    TestBed.configureTestingModule({
      declarations: [ SkillComponent ],
      imports: [
        NgbModule
      ],
      providers: [
        { provide: SkillCandidateService, useValue: skillCandidateService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillComponent);
    component = fixture.componentInstance;
    ngbModal = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should open modal', () => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    component.openNewForm();
    expect(ngbModal.open).toHaveBeenCalledWith(
      SkillFormComponent, 
      { 
        centered: true, 
        size: 'lg'
      }
    );
  });

  it('should update closeResult when modal dismissed', fakeAsync(() => {
    component.skills = [];
    fixture.detectChanges();
    const lang = new SkillCandidate;
    lang.id = 1;
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    mockModalRef.result = new Promise((resolve, reject) => resolve(lang));

    component.openNewForm();
    tick();
    expect(component.skills[0]).toBe(lang);
  }));

  it('#delete (success)', () => {
    const skill = new Skill;
    skill.id = 1;
    skill.label = 'java';
    const skillCand = new SkillCandidate;
    skillCand.id = 1;
    skillCand.skill = skill;
    skillCand.proficiency = 'good';
    component.skills = [skillCand];
    fixture.detectChanges();
    deleteSpy = skillCandidateService.delete.and.returnValue(of(true));
    spyOn(window, 'confirm').and.returnValue(true);
    component.delete(1, 0);
    expect(component.skills.length).toEqual(0);
  });

  it('#deleteCv (failure)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'error',
      status: 500, 
      statusText: 'Internal Server Error'
    });
    deleteSpy = skillCandidateService.delete.and.returnValue(throwError(errorResponse));
    spyOn(window, 'confirm').and.returnValue(true);
    component.delete(1,0);
    expect(component.isLoading).toBeFalsy();
  });

  it('#delete (cancel)', () => {
    deleteSpy = skillCandidateService.delete.and.returnValue(of(true));
    spyOn(window, 'confirm').and.returnValue(false);
    component.delete(1, 0);
    expect(deleteSpy).not.toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
  })
});
