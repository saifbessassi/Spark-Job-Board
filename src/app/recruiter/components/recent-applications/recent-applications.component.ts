import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/core/models/candidate/application.model';
import { ApplicationService } from 'src/app/core/services/application/application.service';

@Component({
  selector: 'sp-recent-applications',
  templateUrl: './recent-applications.component.html',
  styleUrls: ['./recent-applications.component.scss']
})
export class RecentApplicationsComponent implements OnInit {

  msg_error: string;
  recentApplications: Application[] = [];

  constructor(
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.applicationService.getRecentApplications().subscribe( res => {
      this.recentApplications = res['hydra:member'];
      console.log(this.recentApplications)
    }, err => {
      this.msg_error = 'Unknown error! Please try again later.';
    })
  }

}
