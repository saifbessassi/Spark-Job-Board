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
import { CandidateProfileComponent } from './components/candidate-profile/candidate-profile.component';
import { CandidatesListModule } from './components/candidate-list/candidates-list.module';
import { CandidateProfileModule } from './components/candidate-profile/candidate-profile.module';
import { SkillFormComponent } from './components/skill-form/skill-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { MailFormComponent } from './components/mail-form/mail-form.component';
import { MailFormModule } from './components/mail-form/mail-form.module';
import { ChartsModule } from 'ng2-charts';
import { JobPerStatusChartComponent } from './components/charts/job-per-status-chart/job-per-status-chart.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { JobPerCategoryChartComponent } from './components/charts/job-per-category-chart/job-per-category-chart.component';
import { RecentJobsComponent } from './components/recent-jobs/recent-jobs.component';

@NgModule({
  declarations: [
    JobsTableComponent,
    RecruiterLayoutComponent,
    JobFormComponent,
    AddJobComponent,
    EditJobComponent,
    AllCandidatesComponent,
    SkillFormComponent,
    CategoryFormComponent,
    JobPerStatusChartComponent,
    DashboardComponent,
    JobPerCategoryChartComponent,
    RecentJobsComponent,
  ],
  imports: [
    CommonModule,
    RecruiterRoutingModule,
    Ng2SmartTableModule,
    SharedModule,
    EditorModule,
    CandidatesListModule,
    CandidateProfileModule,
    MailFormModule,
    ChartsModule
  ],
  providers: [
    DatePipe
  ],
  entryComponents: [
    EditJobComponent,
    CandidateProfileComponent,
    SkillFormComponent,
    CategoryFormComponent,
    MailFormComponent
  ]
})
export class RecruiterModule { }
