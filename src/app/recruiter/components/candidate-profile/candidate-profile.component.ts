import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/core/services/candidate/candidate.service';
import { Candidate } from 'src/app/core/models/candidate/candidate.model';
import { Resume } from 'src/app/core/models/candidate/resume.model';
import { CandidateIdentity } from 'src/app/core/models/candidate/candidate-identity.model';
import { Experience } from 'src/app/core/models/candidate/experience.model';
import { Education } from 'src/app/core/models/candidate/education.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sp-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent implements OnInit {

  candidateID: number;
  errorMsg: boolean;
  candidate: Candidate;
  resume: Resume;
  identity = new CandidateIdentity;
  experiences: Experience[] = [];
  educations: Education[] = [];
  pictureURL: string;
  isLoading: boolean;
  isDecicionMaked = false;

  constructor(
    private activeModal: NgbActiveModal,
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.candidateService.getCandidateProfileByID(this.candidateID).subscribe( (res: Candidate) => {
      this.candidate = res;
      console.log(this.candidate);
      this.resume = this.candidate.resume;
      let seniority = null;
      if (this.resume) {
        this.experiences = this.resume.experiences.sort((b, a) => a.dateStart.toString().localeCompare(b.dateStart.toString()));
        this.educations = this.resume.educations.sort((b, a) => a.dateStart.toString().localeCompare(b.dateStart.toString()));
        seniority = {
          id: '/api/resumes/' + this.resume.id,
          seniorityLevel: this.resume.seniorityLevel
        };
      }
      this.identity.fullname = this.candidate.fullname;
      this.identity.email = this.candidate.email
      this.identity.picture = this.candidate.picture;
      this.identity.address = this.candidate.address;
      this.identity.phone = this.candidate.phone;
      this.identity.resume = seniority
      this.isLoading = false;
    }, err => {
        this.errorMsg = true;
        this.isLoading = false;
    });
  }

  outputIsDecisionMaked($event) {
    this.isDecicionMaked = $event;
  }
}
