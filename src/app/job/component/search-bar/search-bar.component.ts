import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { JobFiltersOptions } from 'src/app/core/models/job-filters-options.model';

@Component({
  selector: 'sp-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() filterOptions: JobFiltersOptions;
  searchForm: FormGroup;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // Initialise search form
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchForm = new FormGroup({
      skill: new FormControl(null),
      experience: new FormControl(null),
      location: new FormControl(null),
    });
  }

  onSearchSubmit() {
    const params = [];
    const searchFormValue = this.searchForm.value;
    if (searchFormValue.skill) {
      params.push({key: 'skills.label', value : searchFormValue.skill});
    }
    if (searchFormValue.experience) {
      params.push({key: 'seniorityLevel', value: searchFormValue.experience});
    }
    if (searchFormValue.location) {
      params.push({key: 'location', value: searchFormValue.location});
    }
    console.log(params);
    this.router.navigate(['/jobs'], { state: {data: params} });
  }

}
