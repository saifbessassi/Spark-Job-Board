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

@NgModule({
  declarations: [
    JobsTableComponent,
    RecruiterLayoutComponent,
    JobFormComponent,
    AddJobComponent
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
  ]
})
export class RecruiterModule { }
