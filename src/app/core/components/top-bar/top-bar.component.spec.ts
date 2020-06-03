import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TopBarComponent } from './top-bar.component';
import { RouterTestingModule } from '@angular/router/testing';

import { ALL_ROUTES } from '../../routes/all-routes';
import { click } from 'src/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { SpyLocation }         from '@angular/common/testing';
import { AppLayoutComponent } from '../../layouts/app-layout/app-layout.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let homeLinkDeb: DebugElement;
  let location: SpyLocation;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(ALL_ROUTES),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should navigate to "Home" on click', fakeAsync(() => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    this.homeLinkDeb = links[0];
    click(homeLinkDeb);

    tick(); // wait while navigating
    fixture.detectChanges(); // update view
    tick(); // wait for async data to arrive

    expect(location.path()).toEqual('/about', 'location.path()');
    const el = fixture.debugElement.query(By.directive(AppLayoutComponent));
    expect(el).toBeTruthy('expected an element for ' + AppLayoutComponent.name);
  }));
});
