import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SigninAlgorandComponent } from './features/signin-algorand/signin-algorand.component';
import { SigninComponent } from './features/signin/signin.component';

const routes: Routes = [
  { path:'signin', component: SigninComponent },
  { path:'login', component: LoginComponent},
  { path:'signin-algorand', component: SigninAlgorandComponent},
  { path:'**', redirectTo:'/signin'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
