import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { EnsureOnlyCandidateGuard } from '../core/guards/ensure-only-candidate.guard';


const routes: Routes = [
  {
    path: 'profile',
    canActivate: [EnsureOnlyCandidateGuard],
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
