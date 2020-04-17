import { Component, OnInit, Input } from '@angular/core';
import { FilterPossibility } from 'src/app/core/models/filter-possibility.model';

@Component({
  selector: 'sp-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {

  @Input() filterPossibilities: FilterPossibility[];
  @Input() filterName: string;
  @Input() checkedValue: string;

  constructor() { }

  ngOnInit() {
  }

  removeSpace(ch: string) {
    return ch.replace(/\s/g, '');
  }
}
