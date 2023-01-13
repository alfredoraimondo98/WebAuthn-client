import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupCheckCredentialsComponent } from './popup-check-credentials/popup-check-credentials.component';



@NgModule({
  declarations: [
    PopupCheckCredentialsComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PopupCheckCredentialsComponent
  ]
})

export class SharedModule { }