import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { RouterLinkDirectiveStub } from 'src/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../../models/user.service';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { SidebarService } from '../sidebar/sidebar.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthenticationService;
  let sidebarService: SidebarService;
  let router: Router;

  const user: User = {
    id: 1,
    email :'mail@mail.com',
    fullname: 'user user',
    roles: ['ROLE_CANDIDATE'],
    picture: 'photo.jpeg'
  }
  // let currentUserSpy: jasmine.Spy;

  beforeEach(async(() => {
    // const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    // const authenticationService = jasmine.createSpyObj('AuthenticationService', ['currentUser']);
    
    // let currentUser = of(user);
    // currentUserSpy = authenticationService.currentUser.and.returnValue( of(user) );

    TestBed.configureTestingModule({
      declarations: [ 
        HeaderComponent, 
        TopBarComponent,
        RouterLinkDirectiveStub
       ],
       providers: [
        {provide: Router, useValue: {navigate: () => {}}},
        {provide: AuthenticationService, useValue: {currentUser: of(user)}},
        {provide: SidebarService, useValue: {
          toggle: () => {}
        }}
        // { provide: Router, useValue: routerSpy },
        // { provide: AuthenticationService, useValue: authenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthenticationService);
    sidebarService = TestBed.get(SidebarService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('connected user', () => {
    it('should desplay connected user', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.currentUser).toEqual(user, 'should get connected user information');
      expect(component.photo).toEqual('http://localhost:8000' + user.picture, 'should edit picture url');
      expect(component.nameTwoLetter).toEqual('uu', 'should get the two first lettres of user\'s name');
      const navbarDe: DebugElement = fixture.debugElement;
      const userDropdownMenuDe = navbarDe.query(By.css('#navbarDropdownMenuLink'));
      const a: HTMLElement = userDropdownMenuDe.nativeElement;
      expect(a.textContent).toContain(user.fullname);
      const signinDe = navbarDe.query(By.css('#signin'));
      expect(signinDe).toBeNull();
    });
  });
  describe('no connected user', () => {
    beforeEach(() => {
      component.currentUser = null;
    });

    it(' should desplay signin button', () => {  
      component.ngOnInit();
      fixture.detectChanges();
      const navbarDe: DebugElement = fixture.debugElement;
      const signinDe = navbarDe.query(By.css('#signin'));
      const a: HTMLElement = signinDe.nativeElement;
      expect(a.textContent).toContain('Sign in');
    })
  })
});
