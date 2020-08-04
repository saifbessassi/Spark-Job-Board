import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatPerSkillsComponent } from './candidat-per-skills.component';

describe('CandidatPerSkillsComponent', () => {
  let component: CandidatPerSkillsComponent;
  let fixture: ComponentFixture<CandidatPerSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatPerSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatPerSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
