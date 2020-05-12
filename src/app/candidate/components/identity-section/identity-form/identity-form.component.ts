import { Component, OnInit } from '@angular/core';
import { CandidateIdentity } from 'src/app/core/models/candidate/candidate-identity.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { CandidateService } from 'src/app/core/services/candidate/candidate.service';
import { HttpEventType } from '@angular/common/http';
import { Picture } from 'src/app/core/models/candidate/picture.model';
import { User } from 'src/app/core/models/user.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';

@Component({
  selector: 'sp-identity-form',
  templateUrl: './identity-form.component.html',
  styleUrls: ['./identity-form.component.scss']
})
export class IdentityFormComponent implements OnInit {

  identity: CandidateIdentity;
  identityForm: FormGroup;
  selectedPicture: File = null;
  error_msg: string;
  isLoading = false;
  isUploading = false;
  previewPicture: any;
  uploadProgress: number;

  constructor(
    private _activeModal: NgbActiveModal,
    private candidateService: CandidateService,
    private authService:AuthenticationService,
    config: NgbProgressbarConfig
  ) 
  {
    config.max = 100;
    config.striped = true;
    config.animated = true;
    config.type = 'primary';
    config.height = '20px';
  }

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
    this.error_msg = null;
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

  savePicture() {
    this.error_msg = null;
    this.isUploading = true;
    this.uploadProgress = 0;
    this.candidateService.addPicture(this.selectedPicture).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(events.loaded / events.total * 100);
      } else if (events.type === HttpEventType.Response) {
        this.identity.picture = <Picture>events.body;
        this.previewPicture = null;
        this.authService.updatePicture(this.identity.picture.url);
        this.isUploading = false;
      }
    }, err => {
      this.error_msg = 'An error occurred, please try again later.';
      this.previewPicture = null;
      this.selectedPicture = null;
      this.isUploading = false;
    })
  }

  deletePicture() {
    this.isUploading = true;
    this.error_msg = null;
    if(confirm('Do you really want to delete your picture?')) {
      this.candidateService.deletePicture(this.identity.picture.id).subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(events.loaded / events.total * 100);
        } else if (events.type === HttpEventType.Response) {
          this.identity.picture = null;
          this.previewPicture = null;
          this.authService.updatePicture();
          this.isUploading = false;
        }
      }, err => {
        this.error_msg = 'An error occurred, please try again later.';
        this.isUploading = false;
      })
    }
  }

  preview($event) {
    this.selectedPicture = $event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedPicture); 
    reader.onload = (_event) => { 
      this.previewPicture = reader.result;
    }
  }

}
