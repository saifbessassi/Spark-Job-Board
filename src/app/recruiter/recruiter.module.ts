import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { JobsTableComponent } from './pages/jobs-table/jobs-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RecruiterLayoutComponent } from './layout/recruiter-layout/recruiter-layout.component';
import { SharedModule } from '../shared/shared.module';
import { JobFormComponent } from './components/job-form/job-form.component';
import { AddJobComponent } from './pages/add-job/add-job.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { AllCandidatesComponent } from './pages/all-candidates/all-candidates.component';
import { DescriptionModule } from '../candidate/components/description-section/description.module';
import { CandidateProfileComponent } from './components/candidate-profile/candidate-profile.component';
import { DocumentModule } from '../candidate/components/document-section/document.module';
import { EducationModule } from '../candidate/components/education-section/education.module';
import { ExperienceModule } from '../candidate/components/experience-section/experience.module';
import { IdentityModule } from '../candidate/components/identity-section/identity.module';
import { LanguageModule } from '../candidate/components/language-section/language.module';
import { ProjectModule } from '../candidate/components/project-section/project.module';
import { SkillModule } from '../candidate/components/skill-section/skill.module';
import { CandidatesListModule } from './components/candidate-list/candidates-list.module';
import { CandidateProfileModule } from './components/candidate-profile/candidate-profile.module';

@NgModule({
  declarations: [
    JobsTableComponent,
    RecruiterLayoutComponent,
    JobFormComponent,
    AddJobComponent,
    EditJobComponent,
    AllCandidatesComponent
  ],
  imports: [
    CommonModule,
    RecruiterRoutingModule,
    Ng2SmartTableModule,
    SharedModule,
    EditorModule,
    CandidatesListModule,
    CandidateProfileModule
  ],
  providers: [
    DatePipe
  ],
  entryComponents: [
    EditJobComponent,
    CandidateProfileComponent
  ]
})
export class RecruiterModule { }
