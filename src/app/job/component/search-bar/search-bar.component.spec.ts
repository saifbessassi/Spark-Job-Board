import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ 
        SearchBarComponent 
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onSearchSubmit', () => {
    const formValues = {
      skill: 'Php',
      experience: '0 to 2 years',
      location: 'sfax'
    };
    component.searchForm.setValue(formValues);
    component.onSearchSubmit();
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first();
    const url = navArgs.args[0];
    const urlParam = navArgs.args[1].state.data;
    const expectedParam = [
      {key: "skills.label", value: "Php"},
      {key: "seniorityLevel", value: "0 to 2 years"},
      {key: "location", value: "sfax"}
    ];
    expect(urlParam).toEqual(expectedParam);
  });

});
