import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruiterLayoutComponent } from './layout/recruiter-layout/recruiter-layout.component';
import { JobsTableComponent } from './pages/jobs-table/jobs-table.component';
import { AddJobComponent } from './pages/add-job/add-job.component';
import { AllCandidatesComponent } from './pages/all-candidates/all-candidates.component';


const routes: Routes = [
  {
    path: '',
    component: RecruiterLayoutComponent,
    children: [
      {
        path: 'jobs-list',
        component: JobsTableComponent
      },
      {
        path: 'add-job',
        component: AddJobComponent
      },
      {
        path: 'all-candidates',
        component: AllCandidatesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
