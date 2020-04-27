import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { SharedModule } from '../shared/shared.module';
import { IdentityComponent } from './components/identity/identity.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DescriptionComponent } from './components/description/description.component';
import { EducationComponent } from './components/education/education.component';


@NgModule({
  declarations: [IdentityComponent, ProfileComponent, DescriptionComponent, EducationComponent],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    SharedModule
  ]
})
export class CandidateModule { }
