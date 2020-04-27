import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/core/models/skill.model';

@Component({
  selector: 'sp-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  @Input() skills: Skill[];
  
  constructor() { }

  ngOnInit() {
  }

}
