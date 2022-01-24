import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Prestations } from 'src/app/_models/mprestations';
import { PrestationsService } from 'src/app/_services/prestations.service';

@Component({
  selector: 'app-paiement-hospitalisation',
  templateUrl: './paiement-hospitalisation.component.html',
  styleUrls: ['./paiement-hospitalisation.component.css']
})
export class PaiementHospitalisationComponent implements OnInit {

  
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
