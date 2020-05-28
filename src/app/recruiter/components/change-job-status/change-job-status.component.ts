import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { JobService } from 'src/app/core/services/job/job.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateService } from 'src/app/core/services/date/ngb-date.service';

@Component({
  selector: 'sp-change-job-status',
  templateUrl: './change-job-status.component.html',
  styleUrls: ['./change-job-status.component.scss']
})
export class ChangeJobStatusComponent implements OnInit {

  @Input() jobID: number;
  @Input() status: string;
  @Output() newDeadline = new EventEmitter<Date>();
  isLoading: boolean;
  errorMsg: string;
  minStartDate: any;
  deadline: any;

  constructor(
    private jobService: JobService,
    private modalService: NgbModal,
    private ngbDateService: NgbDateService
  ) {
    this.minStartDate = this.ngbDateService.dateToString(new Date().setDate(new Date().getDate() + 1));
  }

  ngOnInit() {
  }

  onChangeStatus(status: string, content?) {
    this.isLoading = true;
    this.errorMsg = null;
    if (content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        const date = this.ngbDateService.stringToDate(this.deadline);
        date.setDate(date.getDate() + 1);
        if (date.toString() !== 'Invalid Date') {
          this.edit(status, date);
          this.newDeadline.emit(this.ngbDateService.stringToDate(this.deadline));
        } else {
          this.errorMsg = 'Invalid Date';
          this.isLoading = false;
        }
      }, (raison) => {
        this.isLoading = false;
      });
    } else {
      this.edit(status);
    }
  }

  edit(status, deadline?) {
    this.jobService.editJobStatus(this.jobID, status, deadline).subscribe(
      res => {
        this.status = status;
        this.isLoading = false;
      },
      err => {
        this.errorMsg = 'An error occurred, please try again later.';
        this.isLoading = false;
      }
    );
  }

  isValidDeadline() {
    const date = this.ngbDateService.stringToDate(this.deadline);
    return date >= new Date();
  }
}
