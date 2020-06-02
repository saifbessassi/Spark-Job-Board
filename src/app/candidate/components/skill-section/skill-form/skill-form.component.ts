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

  skillRequest = new SkillCandidate();
  skillResponse: SkillCandidate;
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
    if (this.skillResponse) {
      this.skillForm.setValue({
        id: this.skillResponse.skill['id'],
        proficiency: this.skillResponse.proficiency,
      });
    }
  }

  save() {
    this.isLoading = true;
    if (this.skillResponse) {
      this.id = this.skillResponse.id;
    }

    this.skillRequest.proficiency = this.skillForm.value.proficiency;
    this.skillRequest.skill = this.skillForm.value.id;
    if (this.resumeID) {
      this.skillCandidateService.add(this.skillRequest, this.resumeID).subscribe(res => {
        this.activeModal.close(res);
        this.isLoading = false;
      }, err => {
        this.errorMsg = 'An error occurred, please try again later.';
        this.isLoading = false;
      });
    } else {
      this.skillRequest.id = this.id;
      // this.skillResponse.proficiency = this.skillForm.value.proficiency;
      // this.skillResponse.skill = this.skillForm.value.proficiency;
      this.skillCandidateService.edit(this.skillRequest).subscribe(res => {
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
