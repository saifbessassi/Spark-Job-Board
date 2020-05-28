import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Education } from 'src/app/core/models/candidate/education.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDateService } from 'src/app/core/services/date/ngb-date.service';
import { EducationService } from 'src/app/core/services/resume/education/education.service';

@Component({
  selector: 'sp-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit {

  resumeID: number;
  index: number;
  id: number;
  education: Education;
  eduForm: FormGroup;
  errorMsg: string;
  maxStartDate: any;
  minStartDate: any;
  isLoading = false;

  constructor(
    private activeModal: NgbActiveModal,
    private ngbDateService: NgbDateService,
    private educationService: EducationService
  ) {
    this.maxStartDate = this.ngbDateService.dateToString(new Date());
    this.minStartDate = this.ngbDateService.dateToString(new Date('1960-01-01'));
  }

  ngOnInit() {
    this.initForm();
    this.onDateStartChange();
  }

  initForm() {
    this.eduForm = new FormGroup({
      school: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(200)
        ]
      ),
      degree: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(200)
        ]
      ),
      dateStart: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      dateEnd: new FormControl(
        null,
        [
          Validators.required
        ]
        ),
    });
    if (this.education) {
      this.eduForm.setValue({
        school: this.education.school,
        degree: this.education.degree,
        dateStart: this.ngbDateService.dateToString(this.education.dateStart),
        dateEnd: this.ngbDateService.dateToString(this.education.dateEnd)
      });
    }
  }

  save() {
    this.isLoading = true;
    if (this.education) {
      this.id = this.education.id;
    }
    this.education = this.eduForm.value;
    this.education.dateStart = this.ngbDateService.stringToDate(this.eduForm.value.dateStart);
    this.education.dateEnd = this.ngbDateService.stringToDate(this.eduForm.value.dateEnd);
    if (this.resumeID) {
      this.educationService.add(this.education, this.resumeID).subscribe(res => {
        this.activeModal.close(res);
        this.isLoading = false;
      }, err => {
        this.errorMsg = 'An error occurred, please try again later.';
        this.isLoading = false;
      });
    } else {
      this.education.id = this.id;
      this.educationService.edit(this.education).subscribe(res => {
        this.activeModal.close({edu: this.education, index: this.index});
        this.isLoading = false;
      }, err => {
        this.errorMsg = 'An error occurred, please try again later.';
        this.isLoading = false;
      });
    }
  }

  dismissModal() {
    this.activeModal.dismiss();
  }

  onDateStartChange() {
    this.eduForm.get('dateStart').valueChanges.subscribe(res => {
      this.eduForm.get('dateEnd').reset();
      if (this.eduForm.get('dateStart').invalid) {
        this.eduForm.get('dateEnd').disable();
      } else {
        this.eduForm.get('dateEnd').enable();
      }
    });
  }

}
