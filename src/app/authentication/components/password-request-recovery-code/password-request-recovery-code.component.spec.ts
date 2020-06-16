import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRequestRecoveryCodeComponent } from './password-request-recovery-code.component';

describe('PasswordRequestRecoveryCodeComponent', () => {
  let component: PasswordRequestRecoveryCodeComponent;
  let fixture: ComponentFixture<PasswordRequestRecoveryCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordRequestRecoveryCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRequestRecoveryCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
