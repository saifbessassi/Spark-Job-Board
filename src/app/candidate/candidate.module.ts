import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { SharedModule } from '../shared/shared.module';
import { IdentityComponent } from './components/identity/identity.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DescriptionComponent } from './components/description/description.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectComponent } from './components/project/project.component';
import { LanguageComponent } from './components/language/language.component';
import { SkillComponent } from './components/skill/skill.component';


@NgModule({
  declarations: [IdentityComponent, ProfileComponent, DescriptionComponent, EducationComponent, ExperienceComponent, ProjectComponent, LanguageComponent, SkillComponent],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    SharedModule
  ]
})
export class CandidateModule { }
