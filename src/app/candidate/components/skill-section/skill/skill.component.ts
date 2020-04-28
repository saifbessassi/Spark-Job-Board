import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/core/models/skill.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SkillFormComponent } from '../skill-form/skill-form.component';

@Component({
  selector: 'sp-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  @Input() skills: Skill[];
  
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  openNewForm() {
    const modalRef = this.modalService.open(SkillFormComponent, { centered: true, size: 'lg' });
  }

  openEditForm(skill) {
    const modalRef = this.modalService.open(SkillFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.skill = skill;
  }

}
