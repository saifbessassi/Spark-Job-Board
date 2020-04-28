import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/core/models/skill.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SkillService } from 'src/app/core/services/skill/skill.service';
import { CandidateSkill } from 'src/app/core/models/candidate/candidateSkill.model';

@Component({
  selector: 'sp-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent implements OnInit {

  skill: CandidateSkill;
  skillForm: FormGroup;
  allSkills: Skill[] = [];

  constructor(
    private _activeModal: NgbActiveModal,
    private skillService: SkillService
  ) { }

  ngOnInit() {
    this.skillService.getAllSkills().subscribe(res => {
      this.allSkills = res;
    })
    this.initForm();
  }

  initForm() {
    this.skillForm = new FormGroup({
      'id': new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      'level': new FormControl(
        null,
        [
          Validators.required
        ]
        ),
    });
    if(this.skill) {
      this.skillForm.setValue({
        'id': this.skill.skill.id,
        'level': this.skill.level,
      });
    }
  }

  save() {
    console.log(this.skillForm.value)
  }

  dismissModal() {
    this._activeModal.dismiss();
  }

}
