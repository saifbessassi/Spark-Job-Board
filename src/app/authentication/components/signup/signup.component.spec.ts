import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { of, throwError } from 'rxjs';
import { RouterLinkDirectiveStub } from 'src/testing';
import { PasswordValidator } from 'src/app/core/services/auth/passwordValidator.service';
import { AuthService as SocialAuthService, SocialUser } from 'angularx-social-login';
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

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authenticationService;
  let socialSigninSpy: jasmine.Spy;
  let signUpSpy: jasmine.Spy;
  let authService;
  let signInSpy: jasmine.Spy;
  let routerSpy
  const user = new SocialUser;
  user.authToken = 'this is an auth token';

  beforeEach(async(() => {
    authService = jasmine.createSpyObj('AuthService', ['signIn']);
    authenticationService = jasmine.createSpyObj('AuthenticationService', ['signup', 'socialSignin']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ 
        SignupComponent,
        RouterLinkDirectiveStub,
        SocialAuthenticationStubComponent,
        SpinnerStubComponent,
        ErrorMsgStubComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [ 
        { provide: Router, useValue: routerSpy },
        { provide: AuthenticationService, useValue: authenticationService },
        { provide: PasswordValidator, useValue: {MustMatch: () => {}} },
        { provide: SocialAuthService, useValue: authService },
      ]
    })
    .compileComponents();
    authService = TestBed.get(SocialAuthService);
    authenticationService = TestBed.get(AuthenticationService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#signup (success)', fakeAsync(() => {
    signUpSpy = authenticationService.signup.and.returnValue(of(true));
    component.signup();
    tick(6000);
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first();
    const url = navArgs.args[0];
    expect(url[0]).toEqual('auth/signin');
  }));

  it('#signup (failure)', () => {
    const errorResponse = new HttpErrorResponse({
      error: {
        violations: [
          {
            propertyPath: 'email',
            message: 'is used'
          }
        ]
      },
      status: 500, 
      statusText: 'Internal Server Error'
    });
    signUpSpy = authenticationService.signup.and.returnValue(throwError(errorResponse));
    component.signup();
    fixture.detectChanges();
    expect(component.signupError[0]).toEqual('email: is used');
  });

  it('#socialSignUp (google)', () => {
    signInSpy = authService.signIn.and.returnValue(new Promise(resolve => resolve(user)));
    component.location = 'signin';
    fixture.detectChanges();
    component.socialSignUp('google');
    expect(signInSpy).toHaveBeenCalled()
  });

  it('#socialSignUp (facebook)', () => {
    signInSpy = authService.signIn.and.returnValue(new Promise(resolve => resolve(user)));
    component.location = 'signin';
    fixture.detectChanges();
    component.socialSignUp('facebook');
    expect(signInSpy).toHaveBeenCalled()
  });

  it('#socialSignUp (wrong)', () => {
    signInSpy = authService.signIn.and.returnValue(new Promise(resolve => resolve(user)));
    component.location = 'signin';
    fixture.detectChanges();
    component.socialSignUp('provider');
    expect(signInSpy).not.toHaveBeenCalled()
  });

  it('#socialSigninReq', () => {
    socialSigninSpy = authenticationService.socialSignin.and.returnValue(of(user));
    component.socialSignupReq('token', 'provider');
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first();
    const url = navArgs.args[0];
    expect(url[0]).toEqual('/');
  });
});
