import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAuthenticationComponent } from './social-authentication.component';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { of, throwError } from 'rxjs';

describe('SocialAuthenticationComponent', () => {
  let component: SocialAuthenticationComponent;
  let fixture: ComponentFixture<SocialAuthenticationComponent>;
  let authService;
  let signInSpy: jasmine.Spy;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const user = new SocialUser;
  user.authToken = 'this is an auth token';
  user.idToken = 'this is an id token';

  beforeEach(async(() => {
    authService = jasmine.createSpyObj('AuthService', ['signIn']);
    TestBed.configureTestingModule({
      declarations: [ SocialAuthenticationComponent ],
      providers: [ 
        { provide: Router, useValue: routerSpy },
        { provide: AuthenticationService, useValue: {socialSignin: () => of(true)} },
        { provide: AuthService, useValue: authService }
      ]
    })
    .compileComponents();
    authService = TestBed.get(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#socialSigninReq (location = signin)', () => {
    component.location = 'signin';
    fixture.detectChanges();
    component.socialSigninReq('token', 'provider');
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first();
    const url = navArgs.args[0];
    expect(url[0]).toEqual('/');
  });

  it('#socialSigninReq (location = apply)', () => {
    let expectedRes;
    component.location = 'apply';
    fixture.detectChanges();
    component.outputAuth.subscribe(
      data => expectedRes = data
    );
    component.socialSigninReq('token', 'provider');
    expect(expectedRes).toBeTruthy();
  });

  it('#socialSignIn (google)', () => {
    signInSpy = authService.signIn.and.returnValue(new Promise(resolve => resolve(user)));
    component.location = 'signin';
    fixture.detectChanges();
    component.socialSignIn('google');
    expect(signInSpy).toHaveBeenCalled()
  });

  it('#socialSignIn (facebook)', () => {
    signInSpy = authService.signIn.and.returnValue(new Promise(resolve => resolve(user)));
    component.location = 'signin';
    fixture.detectChanges();
    component.socialSignIn('facebook');
    expect(signInSpy).toHaveBeenCalled()
  });

  it('#socialSignIn (wrong)', () => {
    signInSpy = authService.signIn.and.returnValue(new Promise(resolve => resolve(user)));
    component.location = 'signin';
    fixture.detectChanges();
    component.socialSignIn('provider');
    expect(signInSpy).not.toHaveBeenCalled()
  });
});
