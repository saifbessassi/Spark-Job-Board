import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/core/models/job';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplyModalComponent } from '../apply-modal/apply-modal.component';

@Component({
  selector: 'sp-job-card-detail',
  templateUrl: './job-card-detail.component.html',
  styleUrls: ['./job-card-detail.component.scss']
})
export class JobCardDetailComponent implements OnInit {

  @Input() job: Job;
  
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  openModal() {
    const modalRef = this.modalService.open(ApplyModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.job = this.job;
  }

}
