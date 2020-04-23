import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipesModule } from 'angular-truncate-pipes';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SpinnerComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TruncatePipesModule,
    SpinnerComponent,
    ErrorMsgComponent,
    NgbModalModule,
    NgbModule
  ],
})
export class SharedModule { }
