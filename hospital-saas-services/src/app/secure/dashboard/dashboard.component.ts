import { Component, OnInit } from '@angular/core';
import { ModulesService } from 'src/app/_services/modules.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  prenatal: boolean;

  constructor() {
      }

  ngOnInit() {
    this.prenatal=true;

  }


  



}
