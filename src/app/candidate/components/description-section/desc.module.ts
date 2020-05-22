import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './description/description.component';
import { DescriptionFormComponent } from './description-form/description-form.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    DescriptionComponent,
    DescriptionFormComponent
  ],
  exports: [
    DescriptionComponent,
    DescriptionFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DescModule { }
