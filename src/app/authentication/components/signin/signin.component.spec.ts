import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { of, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkDirectiveStub } from 'src/testing';
import { HttpErrorResponse } from '@angular/common/http';

@Component({selector: 'sp-spinner', template: ''})
export class SpinnerStubComponent {}

@Component({selector: 'sp-error-msg', template: ''})
export class ErrorMsgStubComponent {
  @Input() errorMsg;
}

@Component({selector: 'sp-social-authentication', template: ''})
export class SocialAuthenticationStubComponent {
  @Input() location;
}

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let authenticationService;
  let signinSpy: jasmine.Spy;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    authenticationService = jasmine.createSpyObj('AuthenticationService', ['signin']);
    TestBed.configureTestingModule({
      declarations: [ 
        SigninComponent,
        RouterLinkDirectiveStub,
        SpinnerStubComponent,
        ErrorMsgStubComponent,
        SocialAuthenticationStubComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [ 
        { provide: Router, useValue: routerSpy },
        { provide: AuthenticationService, useValue: authenticationService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#socialSigninReq (location = signin)', () => {
    signinSpy = authenticationService.signin.and.returnValue(of(true));
    component.location = 'signin';
    fixture.detectChanges();
    component.emailSignin();
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first();
    const url = navArgs.args[0];
    expect(url[0]).toEqual('/');
  });

  it('#socialSigninReq (location = apply)', () => {
    signinSpy = authenticationService.signin.and.returnValue(of(true));
    component.location = 'apply';
    fixture.detectChanges();
    component.emailSignin();
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first();
    const url = navArgs.args[0];
    expect(url[0]).toEqual('/');
  });

  it('#socialSigninReq failure', () => {
    const errorResponse = new HttpErrorResponse({
      error: {
        message: 'this is an error'
      },
      status: 500, 
      statusText: 'Internal Server Error'
    });
    signinSpy = authenticationService.signin.and.returnValue(throwError(errorResponse));
    component.emailSignin();
    expect(component.loginError[0]).toEqual('this is an error');
  });
});
