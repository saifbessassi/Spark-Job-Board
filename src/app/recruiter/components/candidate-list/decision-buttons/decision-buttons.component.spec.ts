import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionButtonsComponent } from './decision-buttons.component';

describe('DecisionButtonsComponent', () => {
  let component: DecisionButtonsComponent;
  let fixture: ComponentFixture<DecisionButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
