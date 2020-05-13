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
  isRecruiter: boolean;
  error_msg: string;
  candidateLoading: boolean = false;
  canApply: boolean;
  messageForm: FormGroup;
  isLoading: boolean = false;
  isApplied: boolean;

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

    // this.authenticationService.currentUser.subscribe(data => {
    //   console.log('applyyyy');
    //   if (data) {
    //     this.isApplied = data.appliedJobs.includes(this.jobId);
    //   } else {
    //     this.isApplied = false;
    //   }
    // })
    // Init Stepper
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: true,
      animation: true
    })
    if (this.isConnected) {
      this.goStep2();
    }

    this.messageForm = new FormGroup({
      'message': new FormControl(null, Validators.maxLength(1000))
    })
  }

  // Get boolean from signin-component: true if candidate sign in succefully 
  getAuthResult($event) {
    if ($event) {
      this.goStep2();
    }
  }

  // Get candidate information and resume
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

  // Get boolean from resume-summary-component: true if candidate can apply
  onCanApply($event) {
    this.canApply = $event;
  }

  // Go to prodile page
  goProfile() {
    this.dismissModal();
    this.router.navigateByUrl('/candidate/profile');
  }

  // Apply for a job
  onApply() {
    this.isLoading = true;
    const candID = this.authenticationService.currentUserValue.id;
    const message = this.messageForm.value.message;
    this.applyService.apply(this.jobId, candID, message).subscribe(res => {
      this.authenticationService.addAppliedJob(this.jobId);
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

  // Close the modal
  dismissModal(res?) {
    this._activeModal.close(res);
  }

  // Go to step two
  async goStep2() {
    await this.isRecruiterAndApplied();
    if (this.isRecruiter) {
      this.dismissModal();
    } else if (this.isApplied) {
      this.dismissModal(true);
    } else {
      this.getCandidate();
      this.stepper.next();
    }
  }

  isRecruiterAndApplied() {
    this.isLoading = true;
    return new Promise(resolve => {
      this.authenticationService.currentUser.subscribe(user => {
        this.isRecruiter = false;
        this.isApplied = false;
        if (user) {
          this.isRecruiter = this.userService.isRecruiter(user);
          if (!this.isRecruiter) {
            this.isApplied = user.appliedJobs.includes(this.jobId);
          }
          this.isLoading = false;
          resolve();
        }
      });
    })
    
  }
}
