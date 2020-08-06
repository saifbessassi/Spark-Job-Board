import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PasswordRequestRecoveryCodeComponent } from './password-request-recovery-code.component';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/core/services/password/password.service';
import { RouterLinkDirectiveStub } from 'src/testing';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent {}

@Component({selector: 'sp-error-msg', template: ''})
export class ErrorMsgStubComponent {
  @Input() errorMsg;
}

describe('PasswordRequestRecoveryCodeComponent', () => {
  let component: PasswordRequestRecoveryCodeComponent;
  let fixture: ComponentFixture<PasswordRequestRecoveryCodeComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let passwordService;
  
  let requesPasswordRecoveryCodeSpy: jasmine.Spy;

  beforeEach(async(() => {
    passwordService = jasmine.createSpyObj('PasswordService', ['requesPasswordRecoveryCode']);
    TestBed.configureTestingModule({
      declarations: [ 
        PasswordRequestRecoveryCodeComponent,
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
        { provide: PasswordService, useValue: passwordService }
      ]
    })
    .compileComponents();
    passwordService = TestBed.get(PasswordService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRequestRecoveryCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#requestPasswordRecoveryCode (success)', fakeAsync(() => {
    const expectedSuccessMsg = 'code sent.';
    requesPasswordRecoveryCodeSpy = passwordService.requesPasswordRecoveryCode.and.returnValue(of({message: expectedSuccessMsg}));
    component.requestCodeForm.setValue({
      email: 'mail@mail.com'
    });
    fixture.detectChanges();
    component.requestPasswordRecoveryCode();
    tick(3000);
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first();
    const url = navArgs.args[0];
    expect(url[0]).toEqual('auth/password-reset');
    expect(component.successMsg).toEqual(expectedSuccessMsg);
  }));

  it('#requestPasswordRecoveryCode (error)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'this is an error',
      status: 400, 
      statusText: ''
    });
    requesPasswordRecoveryCodeSpy = passwordService.requesPasswordRecoveryCode.and.returnValue(throwError(errorResponse));
    component.requestPasswordRecoveryCode();
    fixture.detectChanges();
    expect(component.errorMsg).toEqual('this is an error');
  });
});
