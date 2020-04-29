import { Component, OnInit } from '@angular/core';
import { CandidateIdentity } from 'src/app/core/models/candidate/candidate-identity.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sp-identity-form',
  templateUrl: './identity-form.component.html',
  styleUrls: ['./identity-form.component.scss']
})
export class IdentityFormComponent implements OnInit {

  identity: CandidateIdentity;
  identityForm: FormGroup;

  constructor(
    private _activeModal: NgbActiveModal
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
          Validators.required,
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
        this.identity.seniorityLevel, 
        [
          Validators.required
        ]
      ),
    });
  }

  save() {
    console.log(this.identityForm.value)
  }

  dismissModal() {
    this._activeModal.dismiss();
  }

}
