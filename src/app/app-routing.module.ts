import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './login/auth.guard'
import { UserMangComponent } from './user-mang/user-mang.component'
import { CarListComponent } from './cars/car-list/car-list.component'
import { CarDetailsComponent } from './cars/car-details/car-details.component'


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full',canActivate:[AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'users', component: UserMangComponent, canActivate: [AuthGuard] },
  { path: 'car-details/:id', component: CarDetailsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
