import { Component, OnInit, Input } from '@angular/core';
import { Experience } from 'src/app/core/models/candidate/experience.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExperienceFormComponent } from '../experience-form/experience-form.component';

@Component({
  selector: 'sp-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  @Input() experiences: Experience[];
  
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  openNewForm() {
    const modalRef = this.modalService.open(ExperienceFormComponent, { centered: true, size: 'lg' });
  }

  openEditForm(exp) {
    const modalRef = this.modalService.open(ExperienceFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.experience = exp;
  }

}
