import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CandidateProfileComponent } from './candidate-profile.component';
import { DescriptionModule } from 'src/app/candidate/components/description-section/description.module';
import { DocumentModule } from 'src/app/candidate/components/document-section/document.module';
import { EducationModule } from 'src/app/candidate/components/education-section/education.module';
import { ExperienceModule } from 'src/app/candidate/components/experience-section/experience.module';
import { IdentityModule } from 'src/app/candidate/components/identity-section/identity.module';
import { LanguageModule } from 'src/app/candidate/components/language-section/language.module';
import { ProjectModule } from 'src/app/candidate/components/project-section/project.module';
import { SkillModule } from 'src/app/candidate/components/skill-section/skill.module';
import { ApplicationsModule } from 'src/app/candidate/components/applications/applications.module';



@NgModule({
  declarations: [
    CandidateProfileComponent
  ],
  imports: [
    CommonModule,
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
  exports: [
    CandidateProfileComponent
  ]
})
export class CandidateProfileModule { }
