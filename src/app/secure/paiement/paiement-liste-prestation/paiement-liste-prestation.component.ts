import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { PrestationsService } from 'src/app/_services/prestations.service';
import { Prestations } from 'src/app/_models/mprestations';
//import { EventEmitter } from 'events';

@Component({
  selector: 'app-paiement-liste-prestation',
  templateUrl: './paiement-liste-prestation.component.html',
  styleUrls: ['./paiement-liste-prestation.component.css']
})
export class PaiementListePrestationComponent implements OnInit {

  @Output() ClickBoutonNouvellePrestation = new EventEmitter();
  @Output() SelectedPrestationAmbulatoire = new EventEmitter();
  Liste: Prestations [];

  constructor(private prestationsService: PrestationsService) {}

  ngOnInit(): void {
    this.Liste=this.prestationsService.ListePrestations;
  }
  
  PrestationAmbulatoireSelected(selected: number) {
    this.SelectedPrestationAmbulatoire.emit(selected);

  }
  sendEvent(){
    this.ClickBoutonNouvellePrestation.emit(true);
  }
}
