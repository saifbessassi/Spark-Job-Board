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


@NgModule({
  declarations: [LandingComponent, CategoryBoxComponent, JobPostComponent, SearchBarComponent, CarouselComponent, JobsFiltersComponent, AllJobsComponent, FilterBoxComponent, PaginationComponent],
  imports: [
    JobRoutingModule,
    SharedModule
  ]
})
export class JobModule { }
