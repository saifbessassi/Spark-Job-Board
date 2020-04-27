import { Component, OnInit, Input } from '@angular/core';
import { Education } from 'src/app/core/models/candidate/education.model';

@Component({
  selector: 'sp-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input() educations: Education[];
  constructor() { }

  ngOnInit() {
  }

}
