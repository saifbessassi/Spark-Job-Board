import { Component, OnInit, Input } from '@angular/core';
import { JobFiltersOptions } from 'src/app/core/models/job-filters-options.model';

@Component({
  selector: 'sp-jobs-filters',
  templateUrl: './jobs-filters.component.html',
  styleUrls: ['./jobs-filters.component.scss']
})
export class JobsFiltersComponent implements OnInit {

  @Input() filterOptions: JobFiltersOptions;
  @Input() checkedValue: string;

  constructor() { }

  ngOnInit() {
  }

}
