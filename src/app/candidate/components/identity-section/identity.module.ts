import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { IdentityComponent } from './identity/identity.component';
import { IdentityFormComponent } from './identity-form/identity-form.component';



@NgModule({
  declarations: [
    IdentityComponent,
    IdentityFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    IdentityComponent,
    IdentityFormComponent
  ]
})
export class IdentityModule { }
