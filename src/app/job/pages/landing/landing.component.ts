import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Job } from 'src/app/core/models/job';
import { JobService } from 'src/app/core/services/job/job.service';

@Component({
  selector: 'sp-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  title = "Find Jobs Now more Easy Way";
  text = "Spark-it is a digital services company. We offer digital development and consulting solutions for all market players: Start-up, SMEs and large groups.";
  
  isLoading = false;
  isLoadingCategory = false
  recentJobs: Job[] = [];
  searchForm: FormGroup;
  nbJobsPerCategory: any;
  msg_error: string;

  constructor(
    private jobService: JobService,
    private router: Router
  ) { }

  ngOnInit() {
    // Get recent jobs
    this.isLoading = true;
    this.jobService.getRecentJobs().subscribe( res => {
      this.recentJobs = res;
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      this.msg_error = 'Unknown error! Please try again later.';
    })

    // Get number of jobs per category
    this.isLoadingCategory = true;
    this.jobService.getNbJobsPerCategory().subscribe( res => {
      this.nbJobsPerCategory = res;
      this.isLoadingCategory = false;
    }, err => {
      this.isLoadingCategory = false;
    })

    // Initialise search form
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchForm = new FormGroup({
      'title': new FormControl(null),
      'category': new FormControl(null),
      'location': new FormControl(null),
    });
  }

  onSearchSubmit() {
    let params = [];
    const searchFormValue = this.searchForm.value;
    if (searchFormValue.title) {
      params.push({key: 'title', value : searchFormValue.title})
    }
    if (searchFormValue.category) {
      params.push({key: 'category', value: searchFormValue.category})
    }
    if (searchFormValue.location) {
      params.push({key: 'location', value: searchFormValue.location})
    }
    
    this.router.navigate(['/cand/jobs'], { state: {data: params} });
  }

  

}
