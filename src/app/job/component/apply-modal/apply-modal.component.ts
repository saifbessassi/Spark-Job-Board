import { Component, OnInit, Input } from '@angular/core';
import Stepper from 'bs-stepper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services/user/user.service';
import { SigninComponent } from 'src/app/authentication/components/signin/signin.component';


@Component({
  selector: 'sp-apply-modal',
  templateUrl: './apply-modal.component.html',
  styleUrls: ['./apply-modal.component.scss']
})
export class ApplyModalComponent implements OnInit {

  @Input() jobId: number;

  private stepper: Stepper;
  isConnected: boolean;

  next() {
    this.stepper.next();
  }

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private modalService: NgbModal
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
    }
  }

  goSignin() {
    console.log();
  }

  getAuthResult($event) {
    if ($event) {
      this.stepper.next();
    }
  }

}
