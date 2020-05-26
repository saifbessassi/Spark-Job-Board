import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MailFormComponent } from './mail-form.component';
import { EditorModule } from '@tinymce/tinymce-angular';



@NgModule({
  declarations: [
    MailFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EditorModule
  ],
  exports: [
    MailFormComponent
  ]
})
export class MailFormModule { }
