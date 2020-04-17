import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AllJobsComponent } from './pages/all-jobs/all-jobs.component';


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
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
