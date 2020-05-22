import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document/document.component';
import { DocumentFormComponent } from './document-form/document-form.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    DocumentComponent,
    DocumentFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DocumentComponent,
    DocumentFormComponent
  ]
})
export class DocumentModule { }
