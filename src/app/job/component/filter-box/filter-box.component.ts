import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterPossibility } from 'src/app/core/models/filter-possibility.model';
import { FilterChoice } from 'src/app/core/models/filter-choice.model';

@Component({
  selector: 'sp-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {

  @Output() filterChoice = new EventEmitter<FilterChoice>();

  @Input() filterPossibilities: FilterPossibility[];
  @Input() filterName: string;
  @Input() checkedValues: string[];

  constructor() { }

  ngOnInit() {
  }

  removeSpace(ch: string) {
    return ch.replace(/\s/g, '');
  }

  onCheckBox(key: string, value: string) {
    const choice = new FilterChoice();
    choice.value = value;
    switch (key) {
      case 'Job Category':
        choice.key = 'category.label';
        break;
      case 'Job Skills':
        choice.key = 'skills.label';
        break;
      case 'Job Type':
        choice.key = 'employmentType';
        break;
        case 'Job Location':
          choice.key = 'location';
          break;
        case 'Job Experience':
          choice.key = 'seniorityLevel';
          break;
      default:
        break;
    }

    this.filterChoice.emit(choice);
  }
}
