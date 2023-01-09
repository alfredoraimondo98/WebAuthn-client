import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigninAlgorandComponent } from './signin-algorand/signin-algorand.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AboutComponent } from './about/about.component';
import { DownloadComponent } from './download/download.component';
import { HomepageComponent } from './homepage/homepage.component';



@NgModule({
  declarations: [
    SigninComponent,
    LoginComponent,
    SigninAlgorandComponent,
    MyProfileComponent,
    AboutComponent,
    DownloadComponent,
    HomepageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    SigninComponent
  ]
})

export class FeaturesModule { }