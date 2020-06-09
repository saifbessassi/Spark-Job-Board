import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormComponent } from './project-form.component';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/core/services/resume/project/project.service';
import { of } from 'rxjs';
import { Project } from 'src/app/core/models/candidate/project.model';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent{}

@Component({selector: 'sp-error-msg', template: ''})
export class ErrorMsgStubComponent {
  @Input() errorMsg;
}

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;
  let ngbActiveModal;
  let projectService;
  let editSpy: jasmine.Spy;
  let addSpy: jasmine.Spy;
  let closeSpy: jasmine.Spy;
  let dismissSpy: jasmine.Spy;

  beforeEach(async(() => {
    projectService = jasmine.createSpyObj('ProjectService', ['edit', 'add']);
    ngbActiveModal = jasmine.createSpyObj('NgbActiveModal', ['close', 'dismiss']);
    TestBed.configureTestingModule({
      declarations: [ 
        ProjectFormComponent,
        SpinnerStubComponent,
        ErrorMsgStubComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: NgbActiveModal, useValue: ngbActiveModal },
        { provide: ProjectService, useValue: projectService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#save (add success)', () => {
    const expectedproject = {
      title: 'title',
      description: 'description'
    };
    addSpy = projectService.add.and.returnValue(of(expectedproject));
    closeSpy = ngbActiveModal.close.and.returnValue();
    component.projectForm.setValue(expectedproject);
    component.resumeID = 1;
    fixture.detectChanges();
    component.save();
    expect(ngbActiveModal.close).toHaveBeenCalledWith(expectedproject);
  });

  it('#save (edit success)', () => {
    const expectedproject = {
      id: 1,
      title: 'title',
      description: 'description'
    };
    editSpy = projectService.edit.and.returnValue(of(true));
    closeSpy = ngbActiveModal.close.and.returnValue();
    component.projectForm.setValue(
      {
        title: 'title',
        description: 'description'
      }
    );
    component.index = 0;
    const project = new Project;
    project.id = 1;
    component.project = project;
    fixture.detectChanges();
    component.save();
    expect(ngbActiveModal.close).toHaveBeenCalledWith({project: expectedproject, index: 0});
  });

  it('should dismiss modal', () => {
    dismissSpy = ngbActiveModal.dismiss.and.returnValue();
    component.dismissModal();
    expect(ngbActiveModal.dismiss).toHaveBeenCalled();
  });
});
