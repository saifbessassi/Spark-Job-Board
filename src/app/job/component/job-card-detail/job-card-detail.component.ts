import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/core/models/job';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplyModalComponent } from '../apply-modal/apply-modal.component';
import { ApplicationService } from 'src/app/core/services/application/application.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { User } from 'src/app/core/models/user.service';

@Component({
  selector: 'sp-job-card-detail',
  templateUrl: './job-card-detail.component.html',
  styleUrls: ['./job-card-detail.component.scss']
})
export class JobCardDetailComponent implements OnInit {

  @Input() job: Job;
  isApplied = false;
  isRecruiter: boolean;

  constructor(
    private modalService: NgbModal,
    private applyService: ApplicationService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe(user => {
      this.isRecruiter = false;
      if (user) {
        this.isRecruiter = userService.isRecruiter(user);
      }
    });
  }

  ngOnInit() {
    // this.isApplied = this.applyService.isApplied(this.job.id);
    this.authService.currentUser.subscribe(data => {
      const user: User = data;
      if (user && this.userService.isCandidate(user)) {
        this.isApplied = user.appliedJobs.includes(this.job.id);
      } else {
        this.isApplied = false;
      }
    });
  }

  openModal() {
    const modalRef = this.modalService.open(ApplyModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.jobId = this.job.id;
    modalRef.result.then(res => {
      this.isApplied = res;
    });
  }

}
