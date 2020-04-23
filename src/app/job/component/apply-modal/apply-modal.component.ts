import { Component, OnInit, Input } from '@angular/core';
import Stepper from 'bs-stepper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sp-apply-modal',
  templateUrl: './apply-modal.component.html',
  styleUrls: ['./apply-modal.component.scss']
})
export class ApplyModalComponent implements OnInit {

  @Input() jobId: number;

  private stepper: Stepper;

  next() {
    this.stepper.next();
  }

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }

}
