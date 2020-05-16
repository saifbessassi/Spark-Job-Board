import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { JobsTableComponent } from './pages/jobs-table/jobs-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RecruiterLayoutComponent } from './layout/recruiter-layout/recruiter-layout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    JobsTableComponent,
    RecruiterLayoutComponent
  ],
  imports: [
    CommonModule,
    RecruiterRoutingModule,
    Ng2SmartTableModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ]
})
export class RecruiterModule { }
