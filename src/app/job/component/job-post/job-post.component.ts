import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/core/models/job';
import { ApplicationService } from 'src/app/core/services/application/application.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user.service';

@Component({
  selector: 'sp-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent implements OnInit {

  @Input() job: Job;
  isApplied: boolean;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(data => {
      const user: User = data;
      if (user && this.userService.isCandidate(user)) {
        this.isApplied = user.appliedJobs.includes(this.job.id);
      } else {
        this.isApplied = false;
      }
    });
  }

}
