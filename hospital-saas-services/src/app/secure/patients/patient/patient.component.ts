import { Component, Input, OnInit, PipeTransform } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { PatientService } from "../../../_services/patient.service";
import {
  PhonesEntity,
  AddressesEntity,
  patient,
  IdentifiersEntity,
} from "src/app/_models/patient";
import { Reponse } from "src/app/_models/reponse";
import { Search } from "src/app/_models/search";
import { AssuranceService } from "src/app/_services/assurance.service";
import { RefdataService } from "src/app/_services/refdata.service";
import { Insurer } from "src/app/_models/prisencharge";
import { environment } from "src/environments/environment";
import { CareGivers } from 'src/app/_models/caregivers';
import { CareGiversService } from 'src/app/_services/caregivers.service';

import { forkJoin } from 'rxjs';
import { refData, aRefData } from 'src/app/_models/refdata';
import { Insurance, aInsurance } from 'src/app/_models/insurance';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: "app-patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.css"],
})
export class PatientComponent implements OnInit {
  patient = false;
  id: number;                               
  loaddetails = false;
  addForm: FormGroup;
  addOrUpdateArchivage :FormGroup;

  p: any = {};
  results: any = {};
  tel: Array<PhonesEntity> = [];
  //PhonesEntity[] = [];
  ident: IdentifiersEntity[] = [];
  adr: AddressesEntity[] = [];
  @Input() groupFilters: Object;
  @Input() searchByKeyword: string;
  patients: any[] = [];
  filteredPatients: any[] = [];
  errorMessage: any;
  s: string;
  PatientId: string;

  patientIdChoose: string;
  prenatalIdChoose: string;

  PatientName: string;
  res: Reponse;
  sSearch: any = {};
  identifiers: any[] = [];
  AllAssuranceListe: any[] = [];
  SendDetailsId: string;
  oPatient: patient = {};
  data: patient = {};
  dataAssurance: aInsurance;
  form: FormGroup;
  searchForm: FormGroup;
  users: any[] = [];
  bErrorUpdate: "";
  rMessage: string;
  submitted = false;
  resInfor: any;
  pSearch: Search = {};
  searchPatients: any[] = [];
  mySubcription: any;
  partenaire: boolean;
  home: boolean;
  planning: boolean;

  refDataInfos: any[] = [];
  AllCity: any[] = [];
  AllSexe: any[] = [];
  AllLinkType: any[] = [];
  AllCountry: any[] = [];
  AllState: any[] = [];
  AllNationality: any[] = [];
  private readonly constCity = "CITY";
  private readonly constSexe = "SEX";
  private readonly constLinkType = "LINKTYPE";
  private readonly constCountry = "COUNTRY";
  private readonly constState = "STATE";
  private readonly constNationality = "NATIONALITY";
  config: any;

  cityRefData:aRefData;
  dataCareGiversDetails: CareGivers[] = [];
  ddr:number=0;
  lstPrivileges: any = [];

  collection = { count: 30, data: [] };
  loading: boolean;
  //refDataInfos: any[] = [];
  createPrenatal:boolean;
  closeResult: string;
  addFormPrenatal: FormGroup;
  loaddetailprenatal: boolean;
  testTailleDossierPrenatal:number=-1;
  getValue(event: Event): String {  
    let X = Math.trunc((new Date((event.target as HTMLInputElement).value).getTime()/1000 - this.ddr)/86400/7)  ;
    let Y = ((new Date((event.target as HTMLInputElement).value).getTime()/1000 - this.ddr)/86400) % 7 ;

    let terme = X +' SA + ' + Y + ' jours' ;
       this.addOrUpdateArchivage.patchValue({
    terme:terme
  })
   
    
    return terme;
  }
  constructor(
    private router: Router,
    private patientService: PatientService,
    private assurance: AssuranceService,
    private refdata: RefdataService,
    private modalService: NgbModal,
    private caregivers: CareGiversService,
    private route: ActivatedRoute
  ) {}




