import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sp-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  constructor() { }

  ngOnInit() {
  }

}
