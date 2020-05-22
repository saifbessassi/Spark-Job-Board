import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectComponent } from './project/project.component';
import { ProjectFormComponent } from './project-form/project-form.component';



@NgModule({
  declarations: [
    ProjectComponent,
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ProjectComponent,
    ProjectFormComponent
  ]
})
export class ProjectModule { }
