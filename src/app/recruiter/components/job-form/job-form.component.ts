import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDateService } from 'src/app/core/services/date/ngb-date.service';
import { SkillService } from 'src/app/core/services/skill/skill.service';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Skill } from 'src/app/core/models/skill.model';
import { Category } from 'src/app/core/models/job/category.model';
import { JobService } from 'src/app/core/services/job/job.service';
import { Router } from '@angular/router';
import { Job } from 'src/app/core/models/job';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SkillFormComponent } from '../skill-form/skill-form.component';

@Component({
  selector: 'sp-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {

  @Input() job: Job;
  @Input() _activeModal: NgbActiveModal;

  jobForm: FormGroup;
  maxStartDate: any;
  minStartDate: any;
  allSkills: Skill[];
  allCategories: Category[];
  isLoading: boolean;
  error_msg: string;
  action: string = 'add';

  constructor(
    private ngbDateService: NgbDateService,
    private skillService: SkillService,
    private categoryService: CategoryService,
    private jobService: JobService,
    private router: Router,
    private modalService: NgbModal
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
    if (this.job) {
      this.action = 'edit';
      let jobSkillsIDs: number[] = [];
      let cat = null;
      this.job.skills.forEach(skill => {
        jobSkillsIDs.push(skill.id);
      })
      if (this.job.category) {
        cat = this.job.category.id
      }
      this.jobForm.setValue({
        'title': this.job.title,
        'employmentType' : this.job.employmentType,
        'seniorityLevel' : this.job.seniorityLevel,
        'location' : this.job.location,
        'skills' : jobSkillsIDs,
        'category' : cat,
        'description' : this.job.description,
        'deadline' : this.ngbDateService.dateToString(this.job.deadline),
      })
    }
  }

  onSave() {
    this.isLoading = true;
    let newJob = this.jobForm.value;
    newJob.deadline = this.ngbDateService.stringToDate(newJob.deadline);
    if (this.action === 'add') {
      this.addNewJob(newJob);
    } else if (this.action === 'edit') {
      this.editJob(newJob, this.job.id);
    }
  }

  addNewJob(newJob) {
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

  editJob(job, id) {
    this.jobService.editJob(job, id).subscribe(
      res => {
        this._activeModal.close(res);
        this.isLoading = false;
      },
      err => {
        this.error_msg = 'An error occurred, please try again later.';
        this.isLoading = false;
      }
    )
  }

  addSkill() {
    const modalRef = this.modalService.open(SkillFormComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.allSkills = this.allSkills;
    modalRef.result.then((newSkill) => {
      this.allSkills.push(newSkill);
    }, rejected => {})
  }
}
