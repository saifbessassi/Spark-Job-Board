import { Component, OnInit, Input } from '@angular/core';
import { Experience } from 'src/app/core/models/candidate/experience.model';

@Component({
  selector: 'sp-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  @Input() experiences: Experience[];
  
  constructor() { }

  ngOnInit() {
  }

}
