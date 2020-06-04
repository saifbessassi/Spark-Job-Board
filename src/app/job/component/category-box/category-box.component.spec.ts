import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBoxComponent } from './category-box.component';
import { Router } from '@angular/router';

describe('CategoryBoxComponent', () => {
  let component: CategoryBoxComponent;
  let fixture: ComponentFixture<CategoryBoxComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBoxComponent ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate with expected param', () => {
    component.label = 'category 1';
    const catBoxElement: HTMLElement = fixture.nativeElement;
    const button = catBoxElement.querySelector('button');
    button.click();
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first();
    const url = navArgs.args[0];
    const urlParam = navArgs.args[1].state.data[0];
    expect(urlParam.value).toEqual('category 1');
  });
});
