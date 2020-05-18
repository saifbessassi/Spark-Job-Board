import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDateService } from 'src/app/core/services/date/ngb-date.service';
import { SkillService } from 'src/app/core/services/skill/skill.service';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Skill } from 'src/app/core/models/skill.model';
import { Category } from 'src/app/core/models/job/category.model';
import { JobService } from 'src/app/core/services/job/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sp-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {

  jobForm: FormGroup;
  maxStartDate: any;
  minStartDate: any;
  allSkills: Skill[];
  allCategories: Category[];
  isLoading: boolean;
  error_msg: string;

  constructor(
    private ngbDateService: NgbDateService,
    private skillService: SkillService,
    private categoryService: CategoryService,
    private jobService: JobService,
    private router: Router
  ) 
  {
    const today = new Date();
    this.minStartDate = this.ngbDateService.dateToString(new Date(today.setDate(today.getDate()+1)));
    this.maxStartDate = this.ngbDateService.dateToString(new Date(today.setFullYear(today.getFullYear()+1)));
  }

  ngOnInit() {
    this.skillService.getAllSkills().subscribe(res => {
      this.allSkills = res;
    })
    this.categoryService.getAllSkills().subscribe(res => {
      this.allCategories = res;
    })
    this.initForm();
  }

  initForm() {
    this.jobForm = new FormGroup({
      'title' : new FormControl(null, [Validators.required, Validators.minLength(7), Validators.maxLength(255)]),
      'employmentType' : new FormControl(null, Validators.required),
      'seniorityLevel' : new FormControl(null, Validators.required),
      'location' : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      'skills' : new FormControl(null, Validators.required),
      'category' : new FormControl(null, Validators.required),
      'description' : new FormControl(null, [Validators.required]),
      'deadline' : new FormControl(null, [Validators.required]),
    });
  }

  onSave() {
    this.isLoading = true;
    let newJob = this.jobForm.value;
    newJob.deadline = this.ngbDateService.stringToDate(newJob.deadline);
    
    this.jobService.addNewJob(newJob).subscribe(
      res => {
        this.router.navigate(['recruiter/jobs-list']);
        this.isLoading = false;
      },
      err => {
        this.error_msg = 'An error occurred, please try again later.';
        this.isLoading = false;
      }
    )
  }
}
