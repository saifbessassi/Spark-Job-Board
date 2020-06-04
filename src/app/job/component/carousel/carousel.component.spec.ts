import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display expected title and text', () => {
    const expectedTitle = 'this is a title';
    const expectedtext = 'text text text text text text ';
    component.text = expectedtext;
    component.title = expectedTitle;
    fixture.detectChanges();
    const carouselElement: HTMLElement = fixture.nativeElement;
    const h2 = carouselElement.querySelector('h2');
    const p = carouselElement.querySelector('p');
    expect(h2.textContent).toEqual(expectedTitle, 'should display expected title');
    expect(p.textContent).toEqual(expectedtext, 'should display expected text');
  })
});
