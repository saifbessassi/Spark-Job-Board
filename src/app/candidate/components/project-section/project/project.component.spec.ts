import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { Component } from '@angular/core';
import { ProjectService } from 'src/app/core/services/resume/project/project.service';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Project } from 'src/app/core/models/candidate/project.model';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent{}

export class MockNgbModalRef {
  componentInstance = {
      description: undefined,
      resumeID: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve('description'));
}

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let ngbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  let projectService;
  let deleteSpy: jasmine.Spy;

  beforeEach(async(() => {
    projectService = jasmine.createSpyObj('ProjectService', ['delete']);
    TestBed.configureTestingModule({
      declarations: [ 
        ProjectComponent,
        SpinnerStubComponent 
      ],
      imports: [
        NgbModule
      ],
      providers: [
        { provide: ProjectService, useValue: projectService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    ngbModal = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should open modal', () => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    component.openNewForm();
    expect(ngbModal.open).toHaveBeenCalledWith(
      ProjectFormComponent, 
      { 
        centered: true, 
        size: 'lg'
      }
    );
  });

  it('should update closeResult when modal dismissed', fakeAsync(() => {
    component.projects = [];
    fixture.detectChanges();
    const project = new Project;
    project.id = 1;
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    mockModalRef.result = new Promise((resolve, reject) => resolve(project));

    component.openNewForm();
    tick();
    expect(component.projects[0]).toBe(project);
  }));

  it('#delete (success)', () => {
    const edu = new Project;
    edu.id = 1;
    component.projects = [edu];
    fixture.detectChanges();
    deleteSpy = projectService.delete.and.returnValue(of(true));
    spyOn(window, 'confirm').and.returnValue(true);
    component.delete(1, 0);
    expect(component.projects.length).toEqual(0);
  });

  it('#deleteCv (failure)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'error',
      status: 500, 
      statusText: 'Internal Server Error'
    });
    deleteSpy = projectService.delete.and.returnValue(throwError(errorResponse));
    spyOn(window, 'confirm').and.returnValue(true);
    component.delete(1,0);
    expect(component.isLoading).toBeFalsy();
  });

  it('#delete (cancel)', () => {
    deleteSpy = projectService.delete.and.returnValue(of(true));
    spyOn(window, 'confirm').and.returnValue(false);
    component.delete(1, 0);
    expect(deleteSpy).not.toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
  })
});
