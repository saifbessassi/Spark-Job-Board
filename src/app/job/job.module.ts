import { NgModule } from '@angular/core';

import { JobRoutingModule } from './job-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryBoxComponent } from './component/category-box/category-box.component';
import { JobPostComponent } from './component/job-post/job-post.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { JobsFiltersComponent } from './component/jobs-filters/jobs-filters.component';
import { AllJobsComponent } from './pages/all-jobs/all-jobs.component';
import { FilterBoxComponent } from './component/filter-box/filter-box.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { DetailJobComponent } from './pages/detail-job/detail-job.component';
import { JobCardDetailComponent } from './component/job-card-detail/job-card-detail.component';
import { ApplyModalComponent } from './component/apply-modal/apply-modal.component';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ResumeSummaryComponent } from './component/resume-summary/resume-summary.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CandidateProfileComponent } from '../recruiter/components/candidate-profile/candidate-profile.component';
import { CandidatesListModule } from '../recruiter/components/candidate-list/candidates-list.module';
import { CandidateProfileModule } from '../recruiter/components/candidate-profile/candidate-profile.module';
import { MailFormComponent } from '../recruiter/components/mail-form/mail-form.component';
import { MailFormModule } from '../recruiter/components/mail-form/mail-form.module';


@NgModule({
  declarations: [
    LandingComponent, 
    CategoryBoxComponent, 
    JobPostComponent, 
    SearchBarComponent, 
    CarouselComponent, 
    JobsFiltersComponent, 
    AllJobsComponent, 
    FilterBoxComponent, 
    PaginationComponent, 
    DetailJobComponent, 
    JobCardDetailComponent, 
    ApplyModalComponent,
    ResumeSummaryComponent,
  ],
  imports: [
    JobRoutingModule,
    SharedModule,
    AuthenticationModule,
    Ng2SmartTableModule,
    CandidatesListModule,
    CandidateProfileModule,
    MailFormModule
  ],
  entryComponents: [
    ApplyModalComponent,
    CandidateProfileComponent,
    MailFormComponent
  ]
})
export class JobModule { }
