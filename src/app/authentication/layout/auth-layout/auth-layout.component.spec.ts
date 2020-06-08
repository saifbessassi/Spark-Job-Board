import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLayoutComponent } from './auth-layout.component';
import { RouterLinkDirectiveStub } from 'src/testing';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }

describe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AuthLayoutComponent,
        RouterLinkDirectiveStub,
        RouterOutletStubComponent
      ],
      providers: [
        {
          provide: Location,
          useValue: {
            back: () => {}
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have goBack method and should call location.back', () => {
    component.goBack();
    expect(component.goBack).toBeDefined();
  });
});
