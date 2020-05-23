import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateListComponent } from './candidate-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from 'src/app/shared/shared.module';
import { DecisionButtonsComponent } from './decision-buttons/decision-buttons.component';



@NgModule({
  declarations: [
    CandidateListComponent,
    DecisionButtonsComponent
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    SharedModule
  ],
  exports: [
    CandidateListComponent
  ],
  entryComponents: [
    DecisionButtonsComponent
  ]
})
export class CandidatesListModule { }
