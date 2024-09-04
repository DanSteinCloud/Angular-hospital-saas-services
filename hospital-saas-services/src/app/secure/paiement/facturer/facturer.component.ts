import { Component, OnInit, Input } from '@angular/core';
import { PrestationsService } from 'src/app/_services/prestations.service';
import { Prestations } from 'src/app/_models/mprestations';
import { FormBuilder, FormControl } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-facturer',
  templateUrl: './facturer.component.html',
  styleUrls: ['./facturer.component.css']
})
export class FacturerComponent implements OnInit {
  @Input() selectedPrestationIndex: number;
  listePrestations: Prestations [];
  doctors: any;
  tabdisplays:boolean;
  ActesListe:  any = new Array("Imagerie","Consultation", "Echographie", "Prélèvement", "Numération Formule Sanguine", "Plaquette");
  addActeFormFacturer: any;
  checked=false;
  line_id: any;
  constructor(private prestationsService: PrestationsService,
    private factes: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.listePrestations = this.prestationsService.ListePrestations;
    this.tabdisplays=false;
    this.addActeFormFacturer = this.factes.group({
      acteName: new FormControl(''),
      medecin:  new FormControl(''),
      acteType: new FormControl(''),
      actePrice: new FormControl('')
    });
  }

  displayTab(){
    this.listePrestations = this.prestationsService.ListePrestations;
    this.tabdisplays=true;

  }

  handleChange(val){
    this.line_id=val;
    this.checked = true
  }

  etatEncaissement(){
    $('#formValidationFacture').modal('hide');
    this.router.navigate(['/etatEncaissement']);
  }

}
