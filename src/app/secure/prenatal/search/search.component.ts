import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Search } from 'src/app/_models/search';
import { PatientService } from 'src/app/_services/patient.service';
import { RefdataService } from 'src/app/_services/refdata.service';
import { forkJoin } from 'rxjs';
import { aRefData } from 'src/app/_models/refdata';
import { AssuranceService } from 'src/app/_services/assurance.service';
import { aInsurance } from 'src/app/_models/insurance';
declare var $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dataAssurance: aInsurance;
  searchForm: FormGroup;
  submitted: boolean;
  pSearch: Search = {};
  filteredPatients: any[] = [];
  readonly constCity = "CITY";
  readonly constSexe = "SEX";
  AllCity: any;
  AllSexe: any;

  constructor(private patientService: PatientService,private refdata: RefdataService,private assurance: AssuranceService) { }

  ngOnInit(): void {
    const cityPromise = this.refdata.get(this.constCity);
    const sexPromise = this.refdata.get(this.constSexe);
    const assurancePromise = this.assurance.get();

    forkJoin([cityPromise,sexPromise,assurancePromise]).subscribe(responses => {
      this.AllCity = Object.assign(new aRefData(), responses[0][0]).refDatas;
      this.AllSexe = Object.assign(new aRefData(), responses[1][0]).refDatas;
      this.dataAssurance= Object.assign(new aInsurance(),responses[2]);
    });



    this.searchForm = new FormGroup({
      rpatientIdentifier: new FormControl(),
      rfirstName: new FormControl(),
      rlastName: new FormControl(),
      rdoB: new FormControl(),
      rTelephone1: new FormControl(),
      rcity: new FormControl(),
      rsex: new FormControl(),
      rassurance: new FormControl(),
      rdateCreated: new FormControl(),
    });
  }

  onRechercheSubmit() {
    this.submitted = true;
    this.pSearch.lastName = this.searchForm.value.rlastName;
    this.pSearch.firstName = this.searchForm.value.rfirstName;
    this.pSearch.patientIdentifier = this.searchForm.value.rpatientIdentifier;
    this.pSearch.doB = new Date(this.searchForm.value.rdoB).getTime() / 1000;
    this.pSearch.phone = this.searchForm.value.rTelephone1;
    this.pSearch.createdDate =
      new Date(this.searchForm.value.rdateCreated).getTime() / 1000;
    this.pSearch.sex = this.searchForm.value.rsex;
    this.pSearch.insuranceId = this.searchForm.value.rassurance;
    this.pSearch.phone = this.searchForm.value.rTelephone1;
    this.pSearch.city = this.searchForm.value.rcity;

    // this.filteredPatients=this.filteredPatients.find((item) => item.id !== id);
    if (
      this.searchForm.value.rfirstName === null &&
      this.searchForm.value.rlastName === null &&
      this.searchForm.value.rpatientIdentifier === null &&
      this.searchForm.value.rdoB === null &&
      this.searchForm.value.rTelephone1 === null &&
      this.searchForm.value.rdateCreated === null &&
      this.searchForm.value.rsex === null &&
      this.searchForm.value.rassurance === null &&
      this.searchForm.value.rcity === null &&
      this.submitted === true
    ) {
      //this.submitted = false;
      $("#formSearchNotCriteria").modal("show");
    } else {
      this.patientService.search(this.pSearch).subscribe(
        (res) => {
          this.filteredPatients = [];
          this.filteredPatients = res.result;
        },
        (error) => {
          if (error.error.code === 400) {
            console.log("ciicicicic");
            this.filteredPatients = [];
            //this.filteredPatients = null;
          }
        }
      );
    }
  }

  annuler(){

  }
}
