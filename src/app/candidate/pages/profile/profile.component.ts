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

  photo: string;
  isLoading: boolean = false;
  error_msg: boolean;
  candidate: Candidate;
  resume: Resume;
  identity: CandidateIdentity;
  experiences: Experience[];
  educations: Education[];

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    const isConnected = this.userService.isConnected();
    if (isConnected) {
      const payload = this.tokenService.getPayload();
      this.photo = payload['photo'];
    }
    this.isLoading = true;
    this.error_msg = false;
    this.candidateService.getCandidateProfile().subscribe( (res: Candidate) => {
        this.candidate = res;
        this.resume = this.candidate.resume;
        this.experiences = this.resume.experiences.sort((b,a)=> a.dateStart.toString().localeCompare(b.dateStart.toString()));
        this.educations = this.resume.educations.sort((b,a)=> a.dateStart.toString().localeCompare(b.dateStart.toString()));
        this.identity = new CandidateIdentity(
          this.candidate.fullname,
          this.candidate.email,
          this.photo,
          this.candidate.address,
          this.candidate.phone,
          this.resume.seniorityLevel
        )
        this.isLoading = false;
    }, err => {
        this.error_msg = true;
        this.isLoading = false;
    })
  }

}
