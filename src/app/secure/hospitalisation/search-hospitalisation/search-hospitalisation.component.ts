import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-hospitalisation',
  templateUrl: './search-hospitalisation.component.html',
  styleUrls: ['./search-hospitalisation.component.css']
})
export class SearchHospitalisationComponent implements OnInit {

  paiementSearchForm: FormGroup;
  constructor(private psfb: FormBuilder) {
    console.log('recherche hosto');
  }

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
