import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupCheckCredentialsComponent } from './popup-check-credentials/popup-check-credentials.component';
import { PopupUpdatedCredentialsComponent } from './popup-updated-credentials/popup-updated-credentials.component';



@NgModule({
  declarations: [
    PopupCheckCredentialsComponent,
    PopupUpdatedCredentialsComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PopupCheckCredentialsComponent,
    PopupUpdatedCredentialsComponent
  ]
})

export class SharedModule { }