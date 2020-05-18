import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/core/models/job';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sp-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {

  job: Job;

  constructor(
    private _activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  dismissModal() {
    this._activeModal.dismiss();
  }

}
