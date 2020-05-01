import { Component, OnInit } from '@angular/core';
import { CandidateIdentity } from 'src/app/core/models/candidate/candidate-identity.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidateService } from 'src/app/core/services/candidate/candidate.service';

@Component({
  selector: 'sp-identity-form',
  templateUrl: './identity-form.component.html',
  styleUrls: ['./identity-form.component.scss']
})
export class IdentityFormComponent implements OnInit {

  identity: CandidateIdentity;
  identityForm: FormGroup;
  error_msg: string;
  isLoading = false;

  constructor(
    private _activeModal: NgbActiveModal,
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.identityForm = new FormGroup({
      'fullname': new FormControl(
        this.identity.fullname, 
        [
          Validators.required,
          Validators.maxLength(255)
        ]
      ),
      'address': new FormControl(
        this.identity.address, 
        [
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ),
      'phone': new FormControl(
        this.identity.phone, 
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(8)
        ]
      ),
      'seniorityLevel': new FormControl(
        this.identity.resume.seniorityLevel, 
        [
          Validators.required
        ]
      ),
    });
  }

  save() {
    this.isLoading = true;
    this.identity.address = this.identityForm.value.address;
    this.identity.fullname = this.identityForm.value.fullname;
    this.identity.phone = this.identityForm.value.phone;
    this.identity.resume.seniorityLevel = this.identityForm.value.seniorityLevel;
    this.candidateService.edit(this.identity).subscribe(res => {
      this._activeModal.close(this.identity);
      this.isLoading = false;
    }, err => {
      this.error_msg = 'An error occurred, please try again later.';
      this.isLoading = false;
    })
  }

  dismissModal() {
    this._activeModal.dismiss();
  }

}
