import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { EducationFormComponent } from './components/education-section/education-form/education-form.component';
import { ExperienceFormComponent } from './components/experience-section/experience-form/experience-form.component';
import { ProjectFormComponent } from './components/project-section/project-form/project-form.component';
import { LanguageFormComponent } from './components/language-section/language-form/language-form.component';
import { SkillFormComponent } from './components/skill-section/skill-form/skill-form.component';
import { IdentityFormComponent } from './components/identity-section/identity-form/identity-form.component';
import { DescriptionModule } from './components/description-section/description.module';
import { DocumentModule } from './components/document-section/document.module';
import { DescriptionFormComponent } from './components/description-section/description-form/description-form.component';
import { DocumentFormComponent } from './components/document-section/document-form/document-form.component';
import { EducationModule } from './components/education-section/education.module';
import { ExperienceModule } from './components/experience-section/experience.module';
import { IdentityModule } from './components/identity-section/identity.module';
import { LanguageModule } from './components/language-section/language.module';
import { ProjectModule } from './components/project-section/project.module';
import { SkillModule } from './components/skill-section/skill.module';
import { ApplicationsModule } from './components/applications/applications.module';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    SharedModule,
    DescriptionModule,
    DocumentModule,
    EducationModule,
    ExperienceModule,
    IdentityModule,
    LanguageModule,
    ProjectModule,
    SkillModule,
    ApplicationsModule
  ],
  entryComponents: [
    DescriptionFormComponent,
    EducationFormComponent,
    ExperienceFormComponent,
    ProjectFormComponent,
    LanguageFormComponent,
    SkillFormComponent,
    IdentityFormComponent,
    DocumentFormComponent
  ]
})
export class CandidateModule { }
