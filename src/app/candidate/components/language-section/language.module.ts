import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LanguageComponent } from './language/language.component';
import { LanguageFormComponent } from './language-form/language-form.component';



@NgModule({
  declarations: [
    LanguageComponent,
    LanguageFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LanguageComponent,
    LanguageFormComponent
  ]
})
export class LanguageModule { }
