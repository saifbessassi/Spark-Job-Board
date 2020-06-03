import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkDirectiveStub } from 'src/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let routerLinks: RouterLinkDirectiveStub[];
  let linkDes: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SidebarComponent,
        RouterLinkDirectiveStub 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(4, 'should have 4 routerLinks');
    expect(routerLinks[0].linkParams).toBe('/recruiter/dashboard');
    expect(routerLinks[1].linkParams).toBe('/recruiter/jobs-list');
    expect(routerLinks[2].linkParams).toBe('/recruiter/add-job');
    expect(routerLinks[3].linkParams).toBe('/recruiter/all-candidates');
  });

  it('can click Dashboard link in template', () => {
    const dashboardLinkDe = linkDes[0];   // dashboard link DebugElement
    const dashboardLink = routerLinks[0]; // dashboard link directive

    expect(dashboardLink.navigatedTo).toBeNull('should not have navigated yet');

    dashboardLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(dashboardLink.navigatedTo).toBe('/recruiter/dashboard');
  });
});

