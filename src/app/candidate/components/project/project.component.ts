import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/core/models/candidate/project.model';

@Component({
  selector: 'sp-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input() projects: Project[];
  
  constructor() { }

  ngOnInit() {
  }

}
