import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RecruiterService } from 'src/app/core/services/recruiter/recruiter.service';

@Component({
  selector: 'sp-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.scss']
})
export class MailFormComponent implements OnInit {

  email: string;
  mailForm: FormGroup;
  isLoading: boolean;
  error_msg: string;

  constructor(
    private _activeModal: NgbActiveModal,
    private recruiterService: RecruiterService
  ) { }

  ngOnInit() {
    this.mailForm = new FormGroup({
      'subject': new FormControl(null, Validators.required),
      'message': new FormControl(null, Validators.required),
      'email': new FormControl(this.email)
    })
  }

  onSubmit() {
    this.isLoading = true;
    this.error_msg = null;
    this.recruiterService.sendMail(this.mailForm.value).subscribe(
      res => {
        this._activeModal.dismiss();
        this.isLoading = false;
      },
      err => {
        this.error_msg = 'An error occurred, please try again later.';
        this.isLoading = false;
      }
    )
  }

}
