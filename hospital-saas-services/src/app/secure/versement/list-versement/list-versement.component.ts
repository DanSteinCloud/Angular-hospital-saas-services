import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-versement',
  templateUrl: './list-versement.component.html',
  styleUrls: ['./list-versement.component.scss']
})
export class ListVersementComponent implements OnInit {

  versements: { id: string; caisse: string; date_versement: string; montant: string; mode_paiement: string; }[];
  //public versements:any;
  constructor() {

  }



  ngOnInit(): void {


    this.versements=[{id:'FAC002',caisse:'CAISSE A',date_versement:'12/02/2009',montant:'23 000',mode_paiement:'Orange money'}];
  }

}
