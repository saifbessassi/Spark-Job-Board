import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DescriptionComponent } from './description.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DescriptionFormComponent } from '../description-form/description-form.component';

// Mock class for NgbModalRef
export class MockNgbModalRef {
  componentInstance = {
      description: undefined,
      resumeID: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve('description'));
}

describe('DescriptionComponent', () => {
  let component: DescriptionComponent;
  let fixture: ComponentFixture<DescriptionComponent>;
  let ngbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionComponent ],
      imports: [
        NgbModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionComponent);
    component = fixture.componentInstance;
    ngbModal = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    component.open();
    expect(ngbModal.open).toHaveBeenCalledWith(DescriptionFormComponent, { centered: true, size: 'lg' });
  });

  it('should update closeResult when modal dismissed', fakeAsync(() => {
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef);
    mockModalRef.result = new Promise((resolve, reject) => resolve('y'));

    component.open();
    tick();
    expect(component.description).toBe('y');
  }));
});
