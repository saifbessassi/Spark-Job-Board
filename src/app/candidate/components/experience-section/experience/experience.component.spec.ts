import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ExperienceComponent } from './experience.component';
import { Component } from '@angular/core';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExperienceFormComponent } from '../experience-form/experience-form.component';
import { Experience } from 'src/app/core/models/candidate/experience.model';
import { ExperienceService } from 'src/app/core/services/resume/experience/experience.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, of } from 'rxjs';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent{}

export class MockNgbModalRef {
  componentInstance = {
      description: undefined,
      resumeID: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve('description'));
}

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let ngbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  let experienceService;
  let deleteSpy: jasmine.Spy;

  beforeEach(async(() => {
    experienceService = jasmine.createSpyObj('ExperienceService', ['delete']);
    TestBed.configureTestingModule({
      declarations: [ 
        ExperienceComponent,
        SpinnerStubComponent 
      ],
      imports: [
        NgbModule
      ],
      providers: [
        { provide: ExperienceService, useValue: experienceService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    ngbModal = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    component.openNewForm();
    expect(ngbModal.open).toHaveBeenCalledWith(
      ExperienceFormComponent, 
      { 
        centered: true, 
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      }
    );
  });

  it('should update closeResult when modal dismissed', fakeAsync(() => {
    component.experiences = [];
    fixture.detectChanges();
    const experience = new Experience;
    experience.id = 1;
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    mockModalRef.result = new Promise((resolve, reject) => resolve(experience));

    component.openNewForm();
    tick();
    expect(component.experiences[0]).toBe(experience);
  }));

  it('#delete (success)', () => {
    const edu = new Experience;
    edu.id = 1;
    component.experiences = [edu];
    fixture.detectChanges();
    deleteSpy = experienceService.delete.and.returnValue(of(true));
    spyOn(window, 'confirm').and.returnValue(true);
    component.delete(1, 0);
    expect(component.experiences.length).toEqual(0);
  });

  it('#deleteCv (failure)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'error',
      status: 500, 
      statusText: 'Internal Server Error'
    });
    deleteSpy = experienceService.delete.and.returnValue(throwError(errorResponse));
    spyOn(window, 'confirm').and.returnValue(true);
    component.delete(1,0);
    expect(component.isLoading).toBeFalsy();
  });

  it('#delete (cancel)', () => {
    deleteSpy = experienceService.delete.and.returnValue(of(true));
    spyOn(window, 'confirm').and.returnValue(false);
    component.delete(1, 0);
    expect(deleteSpy).not.toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
  })
});
