import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SkillComponent } from './skill/skill.component';
import { SkillFormComponent } from './skill-form/skill-form.component';



@NgModule({
  declarations: [
    SkillComponent,
    SkillFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SkillComponent,
    SkillFormComponent
  ]
})
export class SkillModule { }
