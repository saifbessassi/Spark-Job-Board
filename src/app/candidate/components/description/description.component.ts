import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sp-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
