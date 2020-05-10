import { Component, OnInit, Input } from '@angular/core';
import Stepper from 'bs-stepper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services/user/user.service';
import { ApplicationService } from 'src/app/core/services/application/application.service';
import { Candidate } from 'src/app/core/models/candidate/candidate.model';
import { CandidateService } from 'src/app/core/services/candidate/candidate.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';


@Component({
  selector: 'sp-apply-modal',
  templateUrl: './apply-modal.component.html',
  styleUrls: ['./apply-modal.component.scss']
})
export class ApplyModalComponent implements OnInit {

  @Input() jobId: number;

  stepper: Stepper;
  candidate: Candidate;
  isConnected: boolean;
  error_msg: string;
  candidateLoading: boolean = false;
  canApply: boolean;
  messageForm: FormGroup;
  isLoading: boolean = false;

  next() {
    this.stepper.next();
  }

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private _activeModal: NgbActiveModal,
    private candidateService: CandidateService,
    private router: Router,
    private applyService: ApplicationService
    ) { }

  ngOnInit() {
    this.isConnected = this.userService.isConnected();
    // Init Stepper
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: true,
      animation: true
    })
    if (this.isConnected) {
      this.stepper.to(2);
      this.getCandidate();
      if (this.applyService.isApplied(this.jobId)) {
        this.dismissModal(true);
      }
    }

    this.messageForm = new FormGroup({
      'message': new FormControl(null, Validators.maxLength(1000))
    })
  }

  getAuthResult($event) {
    if ($event) {
      this.getCandidate();
      this.stepper.next();
      if (this.applyService.isApplied(this.jobId)) {
        this.dismissModal(true);
      }
    }
  }

  getCandidate() {
    this.candidateLoading = true;
    this.candidateService.getCandidateProfile().subscribe((res: Candidate) => {
      this.candidate = res;
      this.candidateLoading = false;
    }, err => {
      this.error_msg = 'An error occurred, please try again later.';
      this.candidateLoading = false;
    })
  }

  onCanApply($event) {
    this.canApply = $event;
  }

  goProfile() {
    this.dismissModal();
    this.router.navigateByUrl('/candidate/profile');
  }

  onApply() {
    this.isLoading = true;
    const candID = this.authenticationService.currentUserValue.id;
    const message = this.messageForm.value.message;
    this.applyService.apply(this.jobId, candID, message).subscribe(res => {
      this.applyService.addJobToAppliedJobsInSession(this.jobId);
      this.isLoading = false;
      this.dismissModal(true);
    }, err => {
      if (err.error['hydra:description']) {
        this.error_msg = err.error['hydra:description'];
      } else {
        this.error_msg = 'An error occurred, please try again later.';
      }
      this.isLoading = false;
    })
  }

  dismissModal(res?) {
    this._activeModal.close(res);
  }
}
