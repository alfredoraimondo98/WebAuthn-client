import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
  ]
})

export class CoreModule { }