import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'sp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isClose = false;

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this.sidebarService.outputChange.subscribe(isClose => {
      this.isClose = isClose;
    });
  }

}
