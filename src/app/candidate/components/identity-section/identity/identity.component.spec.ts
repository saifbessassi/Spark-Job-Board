import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityComponent } from './identity.component';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IdentityFormComponent } from '../identity-form/identity-form.component';

export class MockNgbModalRef {
  componentInstance = {
      description: undefined,
      resumeID: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve('description'));
}

describe('IdentityComponent', () => {
  let component: IdentityComponent;
  let fixture: ComponentFixture<IdentityComponent>;
  let ngbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityComponent ],
      imports: [
        NgbModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityComponent);
    component = fixture.componentInstance;
    ngbModal = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    component.openEditForm();
    expect(ngbModal.open).toHaveBeenCalledWith(
      IdentityFormComponent, 
      { 
        centered: true, 
        size: 'lg'
      }
    );
  });
});
