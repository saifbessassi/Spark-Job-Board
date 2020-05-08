import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { ApplicationService } from '../../services/application/application.service';

@Component({
  selector: 'sp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  fullname: string;
  email: string;
  photo: string;
  isConnected: boolean;
  nameTwoLetter: string;
  appliedJobs: any;
  
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService,
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.isConnected = this.userService.isConnected();
    if (this.isConnected) {
      const payload = this.tokenService.getPayload();
      this.email = payload['username'];
      this.fullname = payload['fullname'];
      this.photo = payload['photo'];
      if (this.fullname.indexOf(' ') > -1) {
        this.nameTwoLetter = this.fullname[0] + this.fullname.split(' ')[1][0];
      } else {
        this.nameTwoLetter = this.fullname[0] + this.fullname[1];
      }
      this.applicationService.getCandidateApplicationsID(payload['id']).subscribe(res => {
        sessionStorage.setItem('applied_jobs', JSON.stringify(res['jobs']));
      })
    }
  }

  logout() {
    this.tokenService.clear();
    sessionStorage.clear();
    this.isConnected = false;
  }

}
