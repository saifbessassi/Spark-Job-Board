import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBoxComponent } from './filter-box.component';
import { FilterChoice } from 'src/app/core/models/filter-choice.model';

describe('FilterBoxComponent', () => {
  let component: FilterBoxComponent;
  let fixture: ComponentFixture<FilterBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBoxComponent);
    component = fixture.componentInstance;
    component.filterName = 'filter num 1';
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy();
  });

  it('should remove spaces', () => {
    const c = component.removeSpace('text without spaces');
    expect(c).toEqual('textwithoutspaces', 'should remove spaces');
  });

  it('should raise filterChoice event when clicked', () => {
    let expectedRes = new FilterChoice;
    expectedRes.value = "Angular";
    expectedRes.key = "skills.label";
    let res = new FilterChoice;
    component.filterChoice.subscribe((data: FilterChoice) => res = data);
    component.onCheckBox('Job Skills', 'Angular');
    expect(res).toEqual(expectedRes);
  })
});
