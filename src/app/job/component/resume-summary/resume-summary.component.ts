import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Candidate } from 'src/app/core/models/candidate/candidate.model';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sp-resume-summary',
  templateUrl: './resume-summary.component.html',
  styleUrls: ['./resume-summary.component.scss']
})
export class ResumeSummaryComponent implements OnInit {

  @Input() candidate: Candidate;
  @Output() outputCanApply = new EventEmitter<boolean>();

  canApply: boolean;
  nbEducation: number;
  nbExperience: number;
  nbProject: number;
  nbSkill: number;
  nbLanguage: number;
  percentage: number = 0;
  
  constructor(
    private router: Router,
    private _activeModal: NgbActiveModal
  ) { }

  goProfile() {
    this.dismissModal();
    this.router.navigateByUrl('/candidate/profile');
  }

  ngOnInit() {
    if (this.candidate) {
      this.nbEducation = this.candidate.resume.educations.length;
      this.nbExperience = this.candidate.resume.experiences.length;
      this.nbProject = this.candidate.resume.projects.length;
      this.nbSkill = this.candidate.resume.skillsCandidate.length;
      this.nbLanguage = this.candidate.resume.languagesCandidate.length;

      if (
        this.candidate.phone &&
        this.candidate.resume.seniorityLevel &&
        this.candidate.resume.skillsCandidate &&
        (
          this.candidate.resume.cv ||
          (
            this.candidate.resume.experiences &&
            this.candidate.resume.educations
          )
        )
      ) {
        this.canApply = true;
      } else {
        this.canApply = false;
      }

      this.outputCanApply.emit(this.canApply);
      
      if (this.nbEducation !== 0) {
        this.percentage += 1;
      }
      if (this.nbExperience !== 0) {
        this.percentage += 1;
      }
      if (this.nbProject !== 0) {
        this.percentage += 1;
      }
      if (this.nbSkill !== 0) {
        this.percentage += 1;
      }
      if (this.nbLanguage !== 0) {
        this.percentage += 1;
      }
      if (this.candidate.address) {
        this.percentage += 1;
      }
      if (this.candidate.phone) {
        this.percentage += 1;
      }
      if (this.candidate.picture) {
        this.percentage += 1;
      }
      if (this.candidate.resume.seniorityLevel) {
        this.percentage += 1;
      }
      if (this.candidate.resume.cv) {
        this.percentage += 1;
      }
      if (this.candidate.resume.description) {
        this.percentage += 1;
      }
      this.percentage = Math.round(this.percentage / 11 *100);
    }
  }

  dismissModal() {
    this._activeModal.close();
  }

}