  ngOnInit(): void {
    this.patient = true;
    this.createPrenatal = false;
    if (localStorage.getItem("token") == null) {
      localStorage.removeItem("token");
      localStorage.removeItem("X_HI_CODE");
      localStorage.removeItem("currentUser");
      this.router.navigate(["/login"]);
    }
      localStorage.removeItem('disabledGeneral');
      localStorage.removeItem('dossierPrenatalAvoir');
      this.rMessage="";
    const cityPromise = this.refdata.get(this.constCity);
    const sexPromise = this.refdata.get(this.constSexe);
    const countryPromise = this.refdata.get(this.constCountry);
    const statePromise = this.refdata.get(this.constState);
    const linkTypePromise = this.refdata.get(this.constLinkType);
    const nationalityPromise = this.refdata.get(this.constNationality);
    const assurancePromise = this.assurance.get();
    const patientPromise = this.patientService.getPatients();    
    const caregiversPromise =this.caregivers.getCareGivers(); 

    forkJoin([cityPromise,sexPromise,countryPromise,statePromise,linkTypePromise,nationalityPromise,assurancePromise,patientPromise,caregiversPromise]).subscribe(responses => {
      this.AllCity = Object.assign(new aRefData(), responses[0][0]).refDatas;
      this.AllSexe = Object.assign(new aRefData(), responses[1][0]).refDatas;
      this.AllCountry = Object.assign(new aRefData(), responses[2][0]).refDatas;
      this.AllState = Object.assign(new aRefData(), responses[3][0]).refDatas;
      this.AllLinkType = Object.assign(new aRefData(), responses[4][0]).refDatas;
      this.AllNationality = Object.assign(new aRefData(), responses[5][0]).refDatas;
      this.dataAssurance= Object.assign(new aInsurance(),responses[6]);
      this.filteredPatients = responses[7];
      if (responses[8]['code']==200){
        this.dataCareGiversDetails=responses[8]["result"];
      }
      if (this.filteredPatients!=null)
      {
        this.filteredPatients?.forEach(patient =>
          {
            var s =Array();
            var tel =Array();
            var oDataAssurance =Object.entries(this.dataAssurance);
            if (oDataAssurance!=null)
            {
              patient.assurances = Object.entries(this.dataAssurance).forEach(([key, value]) =>
              {
                if (patient.insuranceList?.find(x => x===value.id))
                {
                   s.push(value.name);
                }
              });
            }

            tel= patient.phones.filter(v => v.phone !== null).map(e => e.phone);
            patient.tel =(tel.length>=2)? tel.join(" / "):tel.join("");
            patient.assurances =(s.length>=2)?s.join(" / "): s.join("")

          });
      }


  });


    this.config = {
      itemsPerPage: Number(environment.rows_per_table),
      currentPage: 1,
      totalItems: this.filteredPatients.length,
    };

    this.addForm = new FormGroup({
      patientIdentifier: new FormControl("", []),
      sex: new FormControl("", Validators.required),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      doB: new FormControl("", Validators.required),
      Telephone1: new FormControl("", Validators.required),
      Telephone2: new FormControl(),
      address: new FormControl("", Validators.required),
      pays: new FormControl(),
      region: new FormControl(),
      ville: new FormControl(),
      rue: new FormControl(),
      nationalite: new FormControl(),
    });

    this.addOrUpdateArchivage = new FormGroup({
      accouchement_delivrance: new FormControl(),
      allaitement: new FormControl(),
      hta: new FormControl(),
      grossesseNormale: new FormControl(),
      dateFinGrossesse: new FormControl(),
      preeclampsie: new FormControl(),
      diabeteGestationnel: new FormControl(),
      autres: new FormControl(),
      annee: new FormControl(),
      deroulementGrossesse: new FormControl(),
      evolution_commentaire: new FormControl(),
      id: new FormControl(),
      issue: new FormControl(),
      poidsNne1: new FormControl(),
      poidsNne2: new FormControl(),
      sexeNne1: new FormControl(),
      sexeNne2: new FormControl(),
      terme: new FormControl(),
      typeGrossesse: new FormControl()
    });

    this.form = new FormGroup({
      mpatientIdentifier: new FormControl("", []),
      msex: new FormControl("", Validators.required),
      mfirstName: new FormControl("", Validators.required),
      mlastName: new FormControl("", Validators.required),
      mdoB: new FormControl("", Validators.required),
      mTelephone1: new FormControl("", Validators.required),
      mTelephone2: new FormControl("", []),
      maddress: new FormControl("", Validators.required),
      mpays: new FormControl("", []),
      mregion: new FormControl("", []),
      mville: new FormControl("", []),
      mrue: new FormControl("", []),
      mnationalite: new FormControl("", []),
    });

    this.searchForm = new FormGroup({
      rpatientIdentifier: new FormControl(),
      //new FormControl('', Validators.required),
      //sex: new FormControl(),
      rfirstName: new FormControl(),
      //new FormControl('', Validators.required),
      rlastName: new FormControl(),
      rdoB: new FormControl(),
      rTelephone1: new FormControl(),
      rcity: new FormControl(),
      rsex: new FormControl(),
      rassurance: new FormControl(),
      rdateCreated: new FormControl(),
      // ville: new FormControl(),
      // rue: new FormControl(),
      // nationalite: new FormControl(),
    });

    this.addFormPrenatal = new FormGroup({
      id: new FormControl(""),
      dateDerniereRegle: new FormControl("", Validators.required),
      groupSanguin: new FormControl("", Validators.required),
      rhesus: new FormControl("", Validators.required),
      praticien: new FormControl("", Validators.required),
      g: new FormControl(),
      p: new FormControl(),
      patientId: new FormControl()
    });

    this.addOrUpdateArchivage.controls['terme'].disable()
    this.lstPrivileges = this.GetPriviligesPatient("PATIENT");
    this.loadPriviliges(this.lstPrivileges);
  }

