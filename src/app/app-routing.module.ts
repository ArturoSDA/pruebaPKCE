import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'callback', component: AuthComponent},
  {path:'**', pathMatch:'full', redirectTo:'home'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
