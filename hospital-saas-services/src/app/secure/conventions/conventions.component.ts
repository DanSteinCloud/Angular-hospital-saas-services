import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'conventions',
  templateUrl: './conventions.component.html',
  styleUrls: ['./conventions.component.css']
})
export class ConventionsComponent implements OnInit {
  loaddetails: boolean;
  conventions: boolean;
  searchFormConventions: FormGroup;
  obj: any = new Array(
    { id: 'MED001', garant: 'Axa assurance', structure: 'Assurance', date_debut: '01/05/2019',statut:'Acceptée' },
    { id: 'MED002', garant: 'Ascoma', structure: 'Assurance', date_debut: '01/05/2019',statut:'Acceptée' },
    { id: 'MED003', garant: 'Allianz', structure: 'Assurance', date_debut: '01/05/2019',statut:'Refusée' },
    { id: 'MED004', garant: 'IPMX', structure: 'IPM', date_debut: '01/05/2019',statut:'Refusée' },
    { id: 'MED001', garant: 'IPM Y', structure: 'IPM', date_debut: '01/05/2019',statut:'Acceptée' },
    { id: 'MED001', garant: 'IPM V', structure: 'IPM', date_debut: '01/05/2019',statut:'Refusée' });
  conventionlist: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void 
  {
    this.loaddetails = false;
    this.conventions = true;
    this.conventionlist=this.obj;
    this.searchFormConventions = this.formBuilder.group({
      organisme: ['', Validators.required],
      structure: ['', Validators.required],
      statut: ['', Validators.required]
  });
    console.log(' Ici la convention'+this.conventionlist);
  }

}
