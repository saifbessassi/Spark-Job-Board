import { NgModule, ApplicationModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications/applications.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ApplicationsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    ApplicationsComponent
  ]
})
export class ApplicationsModule { }
