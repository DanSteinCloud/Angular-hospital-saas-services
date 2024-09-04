import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PatientService } from "src/app/_services/patient.service";
import { PrisenchargeService } from "src/app/_services/prisencharge.service";
import { AssuranceService } from "src/app/_services/assurance.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SponsorService } from "src/app/_services/sponsor.service";
import { CareGivers } from 'src/app/_models/caregivers';
import { CareGiversService } from 'src/app/_services/caregivers.service';
import {
  PhonesEntity,
  AddressesEntity,
  IdentifiersEntity,
  patient,
} from "src/app/_models/patient";
import { RefdataService } from "src/app/_services/refdata.service";
import { NgSelectConfig } from "@ng-select/ng-select";
import { aRefData } from 'src/app/_models/refdata';
import { forkJoin } from 'rxjs';
import { aInsurance, Insurance } from 'src/app/_models/insurance';
import { PrisenCharge } from 'src/app/_models/prisencharge';
import { DossierPrenatal } from "src/app/_models/dossierprenatal";
declare var $: any;
const ADRESS_TYPE = 4;

@Component({
  selector: "app-patient-detail",
  templateUrl: "./patient-detail.component.html",
  styleUrls: ["./patient-detail.component.css"],
})
export class PatientDetailComponent implements OnInit {
  public assuranceName = "";
  public sponsorName = "";
  loaddetails = false;
  patient = false;
  prise_en_charge = false;
  identifiant: string;
  data: any;
  datapac: any;
  dataprisencharge: any = {};
  @Input()
  SendDetailsId: string;
  id: any;
  location: any;
  bRes: boolean;
  dataAssurance= new Array<Insurance> ();
  addFormPersonneContacter: FormGroup;
  updateForm: FormGroup;
  Prisencharge: any;
  submitted: boolean;
  rMessage: string;
  oPrisenCharge: any = {};
  insurers: any = {};
  sponsors: any = {};
  patients: any = {};
  updateFormPrisenCharge: FormGroup;
  seeFormPrisenCharge: FormGroup;
  dataSponsor: any;
  updateFormPersonneContacter: FormGroup;
  seeFormPersonneContacter: FormGroup;
  pUpdate: any = {};
  spons: any;
  insure: any;
  mstartingDate: Date;
  ocircle: any = {};
  circle: any[] = [];
  relative: any = {};
  tel: Array<PhonesEntity> = [];
  adr: AddressesEntity[] = [];
  addFormPrisenCharge: FormGroup;
  addFormPersonneContacterPrisenCharge: any;
  p: any = {};
  partenaire: boolean;
  home: boolean;
  planning: boolean;
  paiement: boolean;
  AllCityDetails: any[] = [];
  AllSexeDetails: any[] = [];
  AllLinkTypeDetails: any[] = [];
  AllLinkTypeDetail: any[] = [];
  AllCountryDetails: any[] = [];
  AllStateDetails: any[] = [];
  AllNationalityDetails: any[] = [];
  AllDossierPrenataux: any[] = [];
  AllAssuranceListe: any[] = [];
  priseEnChargeCurrentPatient: any[] = [];
  patientIdChoose: string;
  prenatalIdChoose: string;
  ddr:number=0
  onePatient:  patient;
  onePriseEnCharge: PrisenCharge;
  addOrUpdateArchivage :FormGroup;

