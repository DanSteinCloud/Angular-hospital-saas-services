import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PublicComponent } from './public.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { ErrorInterceptor } from '../interceptors/error.interceptor';

@NgModule({
  declarations: [
     LoginComponent,
     RegisterComponent,
     PublicComponent,
     SpinnerOverlayComponent,
    SpinnerOverlayComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,multi:true}
  // ]
})
export class PublicModule { }
