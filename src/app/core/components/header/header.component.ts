import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { SidebarService } from 'src/app/core/components/sidebar/sidebar.service';

@Component({
  selector: 'sp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isRecruiter: boolean;
  fullname: string;
  email: string;
  photo: string;
  nameTwoLetter: string;
  currentUser: any;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private sidebarService: SidebarService
  ) 
  {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;

      if (this.currentUser) {
        this.fullname = this.currentUser.fullname;
        this.email = this.currentUser.email;
        this.photo = null;
        if (this.currentUser.picture) {
          if (this.currentUser.picture.includes('http')) {
            this.photo = this.currentUser.picture;
          } else {
            this.photo = 'http://localhost:8000' + this.currentUser.picture;
          }
        }
        if (this.fullname && this.fullname.indexOf(' ') > -1) {
          this.nameTwoLetter = this.fullname[0] + this.fullname.split(' ')[1][0];
        } else {
          this.nameTwoLetter = this.fullname[0] + this.fullname[1];
        }
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

}
