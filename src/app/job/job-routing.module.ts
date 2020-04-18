import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AllJobsComponent } from './pages/all-jobs/all-jobs.component';
import { DetailJobComponent } from './pages/detail-job/detail-job.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: LandingComponent
      },
      {
        path: 'jobs',
        component: AllJobsComponent
      },
      {
        path: 'jobs/:id',
        component: DetailJobComponent
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
