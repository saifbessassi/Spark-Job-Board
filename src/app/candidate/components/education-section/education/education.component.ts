import { Component, OnInit, Input } from '@angular/core';
import { Education } from 'src/app/core/models/candidate/education.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EducationFormComponent } from '../education-form/education-form.component';
import { EducationService } from 'src/app/core/services/resume/education/education.service';

@Component({
  selector: 'sp-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input() educations: Education[];
  @Input() resumeID: number;
  @Input() isRecruiter = false;
  isLoading = false;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private educationService: EducationService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  openNewForm() {
    const modalRef = this.modalService.open(EducationFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.resumeID = this.resumeID;
    modalRef.result.then(res => {
      this.educations.push(res);
    });
  }

  openEditForm(edu, index) {
    const modalRef = this.modalService.open(EducationFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.education = edu;
    modalRef.componentInstance.index = index;
    modalRef.result.then(res => {
      this.educations[res.index] = res.edu;
    });
  }

  delete(id: number, index: number) {
    if (confirm('Do you really want to delete this education?')) {
      this.isLoading = true;
      this.educationService.delete(id).subscribe(res => {
        this.educations.splice(index, 1);
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }

}
