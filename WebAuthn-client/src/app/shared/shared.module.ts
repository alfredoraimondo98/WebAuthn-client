import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupCheckCredentialsComponent } from './popup-check-credentials/popup-check-credentials.component';
import { PopupUpdatedCredentialsComponent } from './popup-updated-credentials/popup-updated-credentials.component';
import { PopupUploadDataComponent } from './popup-upload-data/popup-upload-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupAssetCreatedComponent } from './popup-asset-created/popup-asset-created.component';
import { RouterModule } from '@angular/router';
import { PopupUploadDocComponent } from './popup-upload-doc/popup-upload-doc.component';
import { PopupUploadImagesComponent } from './popup-upload-images/popup-upload-images.component';



@NgModule({
  declarations: [
    PopupCheckCredentialsComponent,
    PopupUpdatedCredentialsComponent,
    PopupUploadDataComponent,
    PopupAssetCreatedComponent,
    PopupUploadDocComponent,
    PopupUploadImagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    PopupCheckCredentialsComponent,
    PopupUpdatedCredentialsComponent,
    PopupUploadDataComponent,
    PopupAssetCreatedComponent,
    PopupUploadDocComponent,
    PopupUploadImagesComponent
  ]
})

export class SharedModule { }