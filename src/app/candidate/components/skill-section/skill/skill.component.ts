import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SkillFormComponent } from '../skill-form/skill-form.component';
import { SkillCandidate } from 'src/app/core/models/candidate/skill-candidate.model';
import { SkillCandidateService } from 'src/app/core/services/resume/skill-candidate/skill-candidate.service';

@Component({
  selector: 'sp-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  @Input() skills: SkillCandidate[];
  @Input() resumeID: number;
  @Input() isRecruiter = false;
  isLoading = false;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private skillCandidateService: SkillCandidateService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  openNewForm() {
    const modalRef = this.modalService.open(SkillFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.resumeID = this.resumeID;
    modalRef.result.then(res => {
      this.skills.push(res);
    });
  }

  openEditForm(skill, index) {
    const modalRef = this.modalService.open(SkillFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.skillCandidate = skill;
    modalRef.componentInstance.index = index;
    modalRef.result.then(res => {
      this.skills[res.index] = res.skill;
    });
  }

  delete(id: number, index: number) {
    if (confirm('Do you really want to delete this skill?')) {
      this.isLoading = true;
      this.skillCandidateService.delete(id).subscribe(res => {
        this.skills.splice(index, 1);
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }

}
