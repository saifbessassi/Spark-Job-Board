import { Component, OnInit, Input } from '@angular/core';
import { Experience } from 'src/app/core/models/candidate/experience.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExperienceFormComponent } from '../experience-form/experience-form.component';
import { ExperienceService } from 'src/app/core/services/resume/experience/experience.service';

@Component({
  selector: 'sp-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  @Input() experiences: Experience[];
  @Input() resumeID: number;
  @Input() isRecruiter: boolean = false;
  isLoading = false;
  
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private experienceService: ExperienceService
    ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  openNewForm() {
    const modalRef = this.modalService.open(ExperienceFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.resumeID = this.resumeID;
    modalRef.result.then(res => {
      this.experiences.push(res);
    })
  }

  openEditForm(exp, index) {
    const modalRef = this.modalService.open(ExperienceFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.experience = exp;
    modalRef.componentInstance.index = index;
    modalRef.result.then(res => {
      this.experiences[res.index] = res.exp;
    })
  }

  delete(id: number, index: number) {
    if(confirm('Do you really want to delete this experience?')) {
      this.isLoading = true;
      this.experienceService.delete(id).subscribe(res => {
        this.experiences.splice(index, 1);
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      })
    } else {
      this.isLoading = false;
    }
  }

}
