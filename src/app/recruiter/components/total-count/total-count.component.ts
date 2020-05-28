import { Component, OnInit } from '@angular/core';
import { RecruiterService } from 'src/app/core/services/recruiter/recruiter.service';

@Component({
  selector: 'sp-total-count',
  templateUrl: './total-count.component.html',
  styleUrls: ['./total-count.component.scss']
})
export class TotalCountComponent implements OnInit {

  total: any = [];
  errorMsg: string;

  constructor(
    private recruiterService: RecruiterService
  ) { }

  ngOnInit() {
    this.errorMsg = null;
    this.recruiterService.getTotalCount().subscribe( res => {
      this.total = res;
    }, err => {
      this.errorMsg = 'Unknown error! Please try again later.';
    });
  }

}
