import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/core/models/candidate/project.model';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sp-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input() projects: Project[];
  
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  openNewForm() {
    const modalRef = this.modalService.open(ProjectFormComponent, { centered: true, size: 'lg' });
  }

  openEditForm(project) {
    const modalRef = this.modalService.open(ProjectFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.project = project;
  }

}
