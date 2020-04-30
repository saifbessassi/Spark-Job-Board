import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/candidate/project.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/core/services/resume/project/project.service';

@Component({
  selector: 'sp-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  resumeID: number;
  index: number;
  id: number;
  project: Project;
  projectForm: FormGroup;
  error_msg: string;
  isLoading = false;

  constructor(
    private _activeModal: NgbActiveModal,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.projectForm = new FormGroup({
      'title': new FormControl(
        null, 
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(150)
        ]
      ),
      'description': new FormControl(
        null, 
        [
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(255)
        ]
      )
    });
    if(this.project) {
      this.projectForm.setValue({
        'title': this.project.title,
        'description': this.project.description
      });
    }
  }

  save() {
    this.isLoading = true;
    if (this.project) {
      this.id = this.project.id;
    }
    this.project = this.projectForm.value;
    if (this.resumeID) {
      this.projectService.add(this.project, this.resumeID).subscribe(res => {
        this._activeModal.close(res);
        this.isLoading = false;
      }, err => {
        this.error_msg = 'An error occurred, please try again later.';
        this.isLoading = false;
      })
    } else {
      this.project.id = this.id;
      this.projectService.edit(this.project).subscribe(res => {
        this._activeModal.close({project: this.project, index: this.index});
        this.isLoading = false;
      }, err => {
        this.error_msg = 'An error occurred, please try again later.';
        this.isLoading = false;
      })
    }
  }

  dismissModal() {
    this._activeModal.dismiss();
  }

}
