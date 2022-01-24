import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-paiement-search',
  templateUrl: './paiement-search.component.html',
  styleUrls: ['./paiement-search.component.css']
})
export class PaiementSearchComponent implements OnInit {
  paiementSearchForm: FormGroup;
  constructor(private psfb: FormBuilder) { }

  ngOnInit(): void {
    this.paiementSearchForm=this.psfb.group({
      //doB: new FormControl(''),
      IdPrest: new FormControl(''),
      Patient: new FormControl(''),
      DateStart: new FormControl(''),
      DateEnd: new FormControl(''),
      SelMed: new FormControl(),
      TypePrest: new FormControl()

    });
  }
  recherche(){
    console.log("il est bien rentré");
    console.log("les données du formulaire sont :",this.paiementSearchForm.value);
  }
}
