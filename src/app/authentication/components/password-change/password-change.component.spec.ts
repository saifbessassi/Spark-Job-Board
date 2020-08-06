import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { PasswordChangeComponent } from './password-change.component';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/core/services/password/password.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PasswordValidator } from 'src/app/core/services/auth/passwordValidator.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent {}

@Component({selector: 'sp-error-msg', template: ''})
export class ErrorMsgStubComponent {
  @Input() errorMsg;
}

describe('PasswordChangeComponent', () => {
  let component: PasswordChangeComponent;
  let fixture: ComponentFixture<PasswordChangeComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let passwordService;
  let tokenService;
  
  let changePasswordSpy: jasmine.Spy;

  beforeEach(async(() => {
    passwordService = jasmine.createSpyObj('PasswordService', ['changePassword']);
    tokenService = jasmine.createSpyObj('TokenService', ['setToken']);
    TestBed.configureTestingModule({
      declarations: [ 
        PasswordChangeComponent,
        SpinnerStubComponent,
        ErrorMsgStubComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [ 
        { provide: Router, useValue: routerSpy },
        { provide: PasswordService, useValue: passwordService },
        { provide: TokenService, useValue: tokenService },
        { 
          provide: PasswordValidator, 
          useValue: {
            DontMatch: () => {},
            MustMatch: () => {},
          } 
        },
      ]
    })
    .compileComponents();
    passwordService = TestBed.get(PasswordService);
    tokenService = TestBed.get(TokenService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#changePassword (success)', fakeAsync(() => {
    component.ngOnInit();
    const expectedSuccessMsg = 'Your password has been successfully changed.';
    changePasswordSpy = passwordService.changePassword.and.returnValue(of(true));
    component.passwordForm.setValue({
      newPassword: '1234',
      newRetypedPassword: '1234',
      oldPassword: '4321'
    });
    fixture.detectChanges();
    component.changePassword();
    tick(3000);
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first();
    const url = navArgs.args[0];
    expect(url[0]).toEqual('/home');
    expect(component.successMsg).toEqual(expectedSuccessMsg);
  }));

  it('#changePassword (error 400)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'this is an error',
      status: 400, 
      statusText: ''
    });
    changePasswordSpy = passwordService.changePassword.and.returnValue(throwError(errorResponse));
    component.changePassword();
    fixture.detectChanges();
    expect(component.errorMsg).toEqual('this is an error');
  });

  it('#signchangePasswordup (error 500)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'this is an error',
      status: 500, 
      statusText: ''
    });
    changePasswordSpy = passwordService.changePassword.and.returnValue(throwError(errorResponse));
    component.changePassword();
    fixture.detectChanges();
    expect(component.errorMsg).toEqual('Unknown error! Please try again later.');
  });
});
