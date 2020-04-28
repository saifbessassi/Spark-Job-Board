import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/candidate/project.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sp-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  project: Project;
  projectForm: FormGroup;

  constructor(
    private _activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.initForm();
    // this.eduForm.setValue(this.education);
  }

  initForm() {
    this.projectForm = new FormGroup({
      'title': new FormControl(
        null, 
        [
          Validators.required,
          Validators.maxLength(255)
        ]
      ),
      'description': new FormControl(
        null, 
        [
          Validators.required
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
    console.log(this.projectForm.value)
  }

  dismissModal() {
    this._activeModal.dismiss();
  }

}
