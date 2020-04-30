import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/core/models/candidate/project.model';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/core/services/resume/project/project.service';

@Component({
  selector: 'sp-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input() projects: Project[];
  @Input() resumeID: number;
  isLoading = false;
  
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private projectService: ProjectService
    ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  openNewForm() {
    const modalRef = this.modalService.open(ProjectFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.resumeID = this.resumeID;
    modalRef.result.then(res => {
      this.projects.push(res);
    })
  }

  openEditForm(project, index) {
    const modalRef = this.modalService.open(ProjectFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.project = project;
    modalRef.componentInstance.index = index;
    modalRef.result.then(res => {
      this.projects[res.index] = res.project;
    })
  }

  delete(id: number, index: number) {
    if(confirm('Do you really want to delete this project?')) {
      this.isLoading = true;
      this.projectService.delete(id).subscribe(res => {
        this.projects.splice(index, 1);
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      })
    } else {
      this.isLoading = false;
    }
  }

}
