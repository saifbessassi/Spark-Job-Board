import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/core/models/skill.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SkillService } from 'src/app/core/services/skill/skill.service';
import { SkillCandidate } from 'src/app/core/models/candidate/skill-candidate.model';
import { SkillCandidateService } from 'src/app/core/services/resume/skill-candidate/skill-candidate.service';

@Component({
  selector: 'sp-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent implements OnInit {

  skillCandidate: SkillCandidate;
  skillForm: FormGroup;
  allSkills: Skill[] = [];
  resumeID: number;
  index: number;
  id: number;
  errorMsg: string;
  isLoading = false;

  constructor(
    private activeModal: NgbActiveModal,
    private skillService: SkillService,
    private skillCandidateService: SkillCandidateService
  ) { }

  ngOnInit() {
    this.skillService.getAllSkills().subscribe(res => {
      this.allSkills = res;
    });
    this.initForm();
  }

  initForm() {
    this.skillForm = new FormGroup({
      id: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      proficiency: new FormControl(
        null,
        [
          Validators.required
        ]
        ),
    });
    if (this.skillCandidate) {
      this.skillForm.setValue({
        id: this.skillCandidate.skill['id'],
        proficiency: this.skillCandidate.proficiency,
      });
    }
  }

  save() {
    this.isLoading = true;
    if (this.skillCandidate) {
      this.id = this.skillCandidate.id;
    }

    if (this.resumeID) {
      this.skillCandidate = new SkillCandidate;
      this.skillCandidate.proficiency = this.skillForm.value.proficiency;
      this.skillCandidate.skill = this.skillForm.value.id;
      this.skillCandidateService.add(this.skillCandidate, this.resumeID).subscribe(res => {
        this.activeModal.close(res);
        this.isLoading = false;
      }, err => {
        this.errorMsg = 'An error occurred, please try again later.';
        this.isLoading = false;
      });
    } else {
      this.skillCandidate.proficiency = this.skillForm.value.proficiency;
      this.skillCandidate.skill = this.skillForm.value.id;
      this.skillCandidate.id = this.id;
      this.skillCandidateService.edit(this.skillCandidate).subscribe(res => {
        this.activeModal.close({skill: res, index: this.index});
        this.isLoading = false;
      }, err => {
        this.errorMsg = 'An error occurred, please try again later.';
        this.isLoading = false;
      });
    }
  }

  dismissModal() {
    this.activeModal.dismiss();
  }

}
