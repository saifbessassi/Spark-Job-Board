import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education/education.component';
import { EducationFormComponent } from './education-form/education-form.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    EducationComponent,
    EducationFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    EducationComponent,
    EducationFormComponent
  ]
})
export class EducationModule { }
