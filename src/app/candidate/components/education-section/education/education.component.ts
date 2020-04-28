import { Component, OnInit, Input } from '@angular/core';
import { Education } from 'src/app/core/models/candidate/education.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EducationFormComponent } from '../education-form/education-form.component';

@Component({
  selector: 'sp-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input() educations: Education[];

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  openNewForm() {
    const modalRef = this.modalService.open(EducationFormComponent, { centered: true, size: 'lg' });
  }

  openEditForm(edu) {
    const modalRef = this.modalService.open(EducationFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.education = edu;
  }

}
