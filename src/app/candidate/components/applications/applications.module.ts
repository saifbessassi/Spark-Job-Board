import { NgModule, ApplicationModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications/applications.component';



@NgModule({
  declarations: [
    ApplicationsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ApplicationsComponent
  ]
})
export class ApplicationsModule { }
