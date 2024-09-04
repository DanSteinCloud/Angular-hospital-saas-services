import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RefdataService } from 'src/app/_services/refdata.service';
import { AssuranceService } from 'src/app/_services/assurance.service';
import { forkJoin } from 'rxjs';
import { aRefData } from 'src/app/_models/refdata';
import { aInsurance } from 'src/app/_models/insurance';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createPrenatal:boolean;
  closeResult = '';
  private readonly constCity = "CITY";
  private readonly constSexe = "SEX";
  private readonly constCountry = "COUNTRY";
  private readonly constState = "STATE";
  private readonly constNationality = "NATIONALITY";

  addForm: FormGroup;
  rMessage:string;
  submitted:boolean;
  loading: boolean;
  AllCity: any;
  AllSexe: any;
  dataAssurance: aInsurance;
  AllNationality: any;
  AllCountry: any;
  AllState: any;

  constructor(private refdata: RefdataService,private assurance: AssuranceService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.createPrenatal = false;
    this.submitted =false;
    const cityPromise = this.refdata.get(this.constCity);
    const sexPromise = this.refdata.get(this.constSexe);
    const assurancePromise = this.assurance.get();
    const nationalityPromise = this.refdata.get(this.constNationality);
    const countryPromise = this.refdata.get(this.constCountry);
    const statePromise = this.refdata.get(this.constState);


    forkJoin([cityPromise,sexPromise,assurancePromise,nationalityPromise,countryPromise,statePromise]).subscribe(responses => {
      this.AllCity = Object.assign(new aRefData(), responses[0][0]).refDatas;
      this.AllSexe = Object.assign(new aRefData(), responses[1][0]).refDatas;
      this.dataAssurance= Object.assign(new aInsurance(),responses[2]);
      this.AllNationality = Object.assign(new aRefData(), responses[3][0]).refDatas;
      this.AllCountry = Object.assign(new aRefData(), responses[4][0]).refDatas;
      this.AllState = Object.assign(new aRefData(), responses[5][0]).refDatas;
    });

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

  }

  onSubmit(){

  }
  resetForm() {
    this.submitted = false;
    this.rMessage = "";
    this.addForm.reset();
  }

  open(content) {
    this.createPrenatal =true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
