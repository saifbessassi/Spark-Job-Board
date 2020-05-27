import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipesModule } from 'angular-truncate-pipes';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AnimatedDigitComponent } from './components/animated-digit/animated-digit.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ErrorMsgComponent,
    AnimatedDigitComponent
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
    NgbModule,
    AnimatedDigitComponent
  ],
})
export class SharedModule { }
