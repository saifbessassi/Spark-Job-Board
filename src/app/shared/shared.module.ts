import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipesModule } from 'angular-truncate-pipes';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TruncatePipesModule,
    SpinnerComponent,
    ErrorMsgComponent
  ],
})
export class SharedModule { }
