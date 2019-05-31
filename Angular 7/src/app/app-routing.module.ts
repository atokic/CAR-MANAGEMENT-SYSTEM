import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { CarsAdsComponent } from './cars-ads/cars-ads.component';
import { MyCarComponent } from './cars/mycar.component';
import { ReportComponent } from './report/report.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'cars', component: MyCarComponent,canActivate:[AuthGuard],data :{permittedRoles:['Customer']}},
  {path: 'reports', component: ReportComponent,canActivate:[AuthGuard],data :{permittedRoles:['Admin']}},
    {path: 'cars-ads', component: CarsAdsComponent},
    { path: 'user-list', component: UserListComponent ,canActivate:[AuthGuard],data :{permittedRoles:['Admin']}},
  {path:'login',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {path:'forbidden',component:ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
