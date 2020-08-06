import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PasswordResetComponent } from './password-reset.component';
import { Component, Input } from '@angular/core';
import { RouterLinkDirectiveStub } from 'src/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/core/services/password/password.service';
import { PasswordValidator } from 'src/app/core/services/auth/passwordValidator.service';
import Stepper from 'bs-stepper';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent {}

@Component({selector: 'sp-error-msg', template: ''})
export class ErrorMsgStubComponent {
  @Input() errorMsg;
}

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let passwordService;
  let verifyPasswordRecoveryCodeSpy: jasmine.Spy;
  let resetPasswordWithCodeSpy: jasmine.Spy;
  let stepper;
  let stepperSpy: jasmine.Spy;

  beforeEach(async(() => {
    passwordService = jasmine.createSpyObj('PasswordService', ['verifyPasswordRecoveryCode', 'resetPasswordWithCode']);
    TestBed.configureTestingModule({
      declarations: [
        PasswordResetComponent,
        SpinnerStubComponent,
        ErrorMsgStubComponent,
        RouterLinkDirectiveStub
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [ 
        { provide: Router, useValue: routerSpy },
        { provide: PasswordService, useValue: passwordService },
        { provide: Stepper, useValue: {next: () => {}}},
        { 
          provide: PasswordValidator, 
          useValue: {
            MustMatch: () => {},
          } 
        }
      ]
    })
    .compileComponents();
    passwordService = TestBed.get(PasswordService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    stepper = TestBed.get(Stepper);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('#onCodeSubmit (success)', () => {
  //   verifyPasswordRecoveryCodeSpy = passwordService.verifyPasswordRecoveryCode.and.returnValue(of(true));
  //   spyOn(stepper, 'next').and.returnValue(true);
  //   component.onCodeSubmit();
  //   expect(stepper.next).toHaveBeenCalled();
  // });

  it('#onCodeSubmit (error 404)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'this is an error',
      status: 404, 
      statusText: ''
    });
    verifyPasswordRecoveryCodeSpy = passwordService.verifyPasswordRecoveryCode.and.returnValue(throwError(errorResponse));
    component.onCodeSubmit();
    fixture.detectChanges();
    expect(component.errorMsg).toEqual('this is an error');
  });

  it('#onCodeSubmit (error 500)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'this is an error',
      status: 500, 
      statusText: ''
    });
    verifyPasswordRecoveryCodeSpy = passwordService.verifyPasswordRecoveryCode.and.returnValue(throwError(errorResponse));
    component.onCodeSubmit();
    fixture.detectChanges();
    expect(component.errorMsg).toEqual('Unknown error! Please try again later.');
  });

  it('#onPasswordSubmit (success)', fakeAsync(() => {
    const expectedSuccessMsg = 'Your password has been successfully changed.';
    resetPasswordWithCodeSpy = passwordService.resetPasswordWithCode.and.returnValue(of({message: expectedSuccessMsg}));
    component.onPasswordSubmit();
    tick(3000);
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first();
    const url = navArgs.args[0];
    expect(url[0]).toEqual('auth/signin');
    expect(component.successMsg).toEqual(expectedSuccessMsg);
  }));

  it('#onPasswordSubmit (error)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'this is an error',
      status: 400, 
      statusText: ''
    });
    resetPasswordWithCodeSpy = passwordService.resetPasswordWithCode.and.returnValue(throwError(errorResponse));
    component.onPasswordSubmit();
    fixture.detectChanges();
    expect(component.errorMsg).toEqual('Unknown error! Please try again later.');
  });
});
