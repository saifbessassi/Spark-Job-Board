import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'sp-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  isRecruiter: boolean;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.isRecruiter = false;
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.isRecruiter = userService.isRecruiter(user);
      } else {
        this.isRecruiter = false;
      }
    })
  }

  ngOnInit() {
  }

}
