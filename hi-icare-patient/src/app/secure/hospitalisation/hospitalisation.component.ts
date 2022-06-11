import { Component, OnInit } from '@angular/core';
import { Prestations, Acte } from '../../_models/mprestations';
import { PrestationsService } from '../../_services/prestations.service';

@Component({
  selector: 'app-hospitalisation',
  templateUrl: './hospitalisation.component.html',
  styleUrls: ['./hospitalisation.component.css']
})
export class HospitalisationComponent implements OnInit {

  afficherComponentPrestationAmbulatoire: boolean; //decide si le composant prestationAmbulatoire est affiché
  afficherComponentSearch: boolean; //decide si le composant search est affiché
  afficherComponentListePrestation: boolean; //decide si le composant listePrestation est affiché
  afficherComponentNouvelleprestation: boolean; //decide si le composant nouvelleprestation est affiché
  afficherComponentFacturer: boolean; //decide si le composant Facturer est affiché

  PrestationsList: Prestations[];
  selectedPrestAmbuIndex: number; //variable pour réceuillir l'index de la prestation sélectionnée dans listePrestation
  selectedPrestFactureIndex: number;

  constructor(private prestationsService: PrestationsService) {
    //console.log("Constructor", this.obj3)
  }

  ngOnInit(): void {
    console.log('hospitalisation infos');
    this.PrestationsList = this.prestationsService.ListePrestations;
    this.afficherComponentPrestationAmbulatoire = false;
    this.afficherComponentNouvelleprestation = false;
    this.afficherComponentSearch = true;
    this.afficherComponentListePrestation = true;
    this.afficherComponentFacturer = false;
  }

  clicRetour() {
    this.afficherComponentSearch = true; // on affiche le composant search
    this.afficherComponentListePrestation = true; // on affiche le composant listePrestation
    this.afficherComponentNouvelleprestation = false; // on masque le composant nouvelleprestation
    this.afficherComponentPrestationAmbulatoire = false; // on masque le composant prestationAmbulatoire
    this.afficherComponentFacturer = false; // on masque le composant Facturer
  }

  // Fonction qui récupère lorsque l'utilisateur clique sur le bouton Créer Nouvelle Presttion Ambulatoire
  nouvellePrestationrq(message: any) {
    if (message) {
      this.afficherComponentSearch = false;
      this.afficherComponentListePrestation = false;
      this.afficherComponentFacturer = true;
      this.afficherComponentNouvelleprestation = false;
    }
  }

  // Fonction qui récupère la prestation que l'utilisateur a décidé de voir,  la transmet à prestationAmbulatoire et cache les composants inutiles
  seletectedPrestationAmbulatoire(selected: number) {
    this.afficherComponentSearch = false;
    this.afficherComponentListePrestation = false;
    this.afficherComponentNouvelleprestation = false;
    this.afficherComponentPrestationAmbulatoire = true;
    this.afficherComponentFacturer = false;
    this.selectedPrestAmbuIndex = selected;
  }

  ajoutActe(acte: Acte) {
    //this.PrestationsList.findIndex(c => c==this.selectedPrestAmbu);

    this.prestationsService.ajouterActe(this.selectedPrestAmbuIndex, acte);
    console.log(this.PrestationsList[this.selectedPrestAmbuIndex].actes);
  }

  supprimeActe(indexActe: any) {
    this.prestationsService.supprimerActe(
      this.selectedPrestAmbuIndex,
      indexActe
    );
  }

  afficheComponentFacturer(message: boolean) {
    if (message) {
      this.afficherComponentFacturer = true;
      this.afficherComponentSearch = false;
      this.afficherComponentListePrestation = false;
      this.afficherComponentNouvelleprestation = false;
      this.afficherComponentPrestationAmbulatoire = false;
      this.selectedPrestFactureIndex =
        this.prestationsService.ListePrestations.length - 1;
    }
  }

}
