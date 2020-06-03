import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/core/models/candidate/application.model';
import { ApplicationService } from 'src/app/core/services/application/application.service';

@Component({
  selector: 'sp-recent-applications',
  templateUrl: './recent-applications.component.html',
  styleUrls: ['./recent-applications.component.scss']
})
export class RecentApplicationsComponent implements OnInit {

  errorMsg: string;
  recentApplications: Application[] = [];

  constructor(
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.applicationService.getRecentApplications().subscribe( res => {
      this.recentApplications = res['hydra:member'];
    }, err => {
      this.errorMsg = 'Unknown error! Please try again later.';
    });
  }

}
