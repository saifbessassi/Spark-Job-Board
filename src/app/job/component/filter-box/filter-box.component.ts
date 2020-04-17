import { Component, OnInit, Input } from '@angular/core';
import { FilterChoice } from 'src/app/core/models/filter-choice.model';

@Component({
  selector: 'sp-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {

  @Input() filterChoices: FilterChoice[];
  @Input() filterName: string;
  @Input() checkedValue: string;

  constructor() { }

  ngOnInit() {
  }

  removeSpace(ch: string) {
    return ch.replace(/\s/g, '');
  }
}
