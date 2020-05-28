import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { CandidateService } from 'src/app/core/services/candidate/candidate.service';
import { Candidate } from 'src/app/core/models/candidate/candidate.model';
import { Resume } from 'src/app/core/models/candidate/resume.model';
import { CandidateIdentity } from 'src/app/core/models/candidate/candidate-identity.model';
import { Experience } from 'src/app/core/models/candidate/experience.model';
import { Education } from 'src/app/core/models/candidate/education.model';

@Component({
  selector: 'sp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLoading = false;
  errorMsg: boolean;
  candidate: Candidate;
  resume: Resume;
  identity: CandidateIdentity;
  experiences: Experience[];
  educations: Education[];
  pictureURL: string;

  constructor(
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.errorMsg = false;
    this.candidateService.getCandidateProfile().subscribe( (res: Candidate) => {
        this.candidate = res;
        this.resume = this.candidate.resume;
        this.experiences = this.resume.experiences.sort((b, a) => a.dateStart.toString().localeCompare(b.dateStart.toString()));
        this.educations = this.resume.educations.sort((b, a) => a.dateStart.toString().localeCompare(b.dateStart.toString()));
        this.identity = new CandidateIdentity(
          this.candidate.fullname,
          this.candidate.email,
          this.candidate.picture,
          this.candidate.address,
          this.candidate.phone,
          {
            id: '/api/resumes/' + this.resume.id,
            seniorityLevel: this.resume.seniorityLevel
          }
        );
        this.isLoading = false;
    }, err => {
        this.errorMsg = true;
        this.isLoading = false;
    });
  }

}
