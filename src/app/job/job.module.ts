import { NgModule } from '@angular/core';

import { JobRoutingModule } from './job-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryBoxComponent } from './component/category-box/category-box.component';
import { JobPostComponent } from './component/job-post/job-post.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';


@NgModule({
  declarations: [LandingComponent, CategoryBoxComponent, JobPostComponent, SearchBarComponent],
  imports: [
    JobRoutingModule,
    SharedModule
  ]
})
export class JobModule { }
