import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/core/models/candidate/experience.model';
import { NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExperienceService } from 'src/app/core/services/resume/experience/experience.service';
import { NgbDateService } from 'src/app/core/services/date/ngb-date.service';

@Component({
  selector: 'sp-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss']
})
export class ExperienceFormComponent implements OnInit {

  resumeID: number;
  index: number;
  experience: Experience;
  id: number;
  expForm: FormGroup;
  error_msg: string;
  maxStartDate: any;
  minStartDate: any;
  isLoading = false;

  constructor(
    private _activeModal: NgbActiveModal,
    private experienceService: ExperienceService,
    private ngbDateService: NgbDateService
  ) {
    this.maxStartDate = this.ngbDateService.dateToString(new Date());
    this.minStartDate = this.ngbDateService.dateToString(new Date('1960-01-01'));
   }

  ngOnInit() {
    this.initForm();
    this.onDateStartChange();
  }

  initForm() {
    this.expForm = new FormGroup({
      'company': new FormControl(
        null, 
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200)
        ]
      ),
      'title': new FormControl(
        null, 
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(150)
        ]
      ),
      'location': new FormControl(
        null, 
        [
          Validators.required,
          Validators.minLength(3),
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
        'dateStart': this.ngbDateService.dateToString(this.experience.dateStart),
        'dateEnd': this.ngbDateService.dateToString(this.experience.dateEnd)
      });
    }
  }

  save() {
    this.isLoading = true;
    if (this.experience) {
      this.id = this.experience.id;
    }
    this.experience = this.expForm.value;
    this.experience.dateStart = this.ngbDateService.stringToDate(this.expForm.value.dateStart);
    this.experience.dateEnd = this.ngbDateService.stringToDate(this.expForm.value.dateEnd);
    if (this.resumeID) {
      this.experienceService.add(this.experience, this.resumeID).subscribe(res => {
        this._activeModal.close(res);
        this.isLoading = false;
      }, err => {
        this.error_msg = 'An error occurred, please try again later.';
        this.isLoading = false;
      })
    } else {
      this.experience.id = this.id;
      this.experienceService.edit(this.experience).subscribe(res => {
        this._activeModal.close({exp: this.experience, index: this.index});
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

  onDateStartChange() {
    this.expForm.get('dateStart').valueChanges.subscribe(res =>{
        this.expForm.get('dateEnd').reset();
        if(this.expForm.get('dateStart').invalid) {
        this.expForm.get('dateEnd').disable();
      } else {
        this.expForm.get('dateEnd').enable();
      }
    })
  }

}
