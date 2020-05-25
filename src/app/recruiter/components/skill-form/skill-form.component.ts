import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SkillService } from 'src/app/core/services/skill/skill.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from 'src/app/core/models/skill.model';
import { ExistValidator } from 'src/app/core/services/skill/existSkill.validator';

@Component({
  selector: 'sp-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent implements OnInit {

  allSkills: Skill[];
  skillForm: FormGroup;
  isLoading: boolean;
  error_msg: string;

  constructor(
    private skillService: SkillService,
    private _activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private existValidator: ExistValidator
  ) { }

  ngOnInit() {
    console.log(this.allSkills)
    this.skillForm = this.formBuilder.group({
      'label': new FormControl(null, [Validators.required])
    }, {
      validator: this.existValidator.exist('label', this.allSkills),
  });
  }

  onSubmit() {
    this.isLoading = true;
    this.skillService.addSkill(this.skillForm.value).subscribe(
      (res: Skill) => {
        this._activeModal.close({id: res.id, label: res.label});
        this.isLoading = false;
      },
      err => {
        this.error_msg = 'An error occurred, please try again later.';
        this.isLoading = false;
      }
    )
  }

}
