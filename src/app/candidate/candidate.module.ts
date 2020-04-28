import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { SharedModule } from '../shared/shared.module';
import { IdentityComponent } from './components/identity/identity.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DescriptionComponent } from './components/description-section/description/description.component';
import { EducationComponent } from './components/education-section/education/education.component';
import { ExperienceComponent } from './components/experience-section/experience/experience.component';
import { ProjectComponent } from './components/project-section/project/project.component';
import { LanguageComponent } from './components/language-section/language/language.component';
import { SkillComponent } from './components/skill/skill.component';
import { DescriptionFormComponent } from './components/description-section/description-form/description-form.component';
import { EducationFormComponent } from './components/education-section/education-form/education-form.component';
import { ExperienceFormComponent } from './components/experience-section/experience-form/experience-form.component';
import { ProjectFormComponent } from './components/project-section/project-form/project-form.component';
import { LanguageFormComponent } from './components/language-section/language-form/language-form.component';


@NgModule({
  declarations: [
    IdentityComponent, 
    ProfileComponent, 
    DescriptionComponent, 
    EducationComponent, 
    ExperienceComponent, 
    ProjectComponent, 
    LanguageComponent, 
    SkillComponent, 
    DescriptionFormComponent, 
    EducationFormComponent,
    ExperienceFormComponent,
    ProjectFormComponent,
    LanguageFormComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    SharedModule
  ],
  entryComponents: [
    DescriptionFormComponent,
    EducationFormComponent,
    ExperienceFormComponent,
    ProjectFormComponent,
    LanguageFormComponent
  ]
})
export class CandidateModule { }
