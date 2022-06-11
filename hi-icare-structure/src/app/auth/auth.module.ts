import { NgModule, OnInit } from "@angular/core";
import { CommonModule, KeyValuePipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";

import { HighchartsChartModule } from 'highcharts-angular';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import {MatBadgeModule} from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';


import { LoginComponent } from "src/app/auth/components/login/login.component";
import { mainReducer, reducer } from "src/app/auth/store/reducers/index";
import { registerEffect } from "./store/effects/register.effect";
import { HeaderComponent } from 'src/app/auth/dashbaord/header/header.component';
import { SidebarComponent } from 'src/app/auth/dashbaord/sidebar/sidebar.component';
import { HomeComponent } from 'src/app/auth/dashbaord/home/home.component';
import { subscriptiondetailsComponent } from 'src/app/auth/dashbaord/subscriptiondetails/subscriptiondetails.component';
import { StatisticsComponent } from 'src/app/auth/dashbaord/statistics/statistics.component';
import { ParametersComponent } from 'src/app/auth/dashbaord/parameters/parameters.component';
import { EffectsModule } from "@ngrx/effects";
import { AuthService } from "./services/auth.service";
import { PersnlService } from "./services/persnl.service";
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { loginEffect } from "./store/effects/login.effect";
import { V1Component } from './dashbaord/home/v1/v1.component';
import { V3Component } from './dashbaord/home/v3/v3.component';
import { V2Component } from './dashbaord/home/v2/v2.component';
import { V4Component } from './dashbaord/home/v4/v4.component';
import { V44Component } from './dashbaord/home/v44/v44.component';
import { V33Component } from './dashbaord/home/v33/v33.component';
import { V22Component } from './dashbaord/home/v22/v22.component';
import { NotificationsComponent } from './dashbaord/notifications/notifications.component';



const routes = [
  {path:'', redirectTo: 'login', pathMatch:'full'},
  {
    path: 'login',
    component: LoginComponent,
    children: [
      
    ]
  },
  { path: 'dashboard', component: DashbaordComponent,
  children: [
    {path:'', redirectTo: 'home', pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'statistics', component:StatisticsComponent},
    {path:'parameters', component:ParametersComponent},
    {path:'notifications', component:NotificationsComponent},
  ]
}
]
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        StoreModule.forFeature('auth', reducer),
        EffectsModule.forFeature([loginEffect]),
        FormsModule,
        HighchartsChartModule,
        MatToolbarModule,
        MatSidenavModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatBadgeModule,
        MatDividerModule,
        MatListModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule
    ],
    declarations: [
      LoginComponent,
      HeaderComponent,
      SidebarComponent,
      HomeComponent,
      subscriptiondetailsComponent,
      StatisticsComponent,
      ParametersComponent,
      DashbaordComponent,
      V1Component,
      V3Component,
      V2Component,
      V4Component,
      V44Component,
      V33Component,
      V22Component,
      NotificationsComponent
    ],
    providers: [AuthService, PersnlService]
})
export class AuthModule implements OnInit{
  title = 'structuresSelfManage';
  sideBarOpen = true;
  
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
