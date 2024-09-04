import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-list-encaissement',
  templateUrl: './list-encaissement.component.html',
  styleUrls: ['./list-encaissement.component.scss']
})
export class ListEncaissementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  confirmer()
  {
    $('#confirmer').modal('hide');
    $('#imprimer').modal('show');
  }

  valider(){
    $('#imprimer').modal('hide');
    $('#valider').modal('show');
  }
   imprimer(){
     alert('merci');
    // $('#valider').modal('hide');
    // $('#confirmer').modal('show');

   }


}
