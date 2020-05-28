import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DescriptionService } from 'src/app/core/services/resume/description/description.service';

@Component({
  selector: 'sp-description-form',
  templateUrl: './description-form.component.html',
  styleUrls: ['./description-form.component.scss']
})
export class DescriptionFormComponent implements OnInit {

  description: string;
  resumeID: number;
  descForm: FormGroup;
  errorMsg: string;
  isLoading = false;

  constructor(
    private activeModal: NgbActiveModal,
    private descService: DescriptionService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.descForm = new FormGroup({
      description: new FormControl(
        this.description,
        [
          Validators.minLength(30),
          Validators.maxLength(255)
        ]
      )
    });
  }

  save() {
    this.isLoading = true;
    this.description = this.descForm.value.description;
    this.descService.edit(this.description, this.resumeID).subscribe(res => {
      this.activeModal.close(this.description);
      this.isLoading = false;
    }, err => {
      this.errorMsg = 'An error occurred, please try again later.';
      this.isLoading = false;
    });
  }

  dismissModal() {
    this.activeModal.dismiss();
  }
}
