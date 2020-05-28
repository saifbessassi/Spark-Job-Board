import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/core/models/job';
import { JobService } from 'src/app/core/services/job/job.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user.service';
import { CandidateProfileComponent } from 'src/app/recruiter/components/candidate-profile/candidate-profile.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sp-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.scss']
})
export class DetailJobComponent implements OnInit {

  active = 1;
  title = 'Job details';
  text = '';
  isLoading = false;
  job: Job;
  jobId: number;
  getJobError: string;
  isRecruiter = false;

  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    this.jobId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(data => {
      const user: User = data;
      if (this.userService.isRecruiter(user)) {
        this.isRecruiter = true;
      } else {
        this.isRecruiter = false;
      }
    });
    this.isLoading = true;
    this.jobService.getOneJob(this.jobId).subscribe(res => {
      this.job = res;
      this.isLoading = false;
    }, err => {
      this.getJobError = err.statusText;
      if (this.getJobError === 'Not Found') {
        this.getJobError = 'No job found with id ' + this.jobId + ' !';
      }
      this.isLoading = false;
    });
  }

  onAction(event) {
    const modalRef = this.modalService.open(CandidateProfileComponent, { centered: true, size: 'xl' });
    modalRef.componentInstance.candidateID = event.data.id;
  }

  newDeadline($event) {
    this.job.deadline = $event;
  }

}
