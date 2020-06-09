import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EducationComponent } from './education.component';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EducationFormComponent } from '../education-form/education-form.component';
import { EducationService } from 'src/app/core/services/resume/education/education.service';
import { Education } from 'src/app/core/models/candidate/education.model';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export class MockNgbModalRef {
  componentInstance = {
      description: undefined,
      resumeID: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve('description'));
}

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;
  let ngbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  let educationService;
  let deleteSpy: jasmine.Spy;

  beforeEach(async(() => {
    educationService = jasmine.createSpyObj('EducationService', ['delete']);
    TestBed.configureTestingModule({
      declarations: [ EducationComponent ],
      imports: [
        NgbModule
      ],
      providers: [
        { provide: EducationService, useValue: educationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    ngbModal = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should open modal', () => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    component.openNewForm();
    expect(ngbModal.open).toHaveBeenCalledWith(
      EducationFormComponent, 
      { 
        centered: true, 
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      }
    );
  });

  it('should update closeResult when modal dismissed', fakeAsync(() => {
    component.educations = [];
    fixture.detectChanges();
    const education = new Education;
    education.id = 1;
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    mockModalRef.result = new Promise((resolve, reject) => resolve(education));

    component.openNewForm();
    tick();
    expect(component.educations[0]).toBe(education);
  }));

  it('#delete (success)', () => {
    const edu = new Education;
    edu.id = 1;
    component.educations = [edu];
    fixture.detectChanges();
    deleteSpy = educationService.delete.and.returnValue(of(true));
    spyOn(window, 'confirm').and.returnValue(true);
    component.delete(1, 0);
    expect(component.educations.length).toEqual(0);
  });

  it('#deleteCv (failure)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'error',
      status: 500, 
      statusText: 'Internal Server Error'
    });
    deleteSpy = educationService.delete.and.returnValue(throwError(errorResponse));
    spyOn(window, 'confirm').and.returnValue(true);
    component.delete(1,0);
    expect(component.isLoading).toBeFalsy();
  });

  it('#delete (cancel)', () => {
    deleteSpy = educationService.delete.and.returnValue(of(true));
    spyOn(window, 'confirm').and.returnValue(false);
    component.delete(1, 0);
    expect(deleteSpy).not.toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
  })
});
