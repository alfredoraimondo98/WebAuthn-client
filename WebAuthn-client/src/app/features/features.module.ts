import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigninAlgorandComponent } from './signin-algorand/signin-algorand.component';



@NgModule({
  declarations: [
    SigninComponent,
    LoginComponent,
    SigninAlgorandComponent
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