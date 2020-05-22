import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DescriptionFormComponent } from '../description-form/description-form.component';

@Component({
  selector: 'sp-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  @Input() description: string;
  @Input() resumeID: number;
  @Input() isRecruiter: boolean = false;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  open() {
    const modalRef = this.modalService.open(DescriptionFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.description = this.description;
    modalRef.componentInstance.resumeID = this.resumeID;
    modalRef.result.then(res => {
      this.description = res;
    })
  }

}
