import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './features/about/about.component';
import { DownloadComponent } from './features/download/download.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { LoginComponent } from './features/login/login.component';
import { MyProfileComponent } from './features/my-profile/my-profile.component';
import { SigninAlgorandComponent } from './features/signin-algorand/signin-algorand.component';
import { SigninComponent } from './features/signin/signin.component';

const routes: Routes = [
  { path:'homepage', component: HomepageComponent},
  { path:'signin', component: SigninComponent },
  { path:'login', component: LoginComponent},
  { path:'signin-algorand', component: SigninAlgorandComponent},
  { path:'my-profile', component: MyProfileComponent},
  { path:'about', component: AboutComponent},
  { path:'download', component: DownloadComponent},
  { path:'**', redirectTo:'/signin'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
