import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Education } from 'src/app/core/models/candidate/education.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sp-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit {

  education: Education;
  dateStart: NgbDateStruct;
  dateEnd: NgbDateStruct;
  eduForm: FormGroup;

  constructor(
    private _activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.initForm();
    // this.eduForm.setValue(this.education);
  }

  initForm() {
    this.eduForm = new FormGroup({
      'school': new FormControl(
        null, 
        [
          Validators.required,
          Validators.maxLength(255)
        ]
      ),
      'degree': new FormControl(
        null, 
        [
          Validators.required,
          Validators.maxLength(255)
        ]
      ),
      'dateStart': new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      'dateEnd': new FormControl(
        null,
        [
          Validators.required
        ]
        ),
    });
    if(this.education) {
      this.eduForm.setValue({
        'school': this.education.school,
        'degree': this.education.degree,
        'dateStart': this.convertDate(this.education.dateStart),
        'dateEnd': this.convertDate(this.education.dateEnd)
      });
    }
  }

  save() {
    console.log(this.eduForm.value)
  }

  dismissModal() {
    this._activeModal.dismiss();
  }

  convertDate(date) {
    const d = new Date(date);
    return {
      'day': d.getDate(),
      'month': d.getMonth(),
      'year': d.getFullYear()
    }
  }

}
