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

  it('should raise filterChoice event when clicked (skills)', () => {
    let expectedRes = new FilterChoice;
    expectedRes.value = "Angular";
    expectedRes.key = "skills.label";
    let res = new FilterChoice;
    component.filterChoice.subscribe((data: FilterChoice) => res = data);
    component.onCheckBox('Job Skills', 'Angular');
    expect(res).toEqual(expectedRes);
  });

  it('should raise filterChoice event when clicked (category)', () => {
    let expectedRes = new FilterChoice;
    expectedRes.value = "web development";
    expectedRes.key = "category.label";
    let res = new FilterChoice;
    component.filterChoice.subscribe((data: FilterChoice) => res = data);
    component.onCheckBox('Job Category', 'web development');
    expect(res).toEqual(expectedRes);
  });

  it('should raise filterChoice event when clicked (type)', () => {
    let expectedRes = new FilterChoice;
    expectedRes.value = "CDI";
    expectedRes.key = "employmentType";
    let res = new FilterChoice;
    component.filterChoice.subscribe((data: FilterChoice) => res = data);
    component.onCheckBox('Job Type', 'CDI');
    expect(res).toEqual(expectedRes);
  });

  it('should raise filterChoice event when clicked (experience)', () => {
    let expectedRes = new FilterChoice;
    expectedRes.value = "0 to 2 years";
    expectedRes.key = "seniorityLevel";
    let res = new FilterChoice;
    component.filterChoice.subscribe((data: FilterChoice) => res = data);
    component.onCheckBox('Job Experience', '0 to 2 years');
    expect(res).toEqual(expectedRes);
  });
});
