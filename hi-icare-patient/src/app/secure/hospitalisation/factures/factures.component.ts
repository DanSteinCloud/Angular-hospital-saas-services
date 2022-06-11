import { Component, Input, OnInit } from '@angular/core';
import { PrestationsService } from 'src/app/_services/prestations.service';
import { Prestations } from 'src/app/_models/mprestations';
@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent implements OnInit {

  @Input() selectedPrestationIndex: number;
  listePrestations: Prestations [];
  addActeFormFacturer: any;
  addRoomFormFacturer:any;
  tabdisplays: boolean;
  constructor(private prestationsService: PrestationsService) { }

  ngOnInit(): void {
    this.tabdisplays = false;
    this.listePrestations=this.prestationsService.ListePrestations;
  }
  displayTab(){
    this.listePrestations = this.prestationsService.ListePrestations;
    this.tabdisplays=true;

  }

}
