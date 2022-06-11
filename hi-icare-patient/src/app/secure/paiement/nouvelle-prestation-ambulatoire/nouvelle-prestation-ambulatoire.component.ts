import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PATIENTS } from 'src/app/data/patient.data';

@Component({
  selector: 'app-nouvelle-prestation',
  templateUrl: './nouvelle-prestation-ambulatoire.component.html',
  styleUrls: ['./nouvelle-prestation-ambulatoire.component.css']
})
export class NouvellePrestationAmbulatoireComponent implements OnInit {
  //todayDate : Date = new Date();
  @Input() Prestations: any;
  @Output() facturationEvent = new EventEmitter();
  ActesListe:  any = new Array("Imagerie","Consultation", "Echographie", "Prélèvement", "Numération Formule Sanguine", "Plaquette");
  currentDate: Date ;
  afficherBoutonSupprimer: boolean;
  NouvPrestaPatientGroup: FormGroup;
  NouvPrestaInfosGenGroup: FormGroup;
  addActeForm: FormGroup;
  patientService: any;
  filteredPatients: any;
  patients: any;
  constructor(private nppfb: FormBuilder,private npigfb: FormBuilder, private npafg: FormBuilder) {
    this.afficherBoutonSupprimer=false
   }
   loadPatients(): void {
    //this.patientService.fetchPatients().subscribe((patients) => (this.patients = patients));
    this.filteredPatients =PATIENTS;
     // this.filteredPatients.length > 0 ? this.filteredPatients : this.patients;
  }

  ngOnInit(): void {
    this.currentDate= new Date();
    this.loadPatients();
    //console.log(this.currentDate | date:'yyyy-mm-dd');
    this.NouvPrestaPatientGroup = this.nppfb.group({
      IdPrest: new FormControl(''),
      NumDos: new FormControl(''),
      Nom: new FormControl(''),
      Prenom: new FormControl(''),
      Assur: new FormControl(''),
      Taux: new FormControl(''),
      Tel: new FormControl('+225-08-42-27-03'),
      BirthDate: new FormControl('2000-01-01')

    });
    this.NouvPrestaInfosGenGroup = this.npigfb.group({
      IdPrest: new FormControl(''),
      TypePrest: new FormControl(''),
      MedPrinc: new FormControl(''),
      Time: new FormControl('03:51'),
      Date: new FormControl("this.currentDate | date:'yyyy-mm-dd'") //It doesn't work :(

    });
    this.addActeForm= this.npafg.group({
      acteName: new FormControl(''),
      medecin:  new FormControl(''),
      acteType: new FormControl(''),
    })
  }
  facture() {
    this.facturationEvent.emit(true);
  }

}
