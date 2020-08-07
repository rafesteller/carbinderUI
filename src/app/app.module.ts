import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatAutocompleteModule,MatSortModule } from '@angular/material'
import { CommonModule } from '@angular/common';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserMangComponent } from './user-mang/user-mang.component';
import { AuthInterceptor } from './login/auth.interceptor'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CarListComponent } from './cars/car-list/car-list.component';
import { AddcarComponent } from './cars/addcar/addcar.component';
import { CarDetailsComponent } from './cars/car-details/car-details.component';
import { DocServiceComponent } from './cars/car-details/doc-service/doc-service.component'; 
import { PastDateDirective } from './cars/car-details/past-date-validator.directive';
import { FutureDateValidatorDirective } from './cars/car-details/future-date-validator.directive';
import { EmialDirective } from './cars/car-details/emial.directive';
import { ForbiddenNameDirective } from './cars/car-details/forbidden-name.directive';
import { ScheduleServiceComponent } from './cars/car-details/schedule-service/schedule-service.component'
import { ModalModule } from './shared/modal';
import { CompleteServiceComponent } from './cars/car-details/complete-service/complete-service.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserMangComponent,
    CarListComponent,
    AddcarComponent,
    CarDetailsComponent,
    DocServiceComponent,
    PastDateDirective,
    FutureDateValidatorDirective,
    EmialDirective,
    ForbiddenNameDirective,
    ScheduleServiceComponent,
    CompleteServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSortModule,
    MatSelectModule,
    CommonModule,
    ModalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
