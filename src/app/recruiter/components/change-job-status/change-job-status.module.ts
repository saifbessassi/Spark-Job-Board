import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeJobStatusComponent } from './change-job-status.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ChangeJobStatusComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ChangeJobStatusComponent
  ]
})
export class ChangeJobStatusModule { }
