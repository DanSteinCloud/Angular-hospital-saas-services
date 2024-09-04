import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Mpartenaire } from '../../../_models/mpartenaire';

@Component({
  selector: 'app-medecins-partenaire-detail',
  templateUrl: './medecins-partenaire-detail.component.html',
  styleUrls: ['./medecins-partenaire-detail.component.css']
})
export class MedecinsPartenaireDetailComponent implements OnInit {
  title: string;
  _id: string;
  userdata: any;
  displayFormMpart: FormGroup;
  mpartenaire: Mpartenaire = { id: ' MED001 ', nom: 'Dr A', statut: 'Interne', telephone: '50'};
  objcovent: any = new Array(
    { id: 'MED001', garant: 'Axa assurance', structure: 'Assurance', date_debut: '01/05/2019',statut:'Acceptée' },
    { id: 'MED002', garant: 'Ascoma', structure: 'Assurance', date_debut: '01/05/2019',statut:'Acceptée' },
    { id: 'MED003', garant: 'Allianz', structure: 'Assurance', date_debut: '01/05/2019',statut:'Refusée' },
    { id: 'MED004', garant: 'IPMX', structure: 'IPM', date_debut: '01/05/2019',statut:'Refusée' },
    { id: 'MED001', garant: 'IPM Y', structure: 'IPM', date_debut: '01/05/2019',statut:'Acceptée' },
    { id: 'MED001', garant: 'IPM V', structure: 'IPM', date_debut: '01/05/2019',statut:'Refusée' });
  conventionlist: any;
  loaddetails = false;
  partenaire = false;
  conventions=false;
  c: boolean;
  //userdetails: ;
  constructor(private router: Router, private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void
  {
    this.title = 'details';
    this.loaddetails = true;
    this.partenaire = false;
    this.conventions = false;
    this.conventionlist = this.objcovent;
    this._id = this.route.snapshot.queryParamMap.get('id');
    console.log(' here icicicc22222' + this._id + ' loaddetails=' + this.loaddetails +' listmPartenaire=' + this.partenaire);
  }

  ConventionDetails()
  {
    this._id='5';
    console.log('Conventions details');
    this.loaddetails = false;
    this.partenaire = false;
    this.conventions = true;
    this.router.navigate(['conventions', {queryParams:{ id : this._id }}]);
  }
}

