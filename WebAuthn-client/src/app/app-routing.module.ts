import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './features/signin/signin.component';

const routes: Routes = [
  { path:'signin', component: SigninComponent },
  { path:'**', redirectTo:'/signin'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
