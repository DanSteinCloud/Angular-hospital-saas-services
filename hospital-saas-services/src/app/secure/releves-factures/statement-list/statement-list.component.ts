import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statement-list',
  templateUrl: './statement-list.component.html',
  styleUrls: ['./statement-list.component.scss']
})
export class StatementListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  DetailsReleve(){
    this.router.navigate(['/statementlist']);
  }

}
