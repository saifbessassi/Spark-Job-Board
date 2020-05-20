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
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { AllCandidatesComponent } from './pages/all-candidates/all-candidates.component';

@NgModule({
  declarations: [
    JobsTableComponent,
    RecruiterLayoutComponent,
    JobFormComponent,
    AddJobComponent,
    EditJobComponent,
    CandidateListComponent,
    AllCandidatesComponent
  ],
  imports: [
    CommonModule,
    RecruiterRoutingModule,
    Ng2SmartTableModule,
    SharedModule,
    EditorModule
  ],
  providers: [
    DatePipe
  ],
  entryComponents: [
    EditJobComponent
  ]
})
export class RecruiterModule { }