  private readonly constCity = "CITY";
  private readonly constSexe = "SEX";
  private readonly constLinkType = "LINKTYPE";
  private readonly constCountry = "COUNTRY";
  private readonly constState = "STATE";
  private readonly constNationality = "NATIONALITY";
  bConfirmation: boolean;
  rConfirm: any;
  ident: IdentifiersEntity[] = [];
  priseEnCHargeValider: any;
  PatientId: any;
  PersonCtId: any;
  PatientCircleId: any;
  form: any;
  oPatient: any;
  loading: boolean;
  careGivers: any[] = [];
  dataCareGiversDetails: CareGivers[] = [];
  careGiver: CareGivers;
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
    private patientService: PatientService,
    private prisencharge: PrisenchargeService,
    private assurance: AssuranceService,
    private sponsor: SponsorService,
    private caregivers: CareGiversService,
    private router: Router,
    private refdata: RefdataService,
    private route: ActivatedRoute,
    private config: NgSelectConfig
  ) {
    this.config.notFoundText = "Assurance introuvable";
    this.config.appendTo = "body";
    this.config.bindValue = "value";
  }

  ngOnInit(): void {
    this.submitted = false;
    this.loaddetails = true;
    this.patient = false;
    this.data = {};
    this.dataprisencharge = {};
    this.bRes = false;
    //this.dataAssurance = {};
    this.dataSponsor = {};
    if (localStorage.getItem("token") == null) {
      localStorage.removeItem("token");
      localStorage.removeItem("X_HI_CODE");
      localStorage.removeItem("currentUser");
      this.router.navigate(["/login"]);
    }

    let idPatient=0;
    this.route.params.subscribe((params) => {
      idPatient= params.id;
    });


    const cityPromise = this.refdata.get(this.constCity);
    const sexPromise = this.refdata.get(this.constSexe);
    const countryPromise = this.refdata.get(this.constCountry);
    const statePromise = this.refdata.get(this.constState);
    const linkTypePromise = this.refdata.get(this.constLinkType);
    const nationalityPromise = this.refdata.get(this.constNationality);
    const assurancePromise = this.assurance.get();
    const sponsorPromise = this.sponsor.getAll();
    const patientPromise =this.patientService.find(idPatient);
    const prisenChargePromise =this.prisencharge.find(idPatient);
    
    forkJoin([cityPromise,sexPromise,countryPromise,statePromise,linkTypePromise,nationalityPromise,assurancePromise,sponsorPromise,patientPromise,prisenChargePromise]).subscribe(responses => {
      this.AllCityDetails = Object.assign(new aRefData(), responses[0][0]).refDatas;
      this.AllSexeDetails = Object.assign(new aRefData(), responses[1][0]).refDatas;
      this.AllCountryDetails = Object.assign(new aRefData(), responses[2][0]).refDatas;
      this.AllStateDetails = Object.assign(new aRefData(), responses[3][0]).refDatas;
      this.AllLinkTypeDetails = Object.assign(new aRefData(), responses[4][0]).refDatas;
      this.AllNationalityDetails = Object.assign(new aRefData(), responses[5][0]).refDatas;
      this.dataAssurance =(responses[6]['result']!==null)? Array.from(responses[6].values()):responses[6]['result'];     
      //this.dataSponsor = (responses[7]['result']!==null)?Array.from(responses[7].values()):responses[7]['result'];

      if (responses[8]['code']==200){
        this.data = Object.assign(new patient(),responses[8]['result']);
      }

      if (responses[9]['code']==200){
          this.bRes = true;
          var oPriseEnCharge = Object.entries(Object.assign(new Array<PrisenCharge>(),responses[9]['result']));
          if (oPriseEnCharge!==null){
            this.dataprisencharge= oPriseEnCharge.forEach(([key, value]) =>{
              let s= Object.assign(new PrisenCharge(),value);
              let insuranceName="";
              let sponsorName ="";
              if (this.dataAssurance!=null)
              {
                insuranceName=this.dataAssurance?.find(p=>p.id == s.insurerId).name;
                value["insuranceName"] =insuranceName;
              }

              if (this.dataSponsor!=null)
              {
                sponsorName =this.dataSponsor?.find(p=>p.id == s.sponsorId);
                value["sponsorName"] =sponsorName;
              }
            });
          }
          //this.dataprisencharge = this.onePriseEnCharge;
     }

    

  },
  (error) => {
    throw error;
    alert(JSON.stringify(error.status));
    this.dataprisencharge = [];
    // if (error.error.code === 400) {
    //   alert("iciiii")
    //   this.dataprisencharge = [];
    //   //this.filteredPatients = null;
    // }
  });

    //this.getRolesFromLocalStorage();
    this.getAllSponsor();
    //this.getPrisEnCharge();

    this.addFormPersonneContacter = new FormGroup({
      ctlinkType: new FormControl("", Validators.required),
      ctsexe: new FormControl("", Validators.required),
      ctfirstName: new FormControl("", Validators.required),
      ctlastName: new FormControl("", Validators.required),
      ctdoB: new FormControl(),
      ctTelephone1: new FormControl("", Validators.required),
      ctTelephone2: new FormControl(),
      ctaddress: new FormControl(),
      ctpays: new FormControl(),
      ctregion: new FormControl(),
      ctville: new FormControl(),
      ctrue: new FormControl(),
      ctnationalite: new FormControl(),
    });

    this.updateFormPersonneContacter = new FormGroup({
      mctid: new FormControl(),
      mctlinkType: new FormControl("", Validators.required),
      mctsexe: new FormControl("", Validators.required),
      mctfirstName: new FormControl("", Validators.required),
      mctlastName: new FormControl("", Validators.required),
      mctdoB: new FormControl(),
      mctTelephone1: new FormControl("", Validators.required),
      mctTelephone2: new FormControl(),
      mctaddress: new FormControl(),
      mctpays: new FormControl(),
      mctregion: new FormControl(),
      mctville: new FormControl(),
      mctrue: new FormControl(),
      mctnationalite: new FormControl(),
    });

    //voir les infos
    this.seeFormPersonneContacter = new FormGroup({
      sctid: new FormControl(),
      sctlinkType: new FormControl(""),
      sctsexe: new FormControl(""),
      sctfirstName: new FormControl(""),
      sctlastName: new FormControl(""),
      sctdoB: new FormControl(""),
      sctTelephone1: new FormControl(""),
      sctTelephone2: new FormControl(),
      sctaddress: new FormControl(""),
      sctpays: new FormControl(),
      sctregion: new FormControl(),
      sctville: new FormControl(),
      sctrue: new FormControl(),
      sctnationalite: new FormControl(),
    });
    this.addOrUpdateArchivage = new FormGroup({
      accouchement_delivrance: new FormControl(),
      allaitement: new FormControl(),
      hta: new FormControl(),
      dateFinGrossesse: new FormControl(),
      grossesseNormale: new FormControl(),
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


    this.addFormPrisenCharge = new FormGroup({
      insurerId: new FormControl("", Validators.required),
      sponsorId: new FormControl(),
      startingDate: new FormControl("", Validators.required),
      endingDate: new FormControl("", Validators.required),
      insuranceNumber: new FormControl(),
      cardNumber: new FormControl(),
      coverateRate: new FormControl("", Validators.required),
      paymentCap: new FormControl(),
    });



    //this.getAllAssurance();

    //personne a contacter


    this.mstartingDate = new Date();

    //voir prise en charge
    this.seeFormPrisenCharge = new FormGroup({
      vid: new FormControl(),
      vinsurerid: new FormControl(),
      vpatientid: new FormControl(),
      vsponsor: new FormControl(),
      vstartingDate: new FormControl(new Date()),
      vendingDate: new FormControl(new Date()),
      vinsuranceNumber: new FormControl(),
      vcardNumber: new FormControl(),
      vcoverateRate: new FormControl(),
      vpaymentCap: new FormControl(),
    });

    this.updateFormPrisenCharge = new FormGroup({
      mid: new FormControl(),
      minsurerid: new FormControl("", Validators.required),
      mpatientid: new FormControl(),
      msponsor: new FormControl(),
      mstartingDate: new FormControl(new Date(), Validators.required),
      mendingDate: new FormControl(new Date(), Validators.required),
      minsuranceNumber: new FormControl(),
      mcardNumber: new FormControl(),
      mcoverateRate: new FormControl("", Validators.required),
      mpaymentCap: new FormControl(),
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
   this.addOrUpdateArchivage.controls['terme'].disable()
  }

  deleteDossierPrenatal(){
    let idPatient=0;
    this.route.params.subscribe((params) => {
      idPatient= params.id;
      this.patientIdChoose=params.id;
    });
    
  this.patientService.deleteDossierPrenatal(this.patientIdChoose,this.prenatalIdChoose).subscribe( p =>{ 
    if(p.code == 200){
       this.loadDossierPrenataux()
       $("#formSuppressionPrenatalDossier").click(function(){
        $("#formSuppressionPrenatalDossier").hide();
    })
    }
  })
}

  loadDossierPrenataux(){
    let idPatient=0;
    this.route.params.subscribe((params) => {
      idPatient= params.id;
      this.patientIdChoose=params.id;
    });   
   
    this.patientService.getAllDossierPrenatals(idPatient).subscribe( p =>{
      this.AllDossierPrenataux =p['result']
      this.ddr=p['result'][0].dateDerniereRegle
      this.prenatalIdChoose=p['result'][0].id

    } )
    this.caregivers.getCareGivers().subscribe( p=>{
      this.dataCareGiversDetails = p['result']
    }); 
    
  }

  loadPriseEnChargeData(){
    this.assurance.get().subscribe( p=>{
      this.AllAssuranceListe=p

    })
    this.route.params.subscribe((params) => {
      this.prisencharge.find(params.id).subscribe( p =>{
        this.priseEnChargeCurrentPatient=p['result']
 
      })
    }); 
   
  }
  cancel() {
    this.router.navigate(["/patient"]);
    this.partenaire = false;
    this.home = false;
    this.planning = false;
    this.patient = true;
    this.paiement = false;
  }
  get frm() {
    return this.form.controls;
  }

  //Retourne le nom de l'assurane à partir de l'id
  getInsurNameFromId(insurer: any) {
    if (insurer != null) {
      this.assurance.getOneAssurance(insurer).subscribe((res: any) => {
        if (res.code == 200) {
          this.assuranceName = res.result.name;
          if (this.assuranceName != "")
            localStorage.setItem("INSURANCE_VALUE", this.assuranceName);
        }
      });
    }

    return this.assuranceName;
  }

  //Retourne le nom du sponsor à partir de l'id
  getSpsorFromId(sponsor: any) {
    this.sponsorName = "";
    if (sponsor != null) {
      this.sponsor.getOneSponsor(sponsor).subscribe((res: any) => {
        if (res.code == 200) {
          this.sponsorName = res.result.name;
        }
      });
    }

    return this.sponsorName;
  }

  showPrisEnCharge() {
    this.submitted = false;
    this.addFormPrisenCharge.reset();
  }

  showPersonneContacter() {
    this.submitted = false;
    this.addFormPersonneContacter.reset();
  }

  private getAllNationality() {
    this.refdata.getRefData(this.constNationality).subscribe((data: any[]) => {
      this.AllNationalityDetails = data["result"][0].refDatas;
    });
  }

  private getAllCity() {
    this.AllCityDetails = null;
    this.refdata.getRefData(this.constCity).subscribe((data: any[]) => {
      this.AllCityDetails = data["result"][0].refDatas;
    });
  }

  private getAllSex() {
    this.AllSexeDetails = null;
    this.refdata.getRefData(this.constSexe).subscribe((data: any[]) => {
      this.AllSexeDetails = data["result"][0].refDatas;
    });
  }

  private getAllLinkType() {
    this.AllLinkTypeDetails = null;
    this.refdata.getRefData(this.constLinkType).subscribe((data: any[]) => {
      console.log(data["result"]);
      this.AllLinkTypeDetails = data["result"][0].refDatas;
    });
  }

  private getAllCountry() {
    this.AllCountryDetails = null;
    this.refdata.getRefData(this.constCountry).subscribe((data: any[]) => {
      this.AllCountryDetails = data["result"][0].refDatas;
    });
  }

  private getAllState() {
    this.AllStateDetails = null;
    this.refdata.getRefData(this.constState).subscribe((data: any[]) => {
      this.AllStateDetails = data["result"][0].refDatas;
    });
  }

  deletePost(id) {
    $("#formPriseEnChargeSuppression").modal("show");
    this.PatientId = this.SendDetailsId;
    this.PatientCircleId = id;
  }

  deletePersonneCt(id) {
    $("#formSuppression").modal("show");
    this.PersonCtId = id;
    this.PatientId = this.SendDetailsId;
  }

  DeletePersonneContacter() {
    this.route.params.subscribe((params) => {
      this.patientService
        .DeleteCircle(params.id, this.PersonCtId)
        .subscribe((res) => {
          if (res.code === 200) {
            this.findOnePatient(params.id);
            $("#formSuppression").modal("hide");
          }
        });
    });
  }
  DeletePriseEnCharge() {
    this.route.params.subscribe((params) => {
      this.patientService
        .deletePriseEnCharge(this.PatientCircleId, params.id)
        .subscribe((res) => {
          if (res.code === 200) {
            this.getPrisEnCharge();
            $("#formPriseEnChargeSuppression").modal("hide");
          }
        });
    });
  }

  private getAllSponsor() {
    this.dataSponsor = null;
    this.submitted = false;
    this.sponsor.getAll().subscribe((res) => {
      if (res["code"] === 200) {
        this.dataSponsor = res["result"];
      }
    });
  }

  private getAllAssurance() {
    this.assurance.getAll().subscribe(
      (res: any) => {
        if (res.code == 200) this.dataAssurance = res.result;

      },
      () => {
        this.dataAssurance = [];
      }
    );
  }

  private findOnePatient(id) {
    this.patientService.find(id).subscribe((res) => {
      if (res.code === 200) {
        this.datapac = res.result.circle;
        this.data = res.result;
      }
    });
  }

  private findPriseEnCharge(idPatient, idPrise) {
    this.patientService.findPriseOne(idPatient, idPrise).subscribe((res) => {
      if (res.code === 200) {
        this.dataprisencharge = res.result;
      }
    });
  }
  public Patient() {
    //this.router.navigateByUrl('/patient');
    this.partenaire = false;
    this.home = false;
    this.planning = false;
    this.patient = true;
    this.loaddetails = false;
    this.router.navigateByUrl("/patient");
    //console.log()
  }

  transform(value: any, ...args: any[]) {
    return this.getInfoFromId(value);
  }
  //Retourne le nom de l'assurane à partir de l'id
  getInfoFromId(insuranceList: any) {
    let s: any;
    let assuranceNames: string = "";
    // if (insuranceList !== null) {
    //   if (Array.isArray(this.dataAssurance)) {
    //     s = this.dataAssurance.filter((item) => item.id === insuranceList)[0];
    //     if (s !== null) assuranceNames += s.name;
    //   }
    // }

    return assuranceNames;
  }

  private getPrisEnCharge() {
    this.dataprisencharge = [];
    this.route.params.subscribe((params) => {
      this.prisencharge.find(params.id).subscribe(
        (res) => {
          if (res.code === 200) {
            this.bRes = true;
            this.dataprisencharge = res.result;
          }
          if (res.code == 400) {
            this.dataprisencharge = null;
            alert("code 4000");
          }
        },
        (error) => {
          // if (error.error.code === 400) {
          this.dataprisencharge = null;
          alert("code 400222");
          // }
        }
      );
    });
  }

  voirPrisenCharge(id) {

    //this.seeFormPrisenCharge.reset();
    this.route.params.subscribe((params) => {
      this.patientService.findPriseOne(params.id, id).subscribe((data: any) => {
        this.Prisencharge = data.result;
        this.seeFormPrisenCharge.patchValue({
          vid: data.result.id,
          vinsurerid: this.dataAssurance.find(p=>p.id===data.result.insurerId).name,
          vpatientid: data.result.patientId,
          vsponsor: this.dataSponsor.find(p=>p.id == data.result.sponsorId),
          vstartingDate: new Date(data.result.startingDate * 1000)
            .toISOString()
            .substring(0, 10),
            vendingDate: new Date(data.result.endingDate * 1000)
            .toISOString()
            .substring(0, 10),
            vinsuranceNumber: data.result.insuranceNumber,
            vcardNumber: data.result.cardNumber,
            vcoverateRate: data.result.coverateRate,
            vpaymentCap: data.result.paymentCap,
          });
      });
    });
    console.log( " FORM DATA :"+JSON.stringify(this.seeFormPrisenCharge.value))
  }

  //modification d'une prise en charge
  modifierPrisenCharge(id) {
    this.updateFormPrisenCharge.reset();
    this.route.params.subscribe((params) => {
      this.patientService.findPriseOne(params.id, id).subscribe((data: any) => {
        this.Prisencharge = data.result;
        this.updateFormPrisenCharge.setValue({
          mid: data.result.id,
          mpatientid: data.result.patientId,
          minsurerid: data.result.insurerId,
          // minsurer: data.result.insurerId,
          msponsor: data.result.sponsorId,
          mstartingDate: new Date(data.result.startingDate * 1000)
            .toISOString()
            .substring(0, 10),
          mendingDate: new Date(data.result.endingDate * 1000)
            .toISOString()
            .substring(0, 10),
          minsuranceNumber: data.result.insuranceNumber,
          mcardNumber: data.result.cardNumber,
          mcoverateRate: data.result.coverateRate,
          mpaymentCap: data.result.paymentCap,
        });
      });
    });
  }

  ConfirmationPriseEnCharge() {
    // this.rConfirm=confirmation;
    // return this.rConfirm;

    if (this.addFormPrisenCharge.valid) {
      return 1;
    }
    $("#confirmationPEC").modal("hide");
    return;
  }

  EnregistrementPriseEnCharge(pPrise) {
    this.submitted = true;
    this.prisencharge.create(pPrise).subscribe((res) => {
      if (res.code === 201) {
        this.dataprisencharge = res.result;
        this.rMessage = "bSave";
        this.addFormPrisenCharge.reset();
        $("#confirmationPEC").modal("hide");
      } else {
        this.rMessage = "bError";
      }
    });
  }

  //Ajouter une prise en charge
  onSubmitAddPrisenCharge() {
    this.submitted = true;
    this.rMessage = "";
    let startDate = new Date(this.addFormPrisenCharge.value.startingDate);
    let endDate = new Date(this.addFormPrisenCharge.value.endingDate);
    let todayDate = new Date().getTime(); //new Date().getTime()

    //Initialize object
    this.oPrisenCharge.insuranceNumber = this.addFormPrisenCharge.value.insuranceNumber;
    this.oPrisenCharge.cardNumber = this.addFormPrisenCharge.value.cardNumber;
    this.oPrisenCharge.startingDate =
      new Date(this.addFormPrisenCharge.value.startingDate).getTime() / 1000;
    this.oPrisenCharge.endingDate =
      new Date(this.addFormPrisenCharge.value.endingDate).getTime() / 1000;
    this.oPrisenCharge.coverateRate = this.addFormPrisenCharge.value.coverateRate;
    this.oPrisenCharge.paymentCap = this.addFormPrisenCharge.value.paymentCap;
    this.oPrisenCharge.insurerId = this.addFormPrisenCharge.value.insurerId;
    this.oPrisenCharge.sponsorId = this.addFormPrisenCharge.value.sponsorId;
    let bRes = startDate.getTime();
    if (this.addFormPrisenCharge.invalid) {
      return;
    } else {
      this.rMessage = "";
      if (endDate > startDate) {
        this.route.params.subscribe((params) => {
          this.oPrisenCharge.patientId = params.id;
          this.prisencharge.create(this.oPrisenCharge).subscribe((res) => {
            if (res.code === 201) {
              this.submitted = false;
              this.rMessage = "bAddPriseEnCharge";
              this.addFormPrisenCharge.reset();
              $("#formAddPriseEnCharge").modal("hide");
              $("#formAddPECConfirm").modal("show");
              this.getPrisEnCharge();
              this.loadPriseEnChargeData()
            } else {
              this.rMessage = "bError";
            }
          });
        });
      } else if (startDate.getTime() < todayDate) {
        this.rMessage = "datetoday";
        this.submitted = true;
      }
      else if (endDate.getTime() > todayDate) {
        this.rMessage = "datefin";
        this.submitted = true;
      }
      else {
        this.submitted = true;
        this.rMessage = "datecomparaison";
      }
    }
  }

  toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }

  onSubmitUpdatePrisenCharge() {
    this.rMessage = "";
    this.submitted = true;
    this.loading = true;
    let startDate = new Date(this.updateFormPrisenCharge.value.mstartingDate);
    let endDate = new Date(this.updateFormPrisenCharge.value.mendingDate);
    this.pUpdate.cardNumber = this.updateFormPrisenCharge.value.mcardNumber;
    this.pUpdate.coverateRate = this.updateFormPrisenCharge.value.mcoverateRate;
    this.pUpdate.endingDate =
      new Date(this.updateFormPrisenCharge.value.mendingDate).getTime() / 1000;
    this.pUpdate.id = this.updateFormPrisenCharge.value.mid;
    this.pUpdate.insuranceNumber = this.updateFormPrisenCharge.value.minsuranceNumber;
    this.pUpdate.insurerId = this.updateFormPrisenCharge.value.minsurerid;
    this.pUpdate.patientId = this.updateFormPrisenCharge.value.mpatientid;
    this.pUpdate.paymentCap = this.updateFormPrisenCharge.value.mpaymentCap;
    this.pUpdate.sponsorId = this.updateFormPrisenCharge.value.msponsor;
    this.pUpdate.startingDate =
      new Date(this.updateFormPrisenCharge.value.mstartingDate).getTime() /
      1000;

    let todayDate = new Date().getTime();

    // alert(JSON.stringify(this.updateFormPrisenCharge));
    if (this.updateFormPrisenCharge.invalid) {
      return;
    } else {
      this.rMessage = "";
      if (endDate > startDate) {
        this.route.params.subscribe((params) => {
          this.prisencharge
            .update(params.id, this.pUpdate)
            .subscribe((data) => {
              if (data.code === 200) {
                this.submitted = false;
                this.submitted = false;
                this.rMessage = "bUpdate";
                this.dataprisencharge = [];
                $("#FrmupdateFormPrisenCharge").modal("hide");
                $("#formModifPECConfirm").modal("show");
                this.getPrisEnCharge();
                this.loadPriseEnChargeData()
              } else {
                this.rMessage = "bErrorUpdate";
              }
            });
        });
      }
      else if (startDate.getTime() < todayDate) {
        this.rMessage = "datetoday2";
        this.submitted = true;
      }
      else if (endDate.getTime() > todayDate) {
        this.rMessage = "datefin2";
        this.submitted = true;
      }
      else {
        this.submitted = true;
        this.rMessage = "datecomparaison2";
      }
    }
  }

  //Ajouter une personne à contacter
  onSubmitAddPersonneContacter() {
    this.loading = true;
    this.submitted = true;
    this.rMessage = "";
    this.relative.lastName = this.addFormPersonneContacter.value.ctlastName;
    this.relative.firstName = this.addFormPersonneContacter.value.ctfirstName;
    this.relative.doB =
      new Date(this.addFormPersonneContacter.value.ctdoB).getTime() / 1000;

    this.relative.nationality = this.addFormPersonneContacter.value.ctnationalite;
    this.relative.sex = this.addFormPersonneContacter.value.ctsexe;
    this.relative.gender = this.addFormPersonneContacter.value.ctsexe;
    this.relative.tz = new Date().getTimezoneOffset() / -60;
    this.tel = [];
    this.tel.push(
      { phone: this.addFormPersonneContacter.value.ctTelephone1, phoneType: 1 },
      { phone: this.addFormPersonneContacter.value.ctTelephone2, phoneType: 2 }
    );

    // tslint:disable-next-line: max-line-length
    this.adr = [];
    this.adr.push({
      address: this.addFormPersonneContacter.value.ctaddress,
      street: this.addFormPersonneContacter.value.ctrue,
      city: this.addFormPersonneContacter.value.ctville,
      state: this.addFormPersonneContacter.value.ctregion,
      country: this.addFormPersonneContacter.value.ctpays,
      addressType: ADRESS_TYPE,
    });
    this.relative.addresses = this.adr;
    this.relative.phones = this.tel;
    this.relative.linkType = this.addFormPersonneContacter.value.ctlinkType;
    this.relative.nationality = this.addFormPersonneContacter.value.ctnationalite;

    if (this.addFormPersonneContacter.invalid) {
      return;
    } else {
      this.route.params.subscribe((params) => {
        this.patientService
          .CreateCircle(params.id, this.relative)
          .subscribe((res) => {
            if (res.code === 200) {
              this.submitted = false;
              this.rMessage = "bUpdate";
              $("#formAddContactPatient").modal("hide");
              $("#formAddCircleConfirm").modal("show");
              this.addFormPersonneContacter.reset();
              this.findOnePatient(params.id);
            } else {
              this.rMessage = "bErrorUpdate";
            }
          });
      });
    }
  }

  //Voir les détails d'une personne à contacter
  voirPersonneContacter(id) {
    this.submitted = false;
    // this.seeFormPersonneContacter.reset();

    this.route.params.subscribe((params) => {
      this.patientService.find(params.id).subscribe((res) => {
        if (res.code === 200) {
          this.datapac = res.result.circle.find((x) => x.id === id);
          this.seeFormPersonneContacter.setValue({
            sctid: this.datapac.id,
            sctlinkType: this.datapac.linkType,
            sctsexe: this.datapac.sex,
            sctfirstName: this.datapac.firstName,
            sctlastName: this.datapac.lastName,
            sctdoB: (this.datapac.doB) > 0 ? new Date(this.datapac.doB * 1000).toISOString().substring(0, 10) : null,
            sctTelephone1:
              this.datapac.phones.length > 0
                ? this.datapac.phones[0].phone
                : "",
            sctTelephone2:
              this.datapac.phones.length > 0
                ? this.datapac.phones[1].phone
                : "",
            sctaddress:
              this.datapac.addresses.length > 0
                ? this.datapac.addresses[0].address
                : "",
            sctpays:
              this.datapac.addresses.length > 0
                ? this.datapac.addresses[0].country
                : "",
            sctregion:
              this.datapac.addresses.length > 0
                ? this.datapac.addresses[0].state
                : "",
            sctville:
              this.datapac.addresses.length > 0
                ? this.datapac.addresses[0].city
                : "",
            sctrue:
              this.datapac.addresses.length > 0
                ? this.datapac.addresses[0].street
                : "",
            sctnationalite: this.datapac.nationality,
          });
        }
      });
    });
  }
  //Recuperer une personne à contacter

  getPersonneContacter(id) {
    this.submitted = false;
    this.updateFormPersonneContacter.reset();

    this.route.params.subscribe((params) => {
      this.patientService.find(params.id).subscribe((res) => {
        if (res.code === 200) {
          this.datapac = res.result.circle.find((x) => x.id === id);
          this.updateFormPersonneContacter.setValue({
            mctid: this.datapac.id,
            mctlinkType: this.datapac.linkType,
            mctsexe: this.datapac.sex,
            mctfirstName: this.datapac.firstName,
            mctlastName: this.datapac.lastName,
            mctdoB: (this.datapac.doB) > 0 ? new Date(this.datapac.doB * 1000).toISOString().substring(0, 10) : null,
            mctTelephone1:
              this.datapac.phones.length > 0
                ? this.datapac.phones[0].phone
                : "",
            mctTelephone2:
              this.datapac.phones.length > 0
                ? this.datapac.phones[1].phone
                : "",
            mctaddress:
              this.datapac.addresses.length > 0
                ? this.datapac.addresses[0].address
                : "",
            mctpays:
              this.datapac.addresses.length > 0
                ? this.datapac.addresses[0].country
                : "",
            mctregion:
              this.datapac.addresses.length > 0
                ? this.datapac.addresses[0].state
                : "",
            mctville:
              this.datapac.addresses.length > 0
                ? this.datapac.addresses[0].city
                : "",
            mctrue:
              this.datapac.addresses.length > 0
                ? this.datapac.addresses[0].street
                : "",
            mctnationalite: this.datapac.nationality,
          });
        }
      });
    });
  }
  //fin de recuperation de personne a contacter

  //Modifier une personne à contacter
  onSubmitUpdatePersonneContacter() {
    this.submitted = true;
    this.loading = true;
    this.p.patientIdentifier = this.updateFormPersonneContacter.value.mctpatientIdentifier;
    this.p.lastName = this.updateFormPersonneContacter.value.mctlastName;
    this.p.firstName = this.updateFormPersonneContacter.value.mctfirstName;
    this.p.doB =
      new Date(this.updateFormPersonneContacter.value.mctdoB).getTime() / 1000;
    this.p.sex = this.updateFormPersonneContacter.value.mctsexe;
    this.p.gender = 2;
    this.p.tz = 4;
    this.tel = [];
    this.p.linkType = this.updateFormPersonneContacter.value.mctlinkType;

    this.tel.push(
      {
        phone: this.updateFormPersonneContacter.value.mctTelephone1,
        phoneType: 1,
      },
      {
        phone: this.updateFormPersonneContacter.value.mctTelephone2,
        phoneType: 2,
      }
    );

    // tslint:disable-next-line: max-line-length
    this.adr = [];
    this.adr.push({
      address: this.updateFormPersonneContacter.value.mctaddress,
      street: this.updateFormPersonneContacter.value.mctrue,
      city: this.updateFormPersonneContacter.value.mctville,
      state: this.updateFormPersonneContacter.value.mctregion,
      country: this.updateFormPersonneContacter.value.mctpays,
      addressType: 4,
    });

    this.p.addresses = this.adr;
    this.p.phones = [];
    this.p.phones = this.tel;
    this.p.nationality = this.updateFormPersonneContacter.value.mctnationalite;

    if (this.updateFormPersonneContacter.invalid) {
      return;
    } else {
      this.route.params.subscribe((params) => {
        this.patientService
          .UpdateCircle(
            params.id,
            this.updateFormPersonneContacter.value.mctid,
            this.p
          )
          .subscribe((res) => {
            if (res.code === 200) {
              this.submitted = false;
              this.rMessage = "bUpdate";
              this.updateFormPersonneContacter.reset();
              $("#formUpdateCirclePatient").modal("hide");
              $("#formModifCircleConfirm").modal("show");
              this.findOnePatient(params.id);
            } else {
              this.rMessage = "bErrorUpdate";
            }
          });
      });
    }
  }

  get fpec() {
    return this.addFormPrisenCharge.controls;
  }
  get fpac() {
    return this.addFormPersonneContacter.controls;
  }

  get mfpec() {
    return this.updateFormPrisenCharge.controls;
  }
  get mfpac() {
    return this.updateFormPersonneContacter.controls;
  }

  mDetailsPriseCharge() {
    this.loaddetails = false;
    this.patient = false;
    this.prise_en_charge = true;
    //this.router.navigate(['patient-detail', {queryParams:{ id : id }}]);
  }

  dislayDetailsPatient(event) {}
  clicRetour() {
    this.patient = true;
    this.loaddetails = false;
  }

  goBack() {
    //this.location.back();
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

  onSubmit2() {
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
      city: this.form.value.mville,
      state: this.form.value.mregion,
      country: this.form.value.mpays,
      addressType: 4,
    });

    this.p.addresses = this.adr;
    this.p.phones = [];
    this.p.phones = this.tel;
    this.p.nationality = this.form.value.mnationalite;

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

  refreshTableAll() {
    this.route.params.subscribe((params) => {
      this.findOnePatient(params.id);
    });
  }

  public readLocalStorageValue(key) {
    let value = localStorage.getItem(key);
    if (value == undefined) {
      value == "";
    }
    return value;
  }
  
getPraticien(id:string){
  let praticien = this.dataCareGiversDetails.filter(p=>p.id ==id)[0].firstName +" "+this.dataCareGiversDetails.filter(p=>p.id ==id)[0].lastName
  return praticien
}
  private getAllLocalStorage(keyinfos) {
    return Object.keys(localStorage).reduce((obj, k) => {
      return { ...obj, [k]: localStorage.getItem(k) };
    }, {});
  }
onDisabledAllButtonDetailPrenatal(id){
  localStorage.setItem('disabledGeneral','disabled');
  localStorage.setItem('dossierPrenatalAvoir',id);

}

onArchivedPrenatalOnPatientDetailListe(id){
  localStorage.setItem('archivedFromPatientDetailsListe',id);
}

onSubmitArchivage(){
  let idPrenatalArchived =localStorage.getItem('archivedFromPatientDetailsListe')
  this.addOrUpdateArchivage.patchValue({
    annee: +this.addOrUpdateArchivage.value.annee,
    poidsNne1: +this.addOrUpdateArchivage.value.poidsNne1,
    poidsNne2: +this.addOrUpdateArchivage.value.poidsNne2,
    dateFinGrossesse: +new Date(this.addOrUpdateArchivage.value.dateFinGrossesse).getTime() / 1000
  })
  this.rMessage="";

  if (this.addOrUpdateArchivage.invalid) {
    return;
  } else {
    this.patientService.doArchivage(this.patientIdChoose,idPrenatalArchived,this.addOrUpdateArchivage.getRawValue()).subscribe((data) => {
      if (data.code === 200) {
        this.submitted = false;
        localStorage.removeItem('archivedFromPatientDetailsListe');
        this.rMessage = " bUpdateArchivage";
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



 
   
}
