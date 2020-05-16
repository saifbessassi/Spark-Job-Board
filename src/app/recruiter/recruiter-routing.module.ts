import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruiterLayoutComponent } from './layout/recruiter-layout/recruiter-layout.component';
import { JobsTableComponent } from './pages/jobs-table/jobs-table.component';


const routes: Routes = [
  {
    path: '',
    component: RecruiterLayoutComponent,
    children: [
      {
        path: 'jobs-list',
        component: JobsTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
