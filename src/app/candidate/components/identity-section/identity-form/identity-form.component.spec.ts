import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityFormComponent } from './identity-form.component';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidateService } from 'src/app/core/services/candidate/candidate.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { CandidateIdentity } from 'src/app/core/models/candidate/candidate-identity.model';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent{}

@Component({selector: 'ngb-progressbar', template: ''})
export class ProgressBarStubComponent{
  @Input() value;
}

describe('IdentityFormComponent', () => {
  let component: IdentityFormComponent;
  let fixture: ComponentFixture<IdentityFormComponent>;
  let ngbActiveModal;
  let candidateService;
  let authService;
  let updatePictureSpy: jasmine.Spy;
  let editSpy: jasmine.Spy;
  let addPictureSpy: jasmine.Spy;
  let deletePictureSpy: jasmine.Spy;
  let closeSpy: jasmine.Spy;
  let dismissSpy: jasmine.Spy;
  const identity = new CandidateIdentity;
  identity.resume = {
    id: '/api/resumes/1',
    seniorityLevel: '0 to 2 years'
  }
  identity.fullname = 'user user';
  identity.address = 'some address';
  identity.email = 'user@user.com';

  beforeEach(async(() => {
    candidateService = jasmine.createSpyObj('CandidateService', ['edit', 'addPicture', 'deletePicture']);
    authService = jasmine.createSpyObj('AuthenticationService', ['updatePicture']);
    ngbActiveModal = jasmine.createSpyObj('NgbActiveModal', ['close', 'dismiss']);
    TestBed.configureTestingModule({
      declarations: [ 
        IdentityFormComponent,
        SpinnerStubComponent,
        ProgressBarStubComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: NgbActiveModal, useValue: ngbActiveModal },
        { provide: CandidateService, useValue: candidateService },
        { provide: AuthenticationService, useValue: authService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityFormComponent);
    component = fixture.componentInstance;
    component.identity = identity;
    fixture.detectChanges();
  });

  it('#save (add success)', () => {
    editSpy = candidateService.edit.and.returnValue(of(true));
    closeSpy = ngbActiveModal.close.and.returnValue();
    component.identityForm.setValue(
      {
        fullname: 'user user',
        address: 'address',
        phone: '12345678',
        seniorityLevel: '0 to 2 years'
      }
    );
    component.identity = identity;
    fixture.detectChanges();
    component.save();
    expect(ngbActiveModal.close).toHaveBeenCalled();
  });

  it('#savePicture (success)', () => {
    const expectedRes = {
      id: 42,
      url: '/profile_pictures/saif_bessassi_3444/saif_bessassi_1591725245.png'
    };
    addPictureSpy = candidateService.addPicture.and.returnValue(of({type: 4, body: expectedRes}));
    component.savePicture();
    expect(component.identity.picture.url).toEqual('/profile_pictures/saif_bessassi_3444/saif_bessassi_1591725245.png');
  });

  it('#savePicture (loading)', () => {
    const expectedRes = {
      id: 42,
      url: '/profile_pictures/saif_bessassi_3444/saif_bessassi_1591725245.png'
    };
    addPictureSpy = candidateService.addPicture.and.returnValue(of({type: 1, loaded: 10, total: 100}));
    component.savePicture();
    expect(component.uploadProgress).toEqual(10);
  });

  it('#deletePicture (loading)', () => {
    component.identity.picture = {
      id: 1,
      url: 'url'
    };
    fixture.detectChanges();
    deletePictureSpy = candidateService.deletePicture.and.returnValue(of({type: 1, loaded: 10, total: 100}));
    spyOn(window, 'confirm').and.returnValue(true);
    component.deletePicture();
    expect(component.uploadProgress).toEqual(10);
  });

  it('#deletePicture (success)', () => {
    component.identity.picture = {
      id: 1,
      url: 'url'
    };
    fixture.detectChanges();
    deletePictureSpy = candidateService.deletePicture.and.returnValue(of({type: 4}));
    spyOn(window, 'confirm').and.returnValue(true);
    component.deletePicture();
    expect(component.identity.picture).toBeNull();
  });

  it('#deleteCv (failure)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'error',
      status: 500, 
      statusText: 'Internal Server Error'
    });
    component.identity.picture = {
      id: 1,
      url: 'url'
    };
    fixture.detectChanges();
    deletePictureSpy = candidateService.deletePicture.and.returnValue(throwError(errorResponse));
    spyOn(window, 'confirm').and.returnValue(true);
    component.deletePicture();
    expect(component.errorMsg).toEqual('An error occurred, please try again later.');
  });

  it('should dismiss modal', () => {
    dismissSpy = ngbActiveModal.dismiss.and.returnValue();
    component.dismissModal();
    expect(ngbActiveModal.dismiss).toHaveBeenCalled();
  });
});
