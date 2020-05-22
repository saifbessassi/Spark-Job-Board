import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExperienceComponent } from './experience/experience.component';
import { ExperienceFormComponent } from './experience-form/experience-form.component';



@NgModule({
  declarations: [
    ExperienceComponent,
    ExperienceFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ExperienceComponent,
    ExperienceFormComponent
  ]
})
export class ExperienceModule { }