  // onReset(): void {
  //   this.submitted = false;
  //   //this.addFormPrenatal.reset();
  // }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  loadPriviliges(datas) {
    for (var i = 0; i < datas.length; i++) {
      localStorage.setItem(datas[i], "1");
    }
  }

  //Lire les localStorage
  public readLocalStorageValue(key) {
    let value = localStorage.getItem(key);
    if (value == undefined) {
      value == "";
    }
    return value;
  }

  GetPriviligesPatient(entiteName) {
    const aRowPrivilieges = [];
    var retrievedObject = JSON.parse(localStorage.getItem("aaaa"));

    for (var i = 0; i < retrievedObject.length; i++) {
      aRowPrivilieges.push(retrievedObject[i].action);
    }
    return aRowPrivilieges;
  }
  ngOnDestroy(): void {}


  deletePost(id, fullname) {
    $("#formSuppression").modal("show");
    this.PatientName = fullname;
    this.PatientId = id;
  }

  DeletePatient(id) {
    this.patientService.delete(id).subscribe(() => {
      this.filteredPatients = this.filteredPatients.filter(
        (item) => item.id !== id
      );
    });
    $("#formSuppression").modal("hide");
  }

  refreshTableAll() {
    this.patientService.getAll().subscribe((data: any[]) => {
      this.filteredPatients = data["result"];
    });
  }

  resetTable() {
    this.patientService.getAll().subscribe((data: any[]) => {
      this.filteredPatients = data["result"];
    });
  }

  filterSearch(event) {
    this.sSearch.firstName = event.rfirstName;
    this.sSearch.lastName = event.rlastName;
    this.sSearch.doB = event.rdoB;
    this.sSearch.patientIdentifier = event.rpatientIdentifier;
    this.filteredPatients = [];
    this.patientService.search(this.sSearch).subscribe(() => {});
  }

  modifierPatient(idPatient) {
    this.rMessage = "";
    this.patientService.find(idPatient).subscribe((data: any) => {
      this.oPatient = data.result;
      this.form.setValue({
        mpatientIdentifier: this.oPatient.identifiers.length > 0 ? this.oPatient.identifiers[0].identifier : "",
        msex: this.oPatient.sex,
        mfirstName: this.oPatient.firstName,
        mlastName: this.oPatient.lastName,
        mdoB: new Date(this.oPatient.doB * 1000).toISOString().substring(0, 10),
        mTelephone1:
          this.oPatient.phones.length > 0 ? this.oPatient.phones[0].phone : "",
        mTelephone2:
          this.oPatient.phones.length > 0 ? this.oPatient.phones[1].phone : "",
        maddress:
          this.oPatient.addresses.length > 0
            ? this.oPatient.addresses[0].address
            : "",
        mpays:
          this.oPatient.addresses.length > 0
            ? this.oPatient.addresses[0].country
            : "",
        mregion:
          this.oPatient.addresses.length > 0
            ? this.oPatient.addresses[0].state
            : "",
        mville:
          this.oPatient.addresses.length > 0
            ? this.oPatient.addresses[0].city
            : "",
        mrue:
          this.oPatient.addresses.length > 0
            ? this.oPatient.addresses[0].street
            : "",
        mnationalite: this.oPatient.nationality,
      });
    });
    this.id = idPatient;
  }
 

  DossierPrenatal(id){
    this.rMessage="";
    this.addFormPrenatal.reset();
    this.addFormPrenatal.patchValue({
      patientId:id
    });
  }

  private getPatientId() {
    let idPatient=0;
    this.route.params.subscribe((params) => {
      idPatient = params.id;
    });
    return idPatient;
  }

  onSubmitPrenatal(){

    this.loading = true;
    this.submitted = true;


    if (this.addFormPrenatal.invalid) {
      this.loading =false;
      return;
    }

    let dateDerniereRegle=new Date(this.addFormPrenatal.value.dateDerniereRegle).getTime() / 1000;
    this.addFormPrenatal.patchValue({
      dateDerniereRegle:dateDerniereRegle
    });

    this.patientService.createPrenatalFolder(this.addFormPrenatal.getRawValue(),this.addFormPrenatal.value.patientId).subscribe((res) => {
      if (res.code === 201) {
        this.rMessage = "bSave";
        $("#formFormPrenatal").modal("hide");
        this.loaddetailprenatal = true;
        this.patient = false;
        let url ="/prenataldetails/"+this.addFormPrenatal.value.patientId;
        this.router.navigateByUrl(url);
        this.addFormPrenatal.reset();
      } else {
        this.rMessage = "bError";
        this.loading =false;
      }
    });
  }

  onSubmit2() {
    this.loading = true;
    this.submitted = true;
    this.p.patientIdentifier = this.form.value.mpatientIdentifier;
    this.p.lastName = this.form.value.mlastName;
    this.p.firstName = this.form.value.mfirstName;
    this.p.doB = new Date(this.form.value.mdoB).getTime() / 1000;
    this.p.sex = this.form.value.msex;
    this.p.gender = 2;
    this.p.tz = 4;
    this.tel = [];

    this.tel.push(
      { phone: this.form.value.mTelephone1, phoneType: 1 },
      { phone: this.form.value.mTelephone2, phoneType: 2 }
    );

    this.ident = [];
    this.ident.push(
      {
        identifier: this.form.value.mpatientIdentifier,
        identifierType: "HINUMBER",
        authority: "NEST",
      },
      { identifier: "QEYR8", identifierType: "NATIONVALID", authority: "GOV" }
    );
    this.p.identifiers = [];
    this.p.identifiers = this.ident;

    // tslint:disable-next-line: max-line-length
    this.adr = [];
    this.adr.push({
      address: this.form.value.maddress,
      street: this.form.value.mrue,
      city: this.form.value.mville === null ? 0 : this.form.value.mville,
      state: this.form.value.mregion === null ? 0 : this.form.value.mregion,
      country: this.form.value.mpays === null ? 0 : this.form.value.mpays,
      addressType: 4,
    });

    this.p.addresses = this.adr;
    this.p.phones = [];
    this.p.phones = this.tel;
    this.p.nationality =
      this.form.value.mnationalite === null ? 0 : this.form.value.mnationalite;

    if (this.form.invalid) {
      return;
    }
    this.patientService.update(this.id, this.p).subscribe((res) => {
      if (res.code === 200) {
        this.rMessage = "bUpdate";
        $("#formUpdatePatient").modal("hide");
        $("#formModifPatientConfirm").modal("show");
        this.refreshTableAll();
      } else {
        this.rMessage = "bErrorUpdate";
      }
    });
  }

  get f() {
    return this.addForm.controls;
  }

  get pre(): { [key: string]: AbstractControl } {
    return this.addFormPrenatal.controls;
  }

  get frm() {
    return this.form.controls;
  }

  get sfrm() {
    return this.searchForm.controls;
  }

  annuler() {
    this.submitted = false;
    $("#formSearchNotCriteria").modal("hide");
    this.searchForm.reset();
    this.refreshTableAll();
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
            this.filteredPatients = [];
            //this.filteredPatients = null;
          }
        }
      );
    }
  }

  resetForm() {
    this.submitted = false;
    this.rMessage = "";
    this.addForm.reset();
  }
  onSubmit() {
    this.loading = true;
    this.submitted = true;
    this.rMessage = "";
    this.results.code = "";
    this.results.message = "rien";
    this.results.result = null;
    this.p.lastName = this.addForm.value.lastName;
    this.p.firstName = this.addForm.value.firstName;
    this.p.doB = new Date(this.addForm.value.doB).getTime() / 1000;
    this.ident = [];
    this.ident.push(
      {
        identifier: this.addForm.value.patientIdentifier,
        identifierType: "HINUMBER",
        authority: "NEST",
      },
      { identifier: "QEYR8", identifierType: "NATIONVALID", authority: "GOV" }
    );

    
    this.p.sex = this.addForm.value.sex;
    this.p.gender = this.addForm.value.sex;
    this.p.tz = new Date().getTimezoneOffset() / -60;
    this.tel = [];
    this.tel.push(
      { phone: this.addForm.value.Telephone1, phoneType: 1 },
      { phone: this.addForm.value.Telephone2, phoneType: 2 }
    );

    // tslint:disable-next-line: max-line-length
    this.adr = [];

    this.adr.push({
      address: this.addForm.value.address,
      street: this.addForm.value.rue,
      city: this.addForm.value.ville === null ? 0 : this.addForm.value.ville,
      state: this.addForm.value.region === null ? 0 : this.addForm.value.region,
      country: this.addForm.value.pays === null ? 0 : this.addForm.value.pays,
      addressType: 4,
    });
    this.p.identifiers = this.ident;
    this.p.addresses = this.adr;
    this.p.phones = this.tel;
    this.p.nationality =
      this.addForm.value.nationalite === null
        ? 0
        : this.addForm.value.nationalite;

    if (this.addForm.invalid) {
      return;
    } else {
      this.patientService.createPatient(this.p).subscribe((res) => {
        if (res.code === 201) {
          this.submitted = false;
          this.filteredPatients.push(res.result);
          this.rMessage = "bSave";
          this.addForm.reset();
          $("#formAddPatient").modal("hide");
          this.loaddetails = true;
          this.patient = false;
          //this.SendDetailsId = res.result.id;
          this.router.navigate(["/detailPatient", res.result.id]);
        } else {
          this.rMessage = "bError";
        }
      });
    }
  }

  public Patient() {
    this.partenaire = false;
    this.home = false;
    this.planning = false;
    this.patient = true;
    this.patient = false;
    this.router.navigateByUrl("/patient");
    //console.log()
  }

  mPatientDetails(id) {
    this.loaddetails = true;
    this.patient = false;
    this.SendDetailsId = id;
  }

  onSubmitArchivage(){
   
    this.addOrUpdateArchivage.patchValue({
      annee: +this.addOrUpdateArchivage.value.annee,
      poidsNne1: +this.addOrUpdateArchivage.value.poidsNne1,
      poidsNne2: +this.addOrUpdateArchivage.value.poidsNne2,
      dateFinGrossesse: new Date(this.addOrUpdateArchivage.value.dateFinGrossesse).getTime() / 1000

    })
    this.rMessage="";

    if (this.addOrUpdateArchivage.invalid) {
      return;
    } else {
      this.patientService.doArchivage(this.patientIdChoose,this.prenatalIdChoose,this.addOrUpdateArchivage.getRawValue()).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = " bSaveArchivage";
          let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
          this.addOrUpdateArchivage.reset()
          $("#formArchivage").modal('hide');
         } else {
          this.rMessage = "bErrorArchivage";
        }
      });
    
    }

  }

getDdr(id:string){

  this.patientService.findDossierPrenatal(id).subscribe( p=>{
    this.ddr=p['result'][0].dateDerniereRegle
    this.patientIdChoose=id
    this.prenatalIdChoose=p['result'][0].id
  })
}

}
