import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/core/models/job';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplyModalComponent } from '../apply-modal/apply-modal.component';
import { ApplicationService } from 'src/app/core/services/application/application.service';

@Component({
  selector: 'sp-job-card-detail',
  templateUrl: './job-card-detail.component.html',
  styleUrls: ['./job-card-detail.component.scss']
})
export class JobCardDetailComponent implements OnInit {

  @Input() job: Job;
  isApplied: boolean;
  
  constructor(
    private modalService: NgbModal,
    private applyService: ApplicationService
  ) { }

  ngOnInit() {
    this.isApplied = this.applyService.isApplied(this.job.id);
  }

  openModal() {
    const modalRef = this.modalService.open(ApplyModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.jobId = this.job.id;
    modalRef.result.then(res => {
      this.isApplied = res;
    })
  }

}
