import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutComponent } from './app-layout.component';
import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { User } from '../../models/user.service';
import { of } from 'rxjs';

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }

@Component({selector: 'sp-header', template: ''})
class HeaderStubComponent { @Input() isRecruiter: boolean}

@Component({selector: 'sp-footer', template: ''})
class FooterStubComponent { }

@Component({selector: 'sp-sidebar', template: '<div id="sidebar"></div>'})
class SidebarStubComponent { }

describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;
  let authService: AuthenticationService;
  let isRecruiterSpy: jasmine.Spy;
  let userService;
  const user: User = {
    id: 1,
    email :'mail@mail.com',
    fullname: 'user user',
    roles: ['ROLE_CANDIDATE'],
    picture: 'photo.jpeg'
  }

  beforeEach(async(() => {
    userService = jasmine.createSpyObj('UserService', ['isRecruiter']);
    TestBed.configureTestingModule({
      declarations: [ 
        AppLayoutComponent,
        RouterOutletStubComponent,
        HeaderStubComponent,
        FooterStubComponent,
        SidebarStubComponent
       ],
       providers: [
        {provide: AuthenticationService, useValue: {currentUser: of(user)}},
        {provide: UserService, useValue: userService},
      ]
    })
    .compileComponents();
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Connected Recruiter', () => {
    it('should display recruiter view', () => {
      isRecruiterSpy = userService.isRecruiter.and.returnValue(true);
      component.isRecruiter = true;
      fixture.detectChanges();
      component.ngOnInit();
      const sidebarElement: HTMLElement = fixture.nativeElement;
      const sidebar = sidebarElement.querySelector('sp-sidebar');
      expect(sidebar).toBeTruthy('should display sidebar');
      expect(component.isRecruiter).toEqual(true, 'should detecet connected recruiter');
    })
  });

  describe('no connected Recruiter', () => {
    it('should display user view', () => {
      isRecruiterSpy = userService.isRecruiter.and.returnValue(false);
      component.isRecruiter = false;
      fixture.detectChanges();
      component.ngOnInit();
      const sidebarElement: HTMLElement = fixture.nativeElement;
      const sidebar = sidebarElement.querySelector('sp-sidebar');
      expect(sidebar).toBeNull('should not display sidebar');
      expect(component.isRecruiter).toEqual(false, 'should detecet there is no recruiter');
    })
  });
});
