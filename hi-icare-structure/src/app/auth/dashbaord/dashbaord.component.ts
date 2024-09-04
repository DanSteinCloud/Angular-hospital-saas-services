import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/auth/dashbaord/header/header.component';
import { SidebarComponent } from 'src/app/auth/dashbaord/sidebar/sidebar.component';
import { HomeComponent } from 'src/app/auth/dashbaord/home/home.component';
import { subscriptiondetailsComponent } from 'src/app/auth/dashbaord/subscriptiondetails/subscriptiondetails.component';
import { StatisticsComponent } from 'src/app/auth/dashbaord/statistics/statistics.component';
import { ParametersComponent } from 'src/app/auth/dashbaord/parameters/parameters.component';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {

  title = 'structuresSelfManage';
  sideBarOpen = true;
  
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
