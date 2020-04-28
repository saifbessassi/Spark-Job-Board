import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/core/models/candidate/experience.model';
import { NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sp-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss']
})
export class ExperienceFormComponent implements OnInit {

  experience: Experience;
  dateStart: NgbDateStruct;
  dateEnd: NgbDateStruct;
  expForm: FormGroup;

  constructor(
    private _activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.expForm = new FormGroup({
      'company': new FormControl(
        null, 
        [
          Validators.required,
          Validators.maxLength(255)
        ]
      ),
      'title': new FormControl(
        null, 
        [
          Validators.required,
          Validators.maxLength(255)
        ]
      ),
      'location': new FormControl(
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
    if(this.experience) {
      this.expForm.setValue({
        'location': this.experience.location,
        'company': this.experience.company,
        'title': this.experience.title,
        'description': this.experience.description,
        'dateStart': this.convertDate(this.experience.dateStart),
        'dateEnd': this.convertDate(this.experience.dateEnd)
      });
    }
  }

  save() {
    console.log(this.expForm.value)
  }

  dismissModal() {
    this._activeModal.dismiss();
  }

  convertDate(date) {
    const d = new Date(date);
    return {
      'day': d.getDate(),
      'month': d.getMonth() + 1,
      'year': d.getFullYear()
    }
  }

}
