import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JobFiltersOptions } from 'src/app/core/models/job-filters-options.model';
import { FilterChoice } from 'src/app/core/models/filter-choice.model';

@Component({
  selector: 'sp-jobs-filters',
  templateUrl: './jobs-filters.component.html',
  styleUrls: ['./jobs-filters.component.scss']
})
export class JobsFiltersComponent implements OnInit {

  @Output() filterChoice = new EventEmitter<FilterChoice>();

  @Input() filterOptions: JobFiltersOptions;
  @Input() checkedValues: string[];

  constructor() { }

  ngOnInit() {
  }

  filter($event) {
    this.filterChoice.emit($event);
  }
}
