import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/_services/patient.service';
import { AssuranceService } from 'src/app/_services/assurance.service';
import { RefdataService } from 'src/app/_services/refdata.service';
import { forkJoin } from 'rxjs';
import { aRefData } from 'src/app/_models/refdata';
import { aInsurance } from 'src/app/_models/insurance';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  addForm: FormGroup;
  readonly constCity = "CITY";
  readonly constSexe = "SEX";
  readonly constLinkType = "LINKTYPE";
  readonly constCountry = "COUNTRY";
  readonly constState = "STATE";
  readonly constNationality = "NATIONALITY";
  prenatal: boolean;
  loading: boolean;
  AllCity: any;
  AllSexe: any;
  AllCountry: any;
  AllState: any;
  AllLinkType: any;
  AllNationality: any;
  dataAssurance: aInsurance;
  filteredPatients: any[] = [];
  config: { itemsPerPage: number; currentPage: number; totalItems: any; };
  submitted: boolean;
  rMessage: string;
  list: boolean;
  suivi: boolean;


  constructor( private router: Router,
    private patientService: PatientService,
    private assurance: AssuranceService,
    private refdata: RefdataService) {

  }

  ngOnInit(): void {
    this.suivi =false;
    this.list =true;
    if (localStorage.getItem("token") == null) {
      localStorage.removeItem("token");
      localStorage.removeItem("X_HI_CODE");
      localStorage.removeItem("currentUser");
      this.router.navigate(["/login"]);
    }

  //   const cityPromise = this.refdata.get(this.constCity);
  //   const sexPromise = this.refdata.get(this.constSexe);
  //   const countryPromise = this.refdata.get(this.constCountry);
  //   const statePromise = this.refdata.get(this.constState);
  //   const linkTypePromise = this.refdata.get(this.constLinkType);
  //   const nationalityPromise = this.refdata.get(this.constNationality);
  //   const assurancePromise = this.assurance.get();
  //   const patientPromise = this.patientService.getPatients();

  //   forkJoin([cityPromise,sexPromise,countryPromise,statePromise,linkTypePromise,nationalityPromise,assurancePromise,patientPromise]).subscribe(responses => {
  //     this.AllCity = Object.assign(new aRefData(), responses[0][0]).refDatas;
  //     this.AllSexe = Object.assign(new aRefData(), responses[1][0]).refDatas;
  //     this.AllCountry = Object.assign(new aRefData(), responses[2][0]).refDatas;
  //     this.AllState = Object.assign(new aRefData(), responses[3][0]).refDatas;
  //     this.AllLinkType = Object.assign(new aRefData(), responses[4][0]).refDatas;
  //     this.AllNationality = Object.assign(new aRefData(), responses[5][0]).refDatas;

  //     this.dataAssurance= Object.assign(new aInsurance(),responses[6]);
  //     this.filteredPatients = responses[7];

  //     this.filteredPatients.forEach(patient =>
  //       {
  //         var s =Array();
  //         var tel =Array();
  //         patient.assurances = Object.entries(this.dataAssurance).forEach(([key, value]) =>
  //         {
  //           if (patient.insuranceList.find(x => x===value.id))
  //           {
  //              s.push(value.name);
  //           }
  //         });
  //         tel= patient.phones.filter(v => v.phone !== null).map(e => e.phone);
  //         patient.tel =(tel.length>=2)? tel.join(" / "):tel.join("");
  //         patient.assurances =(s.length>=2)?s.join(" / "): s.join("")

  //   });

  // });
  this.addForm = new FormGroup({
    patientIdentifier: new FormControl("", Validators.required),
    dAccouchement: new FormControl("", Validators.required),
    sanguin: new FormControl("", Validators.required),
    rhesius: new FormControl("", Validators.required),
    dRophylac: new FormControl("", Validators.required),
    num_accouchement: new FormControl("", Validators.required),
    lastName: new FormControl(),
    secondName: new FormControl("", Validators.required),
    firstName: new FormControl(),
    doB: new FormControl(),
    age: new FormControl(),
    adresse: new FormControl(),
    Telephone1: new FormControl(),
    profession: new FormControl(),
    sMatrimoniale: new FormControl(),
    pContact: new FormControl()
  });


    this.config = {
      itemsPerPage: Number(environment.rows_per_table),
      currentPage: 1,
      totalItems: this.filteredPatients.length,
    };
  }

  resetForm() {
    this.submitted = false;
    this.rMessage = "";
    this.addForm.reset();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }
  get f() {
    return this.addForm.controls;
  }

  onSubmit(){}

  displaySuivi()
  {

    this.suivi =true;
    this.list =false;
    console.log("--------LIST SUIVI-------------");
  }



}
