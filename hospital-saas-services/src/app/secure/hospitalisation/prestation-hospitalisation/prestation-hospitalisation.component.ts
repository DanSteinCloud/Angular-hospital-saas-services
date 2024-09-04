import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PrestationsService } from 'src/app/_services/prestations.service';

@Component({
  selector: 'app-prestation-hospitalisation',
  templateUrl: './prestation-hospitalisation.component.html',
  styleUrls: ['./prestation-hospitalisation.component.css']
})
export class PrestationHospitalisationComponent implements OnInit {

  @Input() selectedPrestationIndex: number;
  listePrestations: any;
  @Output() ajoutActeEvent =new EventEmitter();
  @Output() suppressionActeEvent = new EventEmitter();
  ActesListe:  any = new Array("Imagerie","Consultation", "Echographie", "Prélèvement", "Numération Formule Sanguine", "Plaquette");
  addActeForm: FormGroup;
  deleteActeForm: FormGroup;

  addActeFormFacturer:any;
  addRoomFormFacturer:any;

  constructor(private paafg: FormBuilder, private pdafg: FormBuilder, private prestationsService: PrestationsService) { }

  ngOnInit(): void {
    this.listePrestations= this.prestationsService.ListePrestations
    this.addActeForm= this.paafg.group({
      acteName: new FormControl(''),
      medecin:  new FormControl(this.listePrestations[this.selectedPrestationIndex].doctor.firstName),
      acteType: new FormControl(''),
      actePrice: new FormControl('')
    })
    this.deleteActeForm=this.pdafg.group({})
  }
  ajouteActe(){
    //console.log(this.selectedPrestation)
    let x=this.listePrestations[this.selectedPrestationIndex].actes.pop();
    //console.log(x.id)
    console.log("avant l'ajout",this.listePrestations[this.selectedPrestationIndex].actes);
    let y;
    if (x != undefined) {
      y={id: x.id+1, name: this.addActeForm.value.acteName, type: this.addActeForm.value.acteType, doctor:{id: x.doctor.id+1, firstName: this.addActeForm.value.medecin, lastName: ""}, price: this.addActeForm.value.actePrice }


    } else {
      y={id: 1, name: this.addActeForm.value.acteName, type: this.addActeForm.value.acteType, doctor:{id: 1, firstName: this.addActeForm.value.medecin, lastName: ""}, price: this.addActeForm.value.actePrice}


    }
    this.prestationsService.ajouterActe(this.selectedPrestationIndex,y)
    console.log("après l'ajout",this.listePrestations[this.selectedPrestationIndex].actes);
    //console.log("Le nom de l'acte est",this.addActeForm.value.acteName);
    //console.log("Le nom du medecin est",this.addActeForm.value.medecin);
    //console.log("Le type de l'acte est",this.addActeForm.value.acteType);
  }

  supprimeActe(){

  }

}
