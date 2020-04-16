import { NgModule } from '@angular/core';

import { JobRoutingModule } from './job-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LandingComponent],
  imports: [
    JobRoutingModule,
    SharedModule
  ]
})
export class JobModule { }
