import { Component, OnInit, Input,Output,EventEmitter ,ɵCodegenComponentFactoryResolver } from '@angular/core';
import { PatientService } from 'src/app/_services/patient.service';
import { PrisenchargeService } from 'src/app/_services/prisencharge.service';
import { AssuranceService } from 'src/app/_services/assurance.service';
import { SponsorService } from 'src/app/_services/sponsor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RefdataService } from 'src/app/_services/refdata.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { NgbModal, ModalDismissReasons, NgbAccordion, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, AbstractControl } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { DossierPrenatal } from 'src/app/_models/dossierprenatal';
import { SuiviMedical } from 'src/app/_models/suivimedical';
import { Grossesse } from 'src/app/_models/grossesse';
import { Medecins } from 'src/app/_models/medecins';
import { Constant, Maladies } from 'src/app/_models/Constant';
import { aRefData } from 'src/app/_models/refdata';
import { antecedentFamiliaux, antecedentConjoint, antecedentMedicauxMere, antecedentChirurgieMere, antecedentGynecologique, antecedentObstetricaux } from 'src/app/_models/antecedent';
import { patient } from 'src/app/_models/patient';
import { data } from 'jquery';
import { CareGivers } from 'src/app/_models/caregivers';
import { CareGiversService } from 'src/app/_services/caregivers.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';
declare var $: any;

@Component({
  selector: 'app-prenataldetails',
  templateUrl: './prenataldetails.component.html',
  styleUrls: ['./prenataldetails.component.css']
})
export class PrenataldetailsComponent implements OnInit {
  items: any[] = [
    { id: 0, labelle: 'groupe sanguin' },
    { id: 1, labelle: 'Rhésus' },
    { id: 2, labelle: 'RAI(si rhésus négatif)' },
    { id: 3, labelle: 'si RAI+titration' },
    { id: 4, labelle: 'TOXO' },
    { id: 5, labelle: 'ToIgM' },
    { id: 6, labelle: 'ToIgG' },
    { id: 7, labelle: 'RUBEOLE' },
    { id: 8, labelle: 'IgM' },
    { id: 9, labelle: 'IgG' },
    { id: 10, labelle: 'TPHA/VDRL' },
    { id: 11, labelle: 'TPHA' },
    { id: 12, labelle: 'VDRL' },
    { id: 13, labelle: 'HIV' },
    { id: 14, labelle: 'Hépatite C (Ac HCV)' },
    { id: 15, labelle: 'Hépatite B (Ag HbS)' },
    { id: 16, labelle: 'Test Emmel' },
    { id: 17, labelle: 'Electrophorèse Hg' },
    { id: 18, labelle: 'HbA' },
    { id: 19, labelle: 'HbF' },
    { id: 20, labelle: 'HbB' },
    { id: 21, labelle: 'NFS' },
    { id: 22, labelle: 'HB' },
    { id: 23, labelle: 'plaquettes' },
    { id: 24, labelle: 'TP/TCA/Fibrinogène' },
    { id: 25, labelle: 'Glycémie à jeun' },
    { id: 26, labelle: 'dépistage Diabète gestationnel' },
    { id: 27, labelle: "osulivan" },
    { id: 28, labelle: 'T1' },
    { id: 29, labelle: 'T2' },
    { id: 30, labelle: 'hbs' }
  ];
 

  selected: number = 1;
  readonly echographie_1 ="Echographie1";
  readonly echographie_2 ="Echographie2";
  readonly echographie_3 ="Echographie3";
  readonly echographie ="Echographie";
  readonly echographie_autre ="EchographieAutre";

  readonly consultation_1 ="Consultation1";
  readonly consultation_2 ="Consultation2";
  readonly consultation_3 ="Consultation3";
  readonly consultation_4 ="Consultation4";
  readonly consultation_5 ="Consultation5";
  readonly consultation_6 ="Consultation6";
  readonly consultation_7 ="Consultation7";
  readonly consultation_8 ="Consultation8";
  readonly staff ="staff";
  submitted: boolean;
  patient: boolean;
  loading: boolean = false;
  loaddetailprenatal: boolean;
  closeResult: string;
  termeAuto:number=0;
  updateFormPrenatal2: FormGroup;
  updateFormPrenatal:FormGroup;
  addorUpdateSuiviMedical:FormGroup;
  addOrUpdateGrossesseForm: FormGroup;
  addOrUpdateAntecedentConjointForm: FormGroup;
  addOrUpdateAntecedentFamiliauxForm: FormGroup;
  addOrUpdateAntecedentMedMereForm : FormGroup;
  addOrUpdateAntecedentMereChirurgicauxForm: FormGroup;
  addOrUpdateAntecedentObstetricals :FormGroup;
  addOrUpdateAntecedentGynecologique : FormGroup;
  addOrUpdateObstetrical: FormGroup;

  addOrUpdateEchographie1: FormGroup;
  loadingEchographie1:boolean=false;
  updateEchographie1:boolean=false;

  addOrUpdateBilan: FormGroup;
  loadingBilan:boolean=false;
  updateBilan:boolean=false;

  addOrUpdateEchographie2: FormGroup;
  loadingEchographie2:boolean=false;
  updateEchographie2:boolean=false;

  addOrUpdateEchographie3: FormGroup;
  loadingEchographie3:boolean=false;
  updateEchographie3:boolean=false;
  activedSaveBilanButton:boolean=true;

  addOrUpdateEchographie: FormGroup;
  loadingEchographie:boolean=false;
  updateEchographie:boolean=false;

  addOrUpdateEchographieAutre: FormGroup;
  loadingEchographieAutre:boolean=false;
  updateEchographieAutre:boolean=false;

  addOrUpdateConsultation8: FormGroup;
  loadingConsultation8:boolean=false;
  updateConsultation8:boolean=false;

  addOrUpdateConsultation1: FormGroup;
  loadingConsultation1:boolean=false;
  updateConsultation1:boolean=false;

  addOrUpdateConsultation2: FormGroup;
  loadingConsultation2:boolean=false;
  updateConsultation2:boolean=false;

  addOrUpdateConsultation3: FormGroup;
  loadingConsultation3:boolean=false;
  updateConsultation3:boolean=false;

  addOrUpdateConsultation4: FormGroup;
  loadingConsultation4:boolean=false;
  updateConsultation4:boolean=false;

  addOrUpdateConsultation5: FormGroup;
  loadingConsultation5:boolean=false;
  updateConsultation5:boolean=false;

  addOrUpdateConsultation6: FormGroup;
  loadingConsultation6:boolean=false;
  updateConsultation6:boolean=false;

  addOrUpdateConsultation7: FormGroup;
  loadingConsultation7:boolean=false;
  updateConsultation7:boolean=false;

  addOrUpdateStaff: FormGroup;
  loadingStaff:boolean=false;
  updateStaff:boolean=false;

  rMessage: string;
  click : boolean = false;
  validerTetanos : boolean = false;
  validerRhophylac : boolean = false;
  validerTpi : boolean = false;
  validerBilan : boolean = false;

  disabled: string;
  disabledGeneral: string;
  is_edit : boolean = true;
  _isDisabled: boolean;
  AllNationalite: any[] = [];
  AllNationalites: any[]=[];
  lstObstetricaux:any[]=[];
  listeEchographies:any[];
  careGivers: any[] = [];
  dataCareGiversDetails: CareGivers[] = [];
  myLines: any[] = [];
  myLinesTempo: any[] = [];
  myRhophylacs: any[] = [];
  myRhophylacTempo: any[] = [];
  aMaladie: any[] = [];
  myTpis: any[] = [];
  myTpisTempo: any[] = [];
  myTetanosIdTempo:number=-1;
  myRhophylacIdTempo:number=-1;
  myTpiIdTempo:number=-1;
  numberConsultationChoose:number=0;
   termePrevu:any;
  myTetanosNombreLimit:boolean=false;


  careGiver: CareGivers;

  dossierId: string;
  patientId: any;

  allergies =false;
  hyperTension=false;
  cardiopathie =false;
  insuffisanceRenale =false;
  asthme =false;
  tuberculose=false;
  hepatite=false;
  diabete=false;
  drepanocytose=false;
  arv=false;
  anemie =false;
  autres =false;
  checkbox: boolean;

  autreGyneco =false;
  infertilite =false;
  contraception = false;
  patientInfos:   patient;
  dossier:DossierPrenatal;
  modifierFormPrenatal: FormGroup;

  private readonly constCity = "CITY";
  private readonly constSexe = "SEX";
  private readonly constLinkType = "LINKTYPE";
  private readonly constCountry = "COUNTRY";
  private readonly constState = "STATE";
  private readonly constNationality = "NATIONALITY";
  AllCityDetails: any[] = [];
  AllSexeDetails: any[] = [];
  AllLinkTypeDetails: any[] = [];
  AllLinkTypeDetail: any[] = [];
  AllCountryDetails: any[] = [];
  AllStateDetails: any[] = [];
  AllNationalityDetails: any[] = [];
  createTetanos: FormGroup;
  updateTetanos: FormGroup;
  tetanosIndex: number;
  createRhophylac: FormGroup;
  updateRhophylac: FormGroup;
  rhophylacIndex: number;
 
  createTpi: FormGroup;
  updateTpi: FormGroup;
  tpiIndex: number;
  idBilan:number=0;
  submittedTetanos: boolean=false;
  submittedTpi: boolean=false;
  submittedRhophylac: boolean=false;
  myTpiNombreLimit: boolean=false;
  myRhophylacNombreLimit: boolean;
  ddr:number=0;
  dateNaissance:number=0;
  idSelected:String="-1";
  typeVaccinationChoisi:number=-1;
  confirmationModification:number=-1;

  inputValue:String=""
  inputValueTerme:String=""
  placeholder :String="";
  praticienName:String="";  
  currentValue:String = "";

  getValue(id:number,event: Event): String {  
    console.log(' DDR :'+this.ddr)
    console.log(' DATE :'+new Date((event.target as HTMLInputElement).value).getTime()/1000)

    let X = Math.trunc((new Date((event.target as HTMLInputElement).value).getTime()/1000 - this.ddr)/86400/7)  ;
    let Y = ((new Date((event.target as HTMLInputElement).value).getTime()/1000 - this.ddr)/86400) % 7 ;
    console.log(" DATE "+new Date((event.target as HTMLInputElement).value).getTime()/1000)
    console.log(" DDR  "+this.ddr)
    console.log("DATE- DDR  :"+(new Date((event.target as HTMLInputElement).value).getTime()/1000 - this.ddr))
    console.log("((DATE- DDR)/86400)%7  :"+(((new Date((event.target as HTMLInputElement).value).getTime()/1000 - this.ddr))/86400)%7)
  
    let terme = X +' SA + ' + Y + ' jours' ;
    this.placeholder=this.inputValue =terme;

    
    switch(id){
      case 1:
        this.createRhophylac.patchValue({
          terme:this.placeholder
        })
          break;
      case 2:
        this.createTpi.patchValue({
          terme:this.placeholder
        })
          break; 
      case 3:
        this.addOrUpdateEchographie1.patchValue({
            terme:this.placeholder
        })
        break;
      case 4:
        this.addOrUpdateEchographie2.patchValue({
          terme:this.placeholder
         })
         break; 
      case 5:
        this.addOrUpdateEchographie3.patchValue({
          terme:this.placeholder
        })
        break;
      case 6:
        this.addOrUpdateEchographie.patchValue({
         terme:this.placeholder
        })
        break;
      case 7:
        this.addOrUpdateEchographieAutre.patchValue({
        terme:this.placeholder
        })
        break; 

        case 8:
          this.updateRhophylac.patchValue({
          terme:this.placeholder
          })
          break; 

        case 9:
           this.updateTpi.patchValue({
           terme:this.placeholder
           })
           break;                                     
    }   
     return terme;
  }
  getCheckboxVaccAntComplete(event: Event) {
    let vaccAntComplete = document.getElementById('vaccAntComplete') as HTMLInputElement
    let data ={
      vaccAntComplete:vaccAntComplete.checked
    }
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.patientService.updateDossierPrenatal(this.getPatientId(),idDosserPrenatal,data).subscribe((data) => {
      if (data.code === 200) {
        this.VaccinationLoad()
      } else {
        this.rMessage = "bErrorUpdate";
      }
    });
  }
  

  getValueTerme(id:number,event: Event): String {  
    let X = Math.trunc((new Date((event.target as HTMLInputElement).value).getTime()/1000 - this.ddr)/86400/7)  ;
    let Y = ((new Date((event.target as HTMLInputElement).value).getTime()/1000 - this.ddr)/86400) % 7 ;
    let terme = X +' SA + ' + Y + ' jours' ;
    this.placeholder=this.inputValueTerme =terme;
    switch(id){
      case 1:
        this.addOrUpdateConsultation1.patchValue({
          termeSA:this.placeholder
        })
          break;
      case 2:
        this.addOrUpdateConsultation2.patchValue({
          termeSA:this.placeholder
        })
          break; 
      case 3:
        this.addOrUpdateConsultation3.patchValue({
          termeSA:this.placeholder
        })
        break;
      case 4:
        this.addOrUpdateConsultation4.patchValue({
          termeSA:this.placeholder
         })
         break; 
      case 5:
        this.addOrUpdateConsultation5.patchValue({
          termeSA:this.placeholder
        })
        break;
      case 6:
        this.addOrUpdateConsultation6.patchValue({
          termeSA:this.placeholder
        })
        break;
      case 7:
        this.addOrUpdateConsultation7.patchValue({
          termeSA:this.placeholder
        })
        break;
      case 8:
          this.addOrUpdateConsultation8.patchValue({
            termeSA:this.placeholder
          })
          break;                      
    }
   
    return terme;
  }


  constructor( private patientService: PatientService,
    private router: Router,
    private refdata: RefdataService,
    private route: ActivatedRoute,
    private caregivers: CareGiversService,
    private fb: FormBuilder) { 
    }

  
    
  ngOnInit(): void {
    this.disabledGeneral=localStorage.getItem('disabledGeneral');
    this.click =false;
    this.checkbox =true;
    this.disabled ="disabled";
    this.submitted = false;
    this.loaddetailprenatal =true;
    this.patient = false;
    this.loadingEchographie1=false;
    this.submittedTetanos =false
    this.loading=false;
    this.updateEchographie1=false;
    this.loadingEchographieAutre=false;
    this.updateEchographieAutre=false;
    this.loadingEchographie2=false;
    this.updateEchographie2=false;
    this.loadingEchographie3=false;
    this.updateEchographie3=false;
    this.loadingEchographie =false;
    this.updateEchographie =false;
    this.loadingConsultation1 =false;
    this.updateConsultation1 =false;
    this.loadingConsultation2 =false;
    this.updateConsultation2 =false;
    this.loadingConsultation3 =false;
    this.updateConsultation3 =false;
    this.loadingConsultation4 =false;
    this.updateConsultation4 =false;
    this.loadingConsultation5 =false;
    this.updateConsultation5 =false;
    this.loadingConsultation6 =false;
    this.updateConsultation6 =false;
    this.loadingConsultation7 =false;
    this.updateConsultation7 =false;
    this.loadingConsultation8 =false;
    this.updateConsultation8 =false;
    this.loadingStaff =false;
    this.updateStaff =false;
  
    let idPatient=0;
    if (localStorage.getItem("token") == null) {
      localStorage.removeItem("token");
      localStorage.removeItem("X_HI_CODE");
      localStorage.removeItem("currentUser");
      this.router.navigate(["/login"]);
    }
    idPatient = this.getPatientId();
    localStorage.setItem('patientId',idPatient.toString());
   const detailsDossierPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.patientService.findDossierPrenatal(idPatient) : this.patientService.getAllDossierPrenatals(idPatient);

    const caregiversPromise =this.caregivers.getCareGivers(); 
    const patientPromise =this.patientService.find(idPatient);
    const cityPromise = this.refdata.get(this.constCity);
    const sexPromise = this.refdata.get(this.constSexe);
    const countryPromise = this.refdata.get(this.constCountry);
    const statePromise = this.refdata.get(this.constState);
    const linkTypePromise = this.refdata.get(this.constLinkType);
    const nationalityPromise = this.refdata.get(this.constNationality);
    
    forkJoin([cityPromise,sexPromise,countryPromise,statePromise,linkTypePromise,nationalityPromise,detailsDossierPrenatal,caregiversPromise,patientPromise]).subscribe(responses => {
      this.AllCityDetails = Object.assign(new aRefData(), responses[0][0]).refDatas;
      this.AllSexeDetails = Object.assign(new aRefData(), responses[1][0]).refDatas;
      this.AllCountryDetails = Object.assign(new aRefData(), responses[2][0]).refDatas;
      this.AllStateDetails = Object.assign(new aRefData(), responses[3][0]).refDatas;
      this.AllLinkTypeDetails = Object.assign(new aRefData(), responses[4][0]).refDatas;
      this.AllNationalityDetails = Object.assign(new aRefData(), responses[5][0]).refDatas;

      if (responses[6]['code']==200){
          this.dossier = Object.assign(new DossierPrenatal(), responses[6]["result"][0]);
          this.ddr=this.dossier?.dateDerniereRegle;
          this.modifierFormPrenatal.patchValue({
            id: this.dossier?.id,
            dateDerniereRegle: new Date(this.dossier?.dateDerniereRegle * 1000).toISOString().substring(0, 10),
            groupSanguin: this.dossier?.groupSanguin,
            rhesus: this.dossier?.rhesus,
            praticien: this.dossier?.praticien,
            g:this.dossier?.g,
            p: this.dossier?.p,
            patientId: this.getPatientId()
          });


         this.PrenatalLoad();
         const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
          this.patientService.findGrossesse(this.getPatientId(), idDosserPrenatal).subscribe(responses => {
            if (responses['code'] == 200) {
              
             let data = Object.assign(new Grossesse(), responses["result"][0]);
             let datTp =new Date(this.dossier?.dateDerniereRegle * 1000);
             let dateTp =(this.dossier?.dateDerniereRegle>0)?datTp.setDate(datTp.getDate()+280): new Date().setDate(new Date().getDate()+280);
             this.termePrevu =new Date(dateTp).toISOString().substring(0, 10);
            
         }
       });
   

      }

      if (responses[7]['code']==200){
        this.dataCareGiversDetails=responses[7]["result"];
        this.careGiver=Object.assign(new CareGivers(),this.dataCareGiversDetails?.find(x=>x.id===this.dossier.praticien)); 
      }

      if (responses[8]['code']==200){
        this.patientInfos =Object.assign(new patient(), responses[8]["result"]);
        this.dateNaissance=responses[8]["result"].doB;
      }
     
  },
  (error) => {
    throw error;
    alert(JSON.stringify(error.status));
  
  });

  this.createTetanos = new FormGroup( {
    id:new FormControl(),
    date:  new FormControl(new Date().toISOString().substring(0, 10)),
    lot:  new FormControl(),
     vat: new FormControl()
  });


  this.updateTetanos = new FormGroup( {
    id:new FormControl(),
    date:  new FormControl(),
    lot:  new FormControl(),
    vat: new FormControl()
 });
 this.createRhophylac = new FormGroup( {
  date:  new FormControl(new Date().toISOString().substring(0, 10)),
  dose:  new FormControl(),
  numero: new FormControl(),
  rhophylac:  new FormControl(),
  id: new FormControl(),
  terme: new FormControl()
});

this.updateRhophylac = new FormGroup( {
  date:  new FormControl(),
  dose:  new FormControl(),
  numero: new FormControl(),
  id: new FormControl(),
  rhophylac:  new FormControl(),
  terme: new FormControl()
});


this.createTpi = new FormGroup( {
  date:  new FormControl(new Date().toISOString().substring(0, 10)),
  libelleDose:  new FormControl(),
  nombreComprime: new FormControl(),
  numeroDose:  new FormControl(),
  id:  new FormControl(),
  terme: new FormControl()
});

this.updateTpi = new FormGroup( {
  date:  new FormControl(),
  libelleDose:  new FormControl(),
  nombreComprime: new FormControl(),
  id:  new FormControl(),
  numeroDose:  new FormControl(),
  terme: new FormControl()
});
this.addOrUpdateEchographieAutre = new FormGroup( {
  bip1:  new FormControl(),
  bip2:  new FormControl(),
  ca1:  new FormControl(),
  ca2:  new FormControl(),
  lf1:  new FormControl(),
  lf2:  new FormControl(),
  opn1:  new FormControl(),
  opn2:  new FormControl(),
  cn1:  new FormControl(),
  cn2:  new FormControl(),
  col: new FormControl(),
  conclusion1:  new FormControl(),
  conclusion2:  new FormControl(),
  date:  new FormControl(),
  ddr:  new FormControl(),
  epf1:  new FormControl(),
  epf2:  new FormControl(),
  id:  new FormControl(),
  la1: new FormControl(),
  la2: new FormControl(), 
  lcc1:  new FormControl(),
  lcc2:  new FormControl(),
  medecin : new FormControl(),
  morphologie1:  new FormControl(),
  morphologie2:  new FormControl(),
  nombreEmbryon: new FormControl(),
  placenta1:  new FormControl(),
  placenta2:  new FormControl(),
  precisionSuivi:  new FormControl(),
  presentation1:  new FormControl(),
  presentation2:  new FormControl(),
  suiviCsSF: new FormControl(),
  t:  new FormControl(),
  terme:  new FormControl(),
  type: new FormControl(),
  voieAccouchement: new FormControl()
});
  this.addOrUpdateEchographie1 = new FormGroup( {
    bip1:  new FormControl(),
    bip2:  new FormControl(),
    ca1:  new FormControl(),
    ca2:  new FormControl(),
    lf1:  new FormControl(),
    lf2:  new FormControl(),
    opn1:  new FormControl(),
    opn2:  new FormControl(),
    cn1:  new FormControl(),
    cn2:  new FormControl(),
    col: new FormControl(),
    conclusion1:  new FormControl(),
    conclusion2:  new FormControl(),
    date:  new FormControl(),
    ddr:  new FormControl(),
    epf1:  new FormControl(),
    epf2:  new FormControl(),
    id:  new FormControl(),
    la1: new FormControl(),
    la2: new FormControl(),    
    lcc1:  new FormControl(),
    lcc2:  new FormControl(),
    medecin : new FormControl(),
    morphologie1:  new FormControl(),
    morphologie2:  new FormControl(),
    nombreEmbryon: new FormControl(),
    placenta1:  new FormControl(),
    placenta2:  new FormControl(), 
    precisionSuivi:  new FormControl(),
    presentation1:  new FormControl(),
    presentation2:  new FormControl(),
    suiviCsSF: new FormControl(),
    t:  new FormControl(),
    terme:  new FormControl(),
    type: new FormControl(),
    voieAccouchement: new FormControl()
  });

  this.addOrUpdateEchographie2  = new FormGroup( {
    bip1:  new FormControl(),
    bip2:  new FormControl(),
    ca1:  new FormControl(),
    ca2:  new FormControl(),
    lf1:  new FormControl(),
    lf2:  new FormControl(),
    opn1:  new FormControl(),
    opn2:  new FormControl(),
    cn1:  new FormControl(),
    cn2:  new FormControl(),
    col: new FormControl(),
    conclusion1:  new FormControl(),
    conclusion2:  new FormControl(),
    date:  new FormControl(),
    ddr:  new FormControl(),
    epf1:  new FormControl(),
    epf2:  new FormControl(),
    id:  new FormControl(),
    la1: new FormControl(),
    la2: new FormControl(),    
    lcc1:  new FormControl(),
    lcc2:  new FormControl(),
    medecin : new FormControl(),
    morphologie1:  new FormControl(),
    morphologie2:  new FormControl(),
    nombreEmbryon: new FormControl(),
    placenta1:  new FormControl(),
    placenta2:  new FormControl(),    
    precisionSuivi:  new FormControl(),
    presentation1:  new FormControl(),
    presentation2:  new FormControl(),
    suiviCsSF: new FormControl(),
    t:  new FormControl(),
    terme:  new FormControl(),
    type: new FormControl(),
    voieAccouchement: new FormControl()
  });

  this.addOrUpdateEchographie3  = new FormGroup( {
    bip1:  new FormControl(),
    bip2:  new FormControl(),
    ca1:  new FormControl(),
    ca2:  new FormControl(),
    lf1:  new FormControl(),
    lf2:  new FormControl(),
    opn1:  new FormControl(),
    opn2:  new FormControl(),
    cn1:  new FormControl(),
    cn2:  new FormControl(),
    col: new FormControl(),
    conclusion1:  new FormControl(),
    conclusion2:  new FormControl(),
    date:  new FormControl(),
    ddr:  new FormControl(),
    epf1:  new FormControl(),
    epf2:  new FormControl(),
    id:  new FormControl(),
    la1: new FormControl(),
    la2: new FormControl(),    
    lcc1:  new FormControl(),
    lcc2:  new FormControl(),
    medecin : new FormControl(),
    morphologie1:  new FormControl(),
    morphologie2:  new FormControl(),
    nombreEmbryon: new FormControl(),
    placenta1:  new FormControl(),
    placenta2:  new FormControl(),    
    precisionSuivi:  new FormControl(),
    presentation1:  new FormControl(),
    presentation2:  new FormControl(),
    suiviCsSF: new FormControl(),
    t:  new FormControl(),
    terme:  new FormControl(),
    type: new FormControl(),
    voieAccouchement: new FormControl()
  });
  this.addOrUpdateEchographie = new FormGroup( {
    bip1:  new FormControl(),
    bip2:  new FormControl(),
    ca1:  new FormControl(),
    ca2:  new FormControl(),
    lf1:  new FormControl(),
    lf2:  new FormControl(),
    opn1:  new FormControl(),
    opn2:  new FormControl(),
    cn1:  new FormControl(),
    cn2:  new FormControl(),
    col: new FormControl(),
    conclusion1:  new FormControl(),
    conclusion2:  new FormControl(),
    date:  new FormControl(),
    ddr:  new FormControl(),
    epf1:  new FormControl(),
    epf2:  new FormControl(),
    id:  new FormControl(),
    la1: new FormControl(),
    la2: new FormControl(),    
    lcc1:  new FormControl(),
    lcc2:  new FormControl(),
    medecin : new FormControl(),
    morphologie1:  new FormControl(),
    morphologie2:  new FormControl(),
    nombreEmbryon: new FormControl(),
    placenta1:  new FormControl(),
    placenta2:  new FormControl(),    
    precisionSuivi:  new FormControl(),
    presentation1:  new FormControl(),
    presentation2:  new FormControl(),
    suiviCsSF: new FormControl(),
    t:  new FormControl(),
    terme:  new FormControl(),
    type: new FormControl(),
    voieAccouchement: new FormControl()
  });

  this.addOrUpdateBilan = new FormGroup( {
    gp:  new FormControl(),
    gpdate:  new FormControl(),
    rh: new FormControl(),
    rhdate:  new FormControl(),
    ra:  new FormControl(),
    radate:  new FormControl(),
    sra:  new FormControl(),
    sradate:  new FormControl(),
    to: new FormControl(),
    todate:  new FormControl(),
    toigm : new FormControl(),
    toigmdate:  new FormControl(),
    toigg: new FormControl(),
    toiggdate:  new FormControl(),
    ru:  new FormControl(),
    rudate:  new FormControl(),
    ruigm: new FormControl(),
    ruigmdate:  new FormControl(),
    ruigg:  new FormControl(),
    ruiggdate: new FormControl(),
    tv: new FormControl(),
    tvdate:  new FormControl(),
    tp:  new FormControl(),
    tpdate: new FormControl(),
    vd:  new FormControl(),
    vddate:  new FormControl(),
    hi:  new FormControl(),
    hidate:  new FormControl(),
    hc:  new FormControl(),
    hcdate: new FormControl(),
    hb:  new FormControl(),
    hbdate : new FormControl(),
    te:  new FormControl(),
    tedate: new FormControl(),
    el:  new FormControl(),
    eldate:  new FormControl(),
    hba:  new FormControl(),
    hbadate: new FormControl(),
    hbf:  new FormControl(),
    hbfdate:  new FormControl(),
    hbb: new FormControl(),
    hbbdate: new FormControl(),
    nfs:  new FormControl(),
    nfsdate: new FormControl(),
    HB:  new FormControl(),
    HBdate:  new FormControl(),
    pl: new FormControl(),
    pldate: new FormControl(),
    tpTcaFi:  new FormControl(),
    tpTcaFidate: new FormControl(),
    gly:  new FormControl(),
    glydate:  new FormControl(),
    ddg: new FormControl(),
    ddgdate: new FormControl(),
    osuli:  new FormControl(),
    osulidate: new FormControl(),
    t1:  new FormControl(),
    t1date:  new FormControl(),
    t2: new FormControl(),
    t2date: new FormControl(),
    hbs:  new FormControl(),
  });


  this.addOrUpdateAntecedentObstetricals = new FormGroup({
    accouchement_delivrance: new FormControl(),
    allaitement: new FormControl(),
    hta: new FormControl(),
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


  this.addOrUpdateAntecedentGynecologique = this.fb.group({
    gynecoAutres: new FormControl(),
    id: new FormControl(),
    infertilite: new FormControl(),
    contraception: new FormControl()
  });

  this.addOrUpdateAntecedentMereChirurgicauxForm = new FormGroup({
    id: new FormControl(),
    chirurAutres: new FormControl(),
    chirurGyneco: new FormControl()
  });

  this.addOrUpdateAntecedentMedMereForm = this.fb.group({
    autres: new FormControl(),
    allergies: new FormControl(),
    hypertension: new FormControl(),
    cardiopathie: new FormControl(),
    insuffisanceRenale: new FormControl(),
    asthme: new FormControl(),
    tuberculose: new FormControl(),
    hepatiteB: new FormControl(),
    diabete: new FormControl(),
    drepanocytose: new FormControl(),
    arv: new FormControl(),
    anemie: new FormControl(),
    id: new FormControl(),
    imc: new FormControl(),
    poids: new FormControl(),
    tabac: new FormControl(),
    taille: new FormControl(),
    toxicomanie: new FormControl()
  });

  
  this.updateFormPrenatal = new FormGroup({
    age: new FormControl(this.patientInfos),
    profession: new FormControl(),
    situationMatrimoniale: new FormControl(),
    groupSanguin:new FormControl(),
    ageConjoint: new FormControl(),
    id: new FormControl(),
    nationaliteConjoint: new FormControl(),
    professionConjoint: new FormControl(),
    patientId: new FormControl(),
    nombreEpousesConjoint: new FormControl(),
    g:new FormControl(),
    p:new FormControl()
  });

  this.modifierFormPrenatal = new FormGroup({
    dateDerniereRegle: new FormControl("", Validators.required),
    groupSanguin: new FormControl("", Validators.required),
    rhesus: new FormControl("", Validators.required),
    praticien: new FormControl("", Validators.required),
    age: new FormControl(),
    profession: new FormControl(),
    situationMatrimoniale: new FormControl(),
    ageConjoint: new FormControl(),
    id: new FormControl(),
    nationaliteConjoint: new FormControl(),
    professionConjoint: new FormControl(),
    patientId: new FormControl(),
    nombreEpousesConjoint: new FormControl(),
    g:new FormControl(),
    p:new FormControl()
  });

  this.addorUpdateSuiviMedical = new FormGroup({
    anesthesiste: new FormControl(),
    id: new FormControl(),
    obstGyneco: new FormControl(),
    patientId: new FormControl(),
    pediatre: new FormControl(),
    sageFemme: new FormControl(),
    dossierPrenatalId:new FormControl()
  });

  this.addOrUpdateGrossesseForm =new FormGroup({
    caractereCicatriciel : new FormControl(),
    dateDerniereRegle : new FormControl(),
    g : new FormControl(),
    id :new FormControl(),
    le : new FormControl(),
    medecin: new FormControl(),
    observations : new FormControl(),
    p : new FormControl(),
    precisionGrossesse:new FormControl(),
    pronosticVoieAccouchement :new FormControl(),
    tp:new FormControl(),
    typeGrossesse : new FormControl(),
    typeUterus : new FormControl()
  });


  this.addOrUpdateAntecedentConjointForm =new FormGroup({
    age:new FormControl(),
    dossierPrenatalId:new FormControl(),
    groupeSanguin: new FormControl(),
    id:new FormControl(),
    nationalite:new FormControl(),
    nombreEpouses:new FormControl(),
    pathologie: new FormControl(),
    patientId: new FormControl(),
    poids:new FormControl(),
    profession: new FormControl(),
    rhesus: new FormControl(),
    taille: new FormControl()
  });
  this.addOrUpdateStaff= new FormGroup({
    conclusionConduiteAtenir:new FormControl(),
    staffAvis: new FormControl(),
    staffDate:new FormControl(),
    staffPresent: new FormControl(),
    albumine: new FormControl(),
    aspect: new FormControl(),
    autrePrescriptions: new FormControl(),
    autres: new FormControl(),
    bdc: new FormControl(),
    bilanPreaccouchement: new FormControl(),
    conclusion: new FormControl(),
    conseilsHygienoDietetique: new FormControl(),
    consultationAnesthesie:new FormControl(),
    contractionAnormale: new FormControl(),
    date: new FormControl(),
    echoDebutGrossesse: new FormControl(),
    etatGeneral: new FormControl(),
    examenAbdomen: new FormControl(),
    examenBassin: new FormControl(),
    examenBiologique: new FormControl(false),
    precisionExamen: new FormControl(),
    examenSeins: new FormControl(),
    ferAcideFollique: new FormControl(),
    hu: new FormControl(),
    id: new FormControl(),
    ivaIvl: new FormControl(),
    maf: new FormControl(),
    metrorragies: new FormControl(),
    mildaMmoustiquaireImpregeLongueDuree: new FormControl(),
    muqueuses: new FormControl(),
    nitriteLeuco: new FormControl(),
    nomDuConsultant: new FormControl(),
    osullivan: new FormControl(),
    pertes: new FormControl(),
    poids: new FormControl(),
    pouls: new FormControl(),
    precisionEchographie: new FormControl(),
    preparationNaissance: new FormControl(),
    prisePoids: new FormControl(),
    prochEcho: new FormControl(),
    prochRDV: new FormControl(),
    projetNaissance: new FormControl(),
    propositionNest: new FormControl('non'),
    ptiSp1dose: new FormControl(),
    ptiSp3dose: new FormControl(),
    ptiSpRattrapagedose: new FormControl(),
    ptmePreventionTransmissionMereEnfant: new FormControl(),
    qualification: new FormControl(),
    rdvTerme: new FormControl(),
    resulatEchographie1: new FormControl(),
    resulatEchographie2:new FormControl(),
    resulatEchographie3: new FormControl(),
    signeParticulier: new FormControl(),
    speculum: new FormControl(),
    sucre: new FormControl(),
    surveillanceFinGrossesse: new FormControl(),
    ta: new FormControl(),
    termeSA: new FormControl(),
    troubleUrinaires: new FormControl(),
    tv: new FormControl(),
    type: new FormControl(),
    urgence: new FormControl(),
    vaccinationAprevoir: new FormControl(),
    voieAccouchementValidee: new FormControl()
});
this.addOrUpdateConsultation1= new FormGroup({
     termeSA: new FormControl(),
     conclusionConduiteAtenir:new FormControl(),
     staffAvis: new FormControl(),
     staffDate:new FormControl(),
     staffPresent: new FormControl(),
    albumine: new FormControl(),
    aspect: new FormControl(),
    autrePrescriptions: new FormControl(),
    autres: new FormControl(),
    bdc: new FormControl(),
    bilanPreaccouchement: new FormControl(),
    conclusion: new FormControl(),
    conseilsHygienoDietetique: new FormControl(),
    consultationAnesthesie:new FormControl(),
    contractionAnormale: new FormControl(),
    date: new FormControl(),
    echoDebutGrossesse: new FormControl(),
    etatGeneral: new FormControl(),
    examenAbdomen: new FormControl(),
    examenBassin: new FormControl(),
    examenBiologique: new FormControl(false),
    precisionExamen: new FormControl(),
    examenSeins: new FormControl(),
    ferAcideFollique: new FormControl(),
    hu: new FormControl(),
    id: new FormControl(),
    ivaIvl: new FormControl(),
    maf: new FormControl(),
    metrorragies: new FormControl(),
    mildaMmoustiquaireImpregeLongueDuree: new FormControl(),
    muqueuses: new FormControl(),
    nitriteLeuco: new FormControl(),
    nomDuConsultant: new FormControl(),
    osullivan: new FormControl(),
    pertes: new FormControl(),
    poids: new FormControl(),
    pouls: new FormControl(),
    precisionEchographie: new FormControl(),
    preparationNaissance: new FormControl(),
    prisePoids: new FormControl(),
    prochEcho: new FormControl(),
    prochRDV: new FormControl(),
    projetNaissance: new FormControl(),
    propositionNest: new FormControl('non'),
    ptiSp1dose: new FormControl(),
    ptiSp3dose: new FormControl(),
    ptiSpRattrapagedose: new FormControl(),
    ptmePreventionTransmissionMereEnfant: new FormControl(),
    qualification: new FormControl(),
    rdvTerme: new FormControl(),
    resulatEchographie1: new FormControl(),
    resulatEchographie2:new FormControl(),
    resulatEchographie3: new FormControl(),
    signeParticulier: new FormControl(),
    speculum: new FormControl(),
    sucre: new FormControl(),
    surveillanceFinGrossesse: new FormControl(),
    ta: new FormControl(),
    troubleUrinaires: new FormControl(),
    tv: new FormControl(),
    type: new FormControl(),
    urgence: new FormControl(),
    vaccinationAprevoir: new FormControl(),
    voieAccouchementValidee: new FormControl()
});
this.addOrUpdateConsultation2= new FormGroup({
  conclusionConduiteAtenir:new FormControl(),
    staffAvis: new FormControl(),
    staffDate:new FormControl(),
    staffPresent: new FormControl(),
  albumine: new FormControl(),
  aspect: new FormControl(),
  autrePrescriptions: new FormControl(),
  autres: new FormControl(),
  bdc: new FormControl(),
  bilanPreaccouchement: new FormControl(),
  conclusion: new FormControl(),
  conseilsHygienoDietetique: new FormControl(),
  consultationAnesthesie:new FormControl(),
  contractionAnormale: new FormControl(),
  date: new FormControl(),
  echoDebutGrossesse: new FormControl(),
  etatGeneral: new FormControl(),
  examenAbdomen: new FormControl(),
  examenBassin: new FormControl(),
  examenBiologique: new FormControl(),
  precisionExamen: new FormControl(),
  examenSeins: new FormControl(),
  ferAcideFollique: new FormControl(),
  hu: new FormControl(),
  id: new FormControl(),
  ivaIvl: new FormControl(),
  maf: new FormControl(),
  metrorragies: new FormControl(),
  mildaMmoustiquaireImpregeLongueDuree: new FormControl(),
  muqueuses: new FormControl(),
  nitriteLeuco: new FormControl(),
  nomDuConsultant: new FormControl(),
  osullivan: new FormControl(),
  pertes: new FormControl(),
  poids: new FormControl(),
  pouls: new FormControl(),
  precisionEchographie: new FormControl(),
  preparationNaissance: new FormControl(),
  prisePoids: new FormControl(),
  prochEcho: new FormControl(),
  prochRDV: new FormControl(),
  projetNaissance: new FormControl(),
  propositionNest: new FormControl(),
  ptiSp1dose: new FormControl(),
  ptiSp3dose: new FormControl(),
  ptiSpRattrapagedose: new FormControl(),
  ptmePreventionTransmissionMereEnfant: new FormControl(),
  qualification: new FormControl(),
  rdvTerme: new FormControl(),
  resulatEchographie1: new FormControl(),
  resulatEchographie2:new FormControl(),
  resulatEchographie3: new FormControl(),
  signeParticulier: new FormControl(),
  speculum: new FormControl(),
  sucre: new FormControl(),
  surveillanceFinGrossesse: new FormControl(),
  ta: new FormControl(),
  termeSA: new FormControl(),
  troubleUrinaires: new FormControl(),
  tv: new FormControl(),
  type: new FormControl(),
  urgence: new FormControl(),
  vaccinationAprevoir: new FormControl(),
  voieAccouchementValidee: new FormControl()
});
this.addOrUpdateConsultation3= new FormGroup({
  conclusionConduiteAtenir:new FormControl(),
    staffAvis: new FormControl(),
    staffDate:new FormControl(),
    staffPresent: new FormControl(),
  albumine: new FormControl(),
  aspect: new FormControl(),
  autrePrescriptions: new FormControl(),
  autres: new FormControl(),
  bdc: new FormControl(),
  bilanPreaccouchement: new FormControl(),
  conclusion: new FormControl(),
  conseilsHygienoDietetique: new FormControl(),
  consultationAnesthesie:new FormControl(),
  contractionAnormale: new FormControl(),
  date: new FormControl(),
  echoDebutGrossesse: new FormControl(),
  etatGeneral: new FormControl(),
  examenAbdomen: new FormControl(),
  examenBassin: new FormControl(),
  examenBiologique: new FormControl(),
  precisionExamen: new FormControl(),
  examenSeins: new FormControl(),
  ferAcideFollique: new FormControl(),
  hu: new FormControl(),
  id: new FormControl(),
  ivaIvl: new FormControl(),
  maf: new FormControl(),
  metrorragies: new FormControl(),
  mildaMmoustiquaireImpregeLongueDuree: new FormControl(),
  muqueuses: new FormControl(),
  nitriteLeuco: new FormControl(),
  nomDuConsultant: new FormControl(),
  osullivan: new FormControl(),
  pertes: new FormControl(),
  poids: new FormControl(),
  pouls: new FormControl(),
  precisionEchographie: new FormControl(),
  preparationNaissance: new FormControl(),
  prisePoids: new FormControl(),
  prochEcho: new FormControl(),
  prochRDV: new FormControl(),
  projetNaissance: new FormControl(),
  propositionNest: new FormControl(),
  ptiSp1dose: new FormControl(),
  ptiSp3dose: new FormControl(),
  ptiSpRattrapagedose: new FormControl(),
  ptmePreventionTransmissionMereEnfant: new FormControl(),
  qualification: new FormControl(),
  rdvTerme: new FormControl(),
  resulatEchographie1: new FormControl(),
  resulatEchographie2:new FormControl(),
  resulatEchographie3: new FormControl(),
  signeParticulier: new FormControl(),
  speculum: new FormControl(),
  sucre: new FormControl(),
  surveillanceFinGrossesse: new FormControl(),
  ta: new FormControl(),
  termeSA: new FormControl(),
  troubleUrinaires: new FormControl(),
  tv: new FormControl(),
  type: new FormControl(),
  urgence: new FormControl(),
  vaccinationAprevoir: new FormControl(),
  voieAccouchementValidee: new FormControl()
});
this.addOrUpdateConsultation4= new FormGroup({
  conclusionConduiteAtenir:new FormControl(),
    staffAvis: new FormControl(),
    staffDate:new FormControl(),
    staffPresent: new FormControl(),
  albumine: new FormControl(),
  aspect: new FormControl(),
  autrePrescriptions: new FormControl(),
  autres: new FormControl(),
  bdc: new FormControl(),
  bilanPreaccouchement: new FormControl(),
  conclusion: new FormControl(),
  conseilsHygienoDietetique: new FormControl(),
  consultationAnesthesie:new FormControl(),
  contractionAnormale: new FormControl(),
  date: new FormControl(),
  echoDebutGrossesse: new FormControl(),
  etatGeneral: new FormControl(),
  examenAbdomen: new FormControl(),
  examenBassin: new FormControl(),
  examenBiologique: new FormControl(),
  precisionExamen: new FormControl(),
  examenSeins: new FormControl(),
  ferAcideFollique: new FormControl(),
  hu: new FormControl(),
  id: new FormControl(),
  ivaIvl: new FormControl(),
  maf: new FormControl(),
  metrorragies: new FormControl(),
  mildaMmoustiquaireImpregeLongueDuree: new FormControl(),
  muqueuses: new FormControl(),
  nitriteLeuco: new FormControl(),
  nomDuConsultant: new FormControl(),
  osullivan: new FormControl(),
  pertes: new FormControl(),
  poids: new FormControl(),
  pouls: new FormControl(),
  precisionEchographie: new FormControl(),
  preparationNaissance: new FormControl(),
  prisePoids: new FormControl(),
  prochEcho: new FormControl(),
  prochRDV: new FormControl(),
  projetNaissance: new FormControl(),
  propositionNest: new FormControl(),
  ptiSp1dose: new FormControl(),
  ptiSp3dose: new FormControl(),
  ptiSpRattrapagedose: new FormControl(),
  ptmePreventionTransmissionMereEnfant: new FormControl(),
  qualification: new FormControl(),
  rdvTerme: new FormControl(),
  resulatEchographie1: new FormControl(),
  resulatEchographie2:new FormControl(),
  resulatEchographie3: new FormControl(),
  signeParticulier: new FormControl(),
  speculum: new FormControl(),
  sucre: new FormControl(),
  surveillanceFinGrossesse: new FormControl(),
  ta: new FormControl(),
  termeSA: new FormControl(),
  troubleUrinaires: new FormControl(),
  tv: new FormControl(),
  type: new FormControl(),
  urgence: new FormControl(),
  vaccinationAprevoir: new FormControl(),
  voieAccouchementValidee: new FormControl()
});
this.addOrUpdateConsultation5= new FormGroup({
  conclusionConduiteAtenir:new FormControl(),
    staffAvis: new FormControl(),
    staffDate:new FormControl(),
    staffPresent: new FormControl(),
  albumine: new FormControl(),
  aspect: new FormControl(),
  autrePrescriptions: new FormControl(),
  autres: new FormControl(),
  bdc: new FormControl(),
  bilanPreaccouchement: new FormControl(),
  conclusion: new FormControl(),
  conseilsHygienoDietetique: new FormControl(),
  consultationAnesthesie:new FormControl(),
  contractionAnormale: new FormControl(),
  date: new FormControl(),
  echoDebutGrossesse: new FormControl(),
  etatGeneral: new FormControl(),
  examenAbdomen: new FormControl(),
  examenBassin: new FormControl(),
  examenBiologique: new FormControl(),
  precisionExamen: new FormControl(),
  examenSeins: new FormControl(),
  ferAcideFollique: new FormControl(),
  hu: new FormControl(),
  id: new FormControl(),
  ivaIvl: new FormControl(),
  maf: new FormControl(),
  metrorragies: new FormControl(),
  mildaMmoustiquaireImpregeLongueDuree: new FormControl(),
  muqueuses: new FormControl(),
  nitriteLeuco: new FormControl(),
  nomDuConsultant: new FormControl(),
  osullivan: new FormControl(),
  pertes: new FormControl(),
  poids: new FormControl(),
  pouls: new FormControl(),
  precisionEchographie: new FormControl(),
  preparationNaissance: new FormControl(),
  prisePoids: new FormControl(),
  prochEcho: new FormControl(),
  prochRDV: new FormControl(),
  projetNaissance: new FormControl(),
  propositionNest: new FormControl(),
  ptiSp1dose: new FormControl(),
  ptiSp3dose: new FormControl(),
  ptiSpRattrapagedose: new FormControl(),
  ptmePreventionTransmissionMereEnfant: new FormControl(),
  qualification: new FormControl(),
  rdvTerme: new FormControl(),
  resulatEchographie1: new FormControl(),
  resulatEchographie2:new FormControl(),
  resulatEchographie3: new FormControl(),
  signeParticulier: new FormControl(),
  speculum: new FormControl(),
  sucre: new FormControl(),
  surveillanceFinGrossesse: new FormControl(),
  ta: new FormControl(),
  termeSA: new FormControl(),
  troubleUrinaires: new FormControl(),
  tv: new FormControl(),
  type: new FormControl(),
  urgence: new FormControl(),
  vaccinationAprevoir: new FormControl(),
  voieAccouchementValidee: new FormControl()
});
this.addOrUpdateConsultation6= new FormGroup({
  conclusionConduiteAtenir:new FormControl(),
    staffAvis: new FormControl(),
    staffDate:new FormControl(),
    staffPresent: new FormControl(),
  albumine: new FormControl(),
  aspect: new FormControl(),
  autrePrescriptions: new FormControl(),
  autres: new FormControl(),
  bdc: new FormControl(),
  bilanPreaccouchement: new FormControl(),
  conclusion: new FormControl(),
  conseilsHygienoDietetique: new FormControl(),
  consultationAnesthesie:new FormControl(),
  contractionAnormale: new FormControl(),
  date: new FormControl(),
  echoDebutGrossesse: new FormControl(),
  etatGeneral: new FormControl(),
  examenAbdomen: new FormControl(),
  examenBassin: new FormControl(),
  examenBiologique: new FormControl(),
  precisionExamen: new FormControl(),
  examenSeins: new FormControl(),
  ferAcideFollique: new FormControl(),
  hu: new FormControl(),
  id: new FormControl(),
  ivaIvl: new FormControl(),
  maf: new FormControl(),
  metrorragies: new FormControl(),
  mildaMmoustiquaireImpregeLongueDuree: new FormControl(),
  muqueuses: new FormControl(),
  nitriteLeuco: new FormControl(),
  nomDuConsultant: new FormControl(),
  osullivan: new FormControl(),
  pertes: new FormControl(),
  poids: new FormControl(),
  pouls: new FormControl(),
  precisionEchographie: new FormControl(),
  preparationNaissance: new FormControl(),
  prisePoids: new FormControl(),
  prochEcho: new FormControl(),
  prochRDV: new FormControl(),
  projetNaissance: new FormControl(),
  propositionNest: new FormControl(),
  ptiSp1dose: new FormControl(),
  ptiSp3dose: new FormControl(),
  ptiSpRattrapagedose: new FormControl(),
  ptmePreventionTransmissionMereEnfant: new FormControl(),
  qualification: new FormControl(),
  rdvTerme: new FormControl(),
  resulatEchographie1: new FormControl(),
  resulatEchographie2:new FormControl(),
  resulatEchographie3: new FormControl(),
  signeParticulier: new FormControl(),
  speculum: new FormControl(),
  sucre: new FormControl(),
  surveillanceFinGrossesse: new FormControl(),
  ta: new FormControl(),
  termeSA: new FormControl(),
  troubleUrinaires: new FormControl(),
  tv: new FormControl(),
  type: new FormControl(),
  urgence: new FormControl(),
  vaccinationAprevoir: new FormControl(),
  voieAccouchementValidee: new FormControl()
});
this.addOrUpdateConsultation7= new FormGroup({
  conclusionConduiteAtenir:new FormControl(),
  staffAvis: new FormControl(),
  staffDate:new FormControl(),
  staffPresent: new FormControl(),
  albumine: new FormControl(),
  aspect: new FormControl(),
  autrePrescriptions: new FormControl(),
  autres: new FormControl(),
  bdc: new FormControl(),
  bilanPreaccouchement: new FormControl(),
  conclusion: new FormControl(),
  conseilsHygienoDietetique: new FormControl(),
  consultationAnesthesie:new FormControl(),
  contractionAnormale: new FormControl(),
  date: new FormControl(),
  echoDebutGrossesse: new FormControl(),
  etatGeneral: new FormControl(),
  examenAbdomen: new FormControl(),
  examenBassin: new FormControl(),
  examenBiologique: new FormControl(),
  precisionExamen: new FormControl(),
  examenSeins: new FormControl(),
  ferAcideFollique: new FormControl(),
  hu: new FormControl(),
  id: new FormControl(),
  ivaIvl: new FormControl(),
  maf: new FormControl(),
  metrorragies: new FormControl(),
  mildaMmoustiquaireImpregeLongueDuree: new FormControl(),
  muqueuses: new FormControl(),
  nitriteLeuco: new FormControl(),
  nomDuConsultant: new FormControl(),
  osullivan: new FormControl(),
  pertes: new FormControl(),
  poids: new FormControl(),
  pouls: new FormControl(),
  precisionEchographie: new FormControl(),
  preparationNaissance: new FormControl(),
  prisePoids: new FormControl(),
  prochEcho: new FormControl(),
  prochRDV: new FormControl(),
  projetNaissance: new FormControl(),
  propositionNest: new FormControl(),
  ptiSp1dose: new FormControl(),
  ptiSp3dose: new FormControl(),
  ptiSpRattrapagedose: new FormControl(),
  ptmePreventionTransmissionMereEnfant: new FormControl(),
  qualification: new FormControl(),
  rdvTerme: new FormControl(),
  resulatEchographie1: new FormControl(),
  resulatEchographie2:new FormControl(),
  resulatEchographie3: new FormControl(),
  signeParticulier: new FormControl(),
  speculum: new FormControl(),
  sucre: new FormControl(),
  surveillanceFinGrossesse: new FormControl(),
  ta: new FormControl(),
  termeSA: new FormControl(),
  troubleUrinaires: new FormControl(),
  tv: new FormControl(),
  type: new FormControl(),
  urgence: new FormControl(),
  vaccinationAprevoir: new FormControl(),
  voieAccouchementValidee: new FormControl()
});
this.addOrUpdateConsultation8= new FormGroup({
  conclusionConduiteAtenir:new FormControl(),
    staffAvis: new FormControl(),
    staffDate:new FormControl(),
    staffPresent: new FormControl(),
  albumine: new FormControl(),
  aspect: new FormControl(),
  autrePrescriptions: new FormControl(),
  autres: new FormControl(),
  bdc: new FormControl(),
  bilanPreaccouchement: new FormControl(),
  conclusion: new FormControl(),
  conseilsHygienoDietetique: new FormControl(),
  consultationAnesthesie:new FormControl(),
  contractionAnormale: new FormControl(),
  date: new FormControl(),
  echoDebutGrossesse: new FormControl(),
  etatGeneral: new FormControl(),
  examenAbdomen: new FormControl(),
  examenBassin: new FormControl(),
  examenBiologique: new FormControl(),
  precisionExamen: new FormControl(),
  examenSeins: new FormControl(),
  ferAcideFollique: new FormControl(),
  hu: new FormControl(),
  id: new FormControl(),
  ivaIvl: new FormControl(),
  maf: new FormControl(),
  metrorragies: new FormControl(),
  mildaMmoustiquaireImpregeLongueDuree: new FormControl(),
  muqueuses: new FormControl(),
  nitriteLeuco: new FormControl(),
  nomDuConsultant: new FormControl(),
  osullivan: new FormControl(),
  pertes: new FormControl(),
  poids: new FormControl(),
  pouls: new FormControl(),
  precisionEchographie: new FormControl(),
  preparationNaissance: new FormControl(),
  prisePoids: new FormControl(),
  prochEcho: new FormControl(),
  prochRDV: new FormControl(),
  projetNaissance: new FormControl(),
  propositionNest: new FormControl(),
  ptiSp1dose: new FormControl(),
  ptiSp3dose: new FormControl(),
  ptiSpRattrapagedose: new FormControl(),
  ptmePreventionTransmissionMereEnfant: new FormControl(),
  qualification: new FormControl(),
  rdvTerme: new FormControl(),
  resulatEchographie1: new FormControl(),
  resulatEchographie2:new FormControl(),
  resulatEchographie3: new FormControl(),
  signeParticulier: new FormControl(),
  speculum: new FormControl(),
  sucre: new FormControl(),
  surveillanceFinGrossesse: new FormControl(),
  ta: new FormControl(),
  termeSA: new FormControl(),
  troubleUrinaires: new FormControl(),
  tv: new FormControl(),
  type: new FormControl(),
  urgence: new FormControl(),
  vaccinationAprevoir: new FormControl(),
  voieAccouchementValidee: new FormControl()
});

  this.addOrUpdateAntecedentFamiliauxForm =new FormGroup({
      id:new FormControl(),
      mere: new FormControl(),
      pere: new FormControl()
  });
  this.createRhophylac.controls['terme'].disable();
  this.createTpi.controls['terme'].disable()
  this.updateRhophylac.controls['terme'].disable()
  this.updateTpi.controls['terme'].disable()
  this.addOrUpdateGrossesseForm.disable();
  this.addorUpdateSuiviMedical.disable();
  this.addOrUpdateAntecedentConjointForm.disable();
  this.addOrUpdateAntecedentFamiliauxForm.disable();
  this.addOrUpdateAntecedentMedMereForm.disable();
  this.addOrUpdateAntecedentMereChirurgicauxForm.disable();
  this.updateFormPrenatal.disable();
  }
  get pre(): { [key: string]: AbstractControl } {
    return this.modifierFormPrenatal.controls;
  }

  public loadDataSelect(){
    this.caregivers.getCareGivers().subscribe(response => {
      if (response["code"]==200){
        this.dataCareGiversDetails= response["result"];
        this.dataCareGiversDetails.forEach( p=>{
        })

      }  
   });
  }
 


  updatePrenatal(id)
  {  
    this.loadDataSelect(); 
  }

  onSubmitPrenatalUpdate(){
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.loading = true;
    this.submitted = true;
    if (this.modifierFormPrenatal.invalid) {
  return;
} else{

  this.modifierFormPrenatal.patchValue({
    dateDerniereRegle:new Date(this.modifierFormPrenatal.value.dateDerniereRegle).getTime() / 1000,
    id: idDosserPrenatal,
    age: this.dossier.age,
    profession: this.dossier.profession,    
    situationMatrimoniale:this.dossier.situationMatrimoniale,
    ageConjoint:this.dossier.ageConjoint,
    nationaliteConjoint:this.dossier.nationaliteConjoint,
    professionConjoint:this.dossier.professionConjoint,
    nombreEpousesConjoint: this.dossier.nombreEpousesConjoint   
  }); 


  this.patientService.updateDossierPrenatal(this.getPatientId(),idDosserPrenatal,this.modifierFormPrenatal.value).subscribe((data) => {
    if (data.code === 200) {
      this.submitted = false;
      $("#formModifierPrenatal").modal("hide");
      let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
    } else {
      this.rMessage = "bErrorUpdate";
    }
  });
}
  }

  VaccinationLoad(){
    let vaccAntComplete = document.getElementById('vaccAntComplete') as HTMLInputElement
    this.patientService.findDossierPrenatal(this.getPatientId()).subscribe( p=>{
      vaccAntComplete.checked=p['result'][0].vaccAntComplete
    })
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.createRhophylac.controls['terme'].disable()
    this.createTpi.controls['terme'].disable()
    this.updateRhophylac.controls['terme'].disable()
    this.updateTpi.controls['terme'].disable()
    this.myLines=[];
    this.myLinesTempo=[];
    this.validerRhophylac=false
    this.validerTetanos=false
    this.submittedTetanos=false
    this.validerTpi=false
    this.myTpis=[];
    this.myTpisTempo=[];
    this.myRhophylacs=[];
    this.myRhophylacTempo=[];
    this.RhophylacLoad();
    this.TpiLoad();
    this.patientService.getAllTetanos(this.getPatientId(),idDosserPrenatal)
    .subscribe(data =>{
      this.myLines= data['result']     
      data['result'].forEach(teta => {
           teta.date=(teta.date>0) ?new Date(teta.date * 1000).toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
             this.myLinesTempo.push(teta)
    })
    console.log(" myLines au chargement tablo :"+JSON.stringify(this.myLinesTempo))

  }
    );
  }

  RhophylacLoad(){
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.patientService.getAllRhophylac(this.getPatientId(),idDosserPrenatal)
    .subscribe(data =>{
      this.myRhophylacs= data['result']
      data['result'].forEach(teta => {
           teta.date=(teta.date>0) ?new Date(teta.date * 1000).toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
             this.myRhophylacTempo.push(teta)
    })
  }
    );
  }

  onDeleteDisabledAllButtonDetailPrenatal(){
    localStorage.removeItem('disabledGeneral');
    localStorage.removeItem('dossierPrenatalAvoir');
  }
   TpiLoad(){
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.patientService.getAllTpi(this.getPatientId(),idDosserPrenatal)
    .subscribe(data =>{
      this.myTpis= data['result']
      console.log(" this.dossier.id :"+JSON.stringify(this.dossier.id))

      console.log(" myTpis au chargement :"+JSON.stringify(this.myTpis))
      data['result'].forEach(teta => {
           teta.date=(teta.date>0) ?new Date(teta.date * 1000).toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
             this.myTpisTempo.push(teta)
    })
  }
    );
  }
  BilanLoad(){
    this.rMessage=""
    this.activedSaveBilanButton =true;
    this.addOrUpdateBilan.disable()
    this.disabled ="disabled";
    this.loadingBilan=false
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.addOrUpdateBilan.patchValue( {
      gp:this.dossier?.groupSanguin,
      rh:this.dossier?.rhesus
    })
    let item :number=0
    this.patientService.getAllBilan(this.getPatientId(),idDosserPrenatal)
    .subscribe(
      data =>{
             this.idBilan=data["result"][0].id
            
           if(this.idBilan !=0){
            this.loadingBilan=true

            while(data["result"][0]["dataTab"][item] !=null ){
              let echographie1 =data["result"][0]["dataTab"][item];

             
         switch(data["result"][0]["dataTab"][item].labelle){

          case this.items[0].labelle:
            this.addOrUpdateBilan.patchValue( {
                gp:data["result"][0].dataTab[item].resultat,
                gpdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                .toISOString().substring(0, 10):null,
              })
          case this.items[1].labelle:
            this.addOrUpdateBilan.patchValue( {
              rh:data["result"][0].dataTab[item].resultat,
              rhdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
            break;
        
          case this.items[2].labelle:
            this.addOrUpdateBilan.patchValue( {
              ra:data["result"][0].dataTab[item].resultat,
              radate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
            break;
          case this.items[3].labelle:
            this.addOrUpdateBilan.patchValue( {
              sra:data["result"][0].dataTab[item].resultat,
              sradate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
            break;
          
          case this.items[4].labelle:
            this.addOrUpdateBilan.patchValue( {
              to:data["result"][0].dataTab[item].resultat,
              todate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
            break;
          case this.items[5].labelle:
            this.addOrUpdateBilan.patchValue( {
              toigm:data["result"][0].dataTab[item].resultat,
              toigmdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
            break;

          case this.items[6].labelle:
            this.addOrUpdateBilan.patchValue( {
              toigg:data["result"][0].dataTab[item].resultat,
              toiggdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
            break;
          case this.items[7].labelle:
            this.addOrUpdateBilan.patchValue( {
              ru:data["result"][0].dataTab[item].resultat,
              rudate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
            break;

          case this.items[8].labelle:
            this.addOrUpdateBilan.patchValue( {
              ruigm:data["result"][0].dataTab[item].resultat,
              ruigmdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
            break;
          case this.items[9].labelle:
            this.addOrUpdateBilan.patchValue( {
              ruigg:data["result"][0].dataTab[item].resultat,
              ruiggdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
            break;
          case this.items[10].labelle:
            this.addOrUpdateBilan.patchValue( {
              tv:data["result"][0].dataTab[item].resultat,
              tvdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
             break;
          
          case this.items[11].labelle:
            this.addOrUpdateBilan.patchValue( {
              tp:data["result"][0].dataTab[item].resultat,
              tpdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
            break;
          case this.items[12].labelle:
            this.addOrUpdateBilan.patchValue( {
              vd:data["result"][0].dataTab[item].resultat,
              vddate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
              break;
          case this.items[13].labelle:
            this.addOrUpdateBilan.patchValue( {
              hi:data["result"][0].dataTab[item].resultat,
              hidate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
              break;
              case this.items[14].labelle:
                this.addOrUpdateBilan.patchValue( {
                  hc:data["result"][0].dataTab[item].resultat,
                  hcdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                  .toISOString().substring(0, 10):null,
                })
                  break;
          case this.items[15].labelle:
            this.addOrUpdateBilan.patchValue( {
              hb:data["result"][0].dataTab[item].resultat,
              hbdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
              break;
          case this.items[16].labelle:
            this.addOrUpdateBilan.patchValue( {
              te:data["result"][0].dataTab[item].resultat,
              tedate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
              break;
          case this.items[17].labelle:
            this.addOrUpdateBilan.patchValue( {
              el:data["result"][0].dataTab[item].resultat,
              eldate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
              break;
          case this.items[18].labelle:
            this.addOrUpdateBilan.patchValue( {
              hba:data["result"][0].dataTab[item].resultat,
              hbadate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
              break;
          case this.items[19].labelle:
            this.addOrUpdateBilan.patchValue( {
              hbf:data["result"][0].dataTab[item].resultat,
              hbfdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
              break;
          case this.items[20].labelle:
            this.addOrUpdateBilan.patchValue( {
              hbb:data["result"][0].dataTab[item].resultat,
              hbbdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
              break;
          case this.items[21].labelle:
            this.addOrUpdateBilan.patchValue( {
              nfs:data["result"][0].dataTab[item].resultat,
              nfsdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
              break;
          case this.items[22].labelle:
            this.addOrUpdateBilan.patchValue( {
              HB:data["result"][0].dataTab[item].resultat,
              HBdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
              break;
          case this.items[23].labelle:
            this.addOrUpdateBilan.patchValue( {
              pl:data["result"][0].dataTab[item].resultat,
              pldate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
               break;
          case this.items[24].labelle:
            this.addOrUpdateBilan.patchValue( {
              tpTcaFi:data["result"][0].dataTab[item].resultat,
              tpTcaFidate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
            break;
            case this.items[25].labelle:
              this.addOrUpdateBilan.patchValue( {
                gly:data["result"][0].dataTab[item].resultat,
                glydate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                .toISOString().substring(0, 10):null,
              })
              break;
          case this.items[26].labelle:
            this.addOrUpdateBilan.patchValue( {
              ddg:data["result"][0].dataTab[item].resultat,
              ddgdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
              break;
          case this.items[27].labelle:
            this.addOrUpdateBilan.patchValue( {
              osuli:data["result"][0].dataTab[item].resultat,
              osulidate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
              break;
          case this.items[28].labelle:
            this.addOrUpdateBilan.patchValue( {
              t1:data["result"][0].dataTab[item].resultat,
              t1date:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):null,
            })
              break;
              case this.items[29].labelle:
                this.addOrUpdateBilan.patchValue( {
                  t2:data["result"][0].dataTab[item].resultat,
                  t2date:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                  .toISOString().substring(0, 10):null,
                })
                  break;
                  case this.items[30].labelle:
                    this.addOrUpdateBilan.patchValue( {
                      hbs:data["result"][0].dataTab[item].resultat,
                    })
                      break;
              }
  
              item++;
             }
           }else{
            this.loadingBilan =false,
            this.updateBilan=false
           }
           
          
      } 
    )
    
  }
 
  echographieLoad(){
    this.disabled="disabled";
    this.placeholder="",
    this.addOrUpdateEchographie1.disable();
    this.addOrUpdateEchographie2.disable();
    this.addOrUpdateEchographie3.disable();
    this.addOrUpdateEchographie.disable();
    this.addOrUpdateEchographieAutre.disable();
    this.addOrUpdateEchographie1.patchValue( {
      ddr:new Date(this.ddr * 1000).toISOString().substring(0, 10)
       });
      this.addOrUpdateEchographieAutre.patchValue( {
        ddr:new Date(this.ddr * 1000).toISOString().substring(0, 10)
       
        });
   
    this.loadingEchographieAutre =false,
    this.loadingEchographie1 =false,
    this.loadingEchographie2 =false,
    this.loadingEchographie3 =false
    this.loadingEchographie =false
    let item :number=0
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.patientService.getAllEchographiesByIdPatientAndIdDossierPrenatal(this.getPatientId(),idDosserPrenatal)
    .subscribe(
      data =>{
            
           while(data["result"][item] !=null){
            let echographie1 =data["result"][item];
             switch(data["result"][item].type){        
              case this.echographie_1:
                this.loadingEchographie1 =true
                this.addOrUpdateEchographie1.disable();
                this.addOrUpdateEchographie1.setValue( {
                  bip1: echographie1.bip1,
                  bip2: echographie1.bip2,
                  ca1: echographie1.ca1,
                  ca2: echographie1.ca2,
                  lf1: echographie1.lf1,
                  lf2: echographie1.lf2,
                  opn1: echographie1.opn1,
                  opn2: echographie1.opn2,
                  cn1:  echographie1.cn1,
                  cn2:  echographie1.cn2,
                  col: echographie1.col,
                  conclusion1:  echographie1.conclusion1,
                  conclusion2:  echographie1.conclusion2,
                  date:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  ddr: new Date(this.ddr * 1000)
                  .toISOString().substring(0, 10),
                  epf1:  echographie1.epf1,
                  epf2:  echographie1.epf2,
                  id:  echographie1.id,
                  la1: echographie1.la1,
                  la2: echographie1.la2,                  
                  lcc1:  echographie1.lcc1,
                  lcc2:  echographie1.lcc2,
                  medecin : echographie1.medecin,
                  morphologie1:  echographie1.morphologie1,
                  morphologie2:  echographie1.morphologie2,
                  nombreEmbryon: echographie1.nombreEmbryon,
                  placenta1: echographie1.placenta1,
                  placenta2: echographie1.placenta2,                  
                  precisionSuivi:  echographie1.precisionSuivi,
                  presentation1:  echographie1.presentation1,
                  presentation2:  echographie1.presentation2,
                  suiviCsSF: echographie1.suiviCsSF,
                  t:  echographie1.t,
                  terme:  echographie1.terme,
                  type: echographie1.type,
                  voieAccouchement: echographie1.voieAccouchement
                });
                console.log("  this.addOrUpdateEchographie1 :"+JSON.stringify( this.addOrUpdateEchographie2.getRawValue()))

                break;
              case this.echographie_2:
                this.loadingEchographie2 =true
                this.addOrUpdateEchographie2.disable();
                this.addOrUpdateEchographie2.setValue( {
                  bip1: echographie1.bip1,
                  bip2: echographie1.bip2,
                  ca1: echographie1.ca1,
                  ca2: echographie1.ca2,
                  lf1: echographie1.lf1,
                  lf2: echographie1.lf2,
                  opn1: echographie1.opn1,
                  opn2: echographie1.opn2,
                  cn1:  echographie1.cn1,
                  cn2:  echographie1.cn2,
                  col: echographie1.col,
                  conclusion1:  echographie1.conclusion1,
                  conclusion2:  echographie1.conclusion2,
                  date:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  ddr: new Date(this.ddr * 1000)
                  .toISOString().substring(0, 10),
                  epf1:  echographie1.epf1,
                  epf2:  echographie1.epf2,
                  id:  echographie1.id,
                  la1: echographie1.la1,
                  la2: echographie1.la2,                  
                  lcc1:  echographie1.lcc1,
                  lcc2:  echographie1.lcc2,
                  medecin : echographie1.medecin,
                  morphologie1:  echographie1.morphologie1,
                  morphologie2:  echographie1.morphologie2,
                  nombreEmbryon: echographie1.nombreEmbryon,
                  placenta1: echographie1.placenta1,
                  placenta2: echographie1.placenta2,                  
                  precisionSuivi:  echographie1.precisionSuivi,
                  presentation1:  echographie1.presentation1,
                  presentation2:  echographie1.presentation2,
                  suiviCsSF: echographie1.suiviCsSF,
                  t:  echographie1.t,
                  terme:  echographie1.terme,
                  type: echographie1.type,
                  voieAccouchement: echographie1.voieAccouchement
                });
                 
      
                break;

              case this.echographie_3:
                this.loadingEchographie3 =true
                this.addOrUpdateEchographie3.disable();
                this.addOrUpdateEchographie3.setValue( {
                  bip1: echographie1.bip1,
                  bip2: echographie1.bip2,
                  ca1: echographie1.ca1,
                  ca2: echographie1.ca2,
                  lf1: echographie1.lf1,
                  lf2: echographie1.lf2,
                  opn1: echographie1.opn1,
                  opn2: echographie1.opn2,
                  cn1:  echographie1.cn1,
                  cn2:  echographie1.cn2,
                  col: echographie1.col,
                  conclusion1:  echographie1.conclusion1,
                  conclusion2:  echographie1.conclusion2,
                  date:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  ddr: new Date(this.ddr * 1000)
                  .toISOString().substring(0, 10),
                  epf1:  echographie1.epf1,
                  epf2:  echographie1.epf2,
                  id:  echographie1.id,
                  la1: echographie1.la1,
                  la2: echographie1.la2,
                  lcc1:  echographie1.lcc1,
                  lcc2:  echographie1.lcc2,
                  medecin : echographie1.medecin,
                  morphologie1:  echographie1.morphologie1,
                  morphologie2:  echographie1.morphologie2,
                  nombreEmbryon: echographie1.nombreEmbryon,
                  placenta1: echographie1.placenta1,
                  placenta2: echographie1.placenta2,
                  precisionSuivi:  echographie1.precisionSuivi,
                  presentation1:  echographie1.presentation1,
                  presentation2:  echographie1.presentation2,
                  suiviCsSF: echographie1.suiviCsSF,
                  t:  echographie1.t,
                  terme:  echographie1.terme,
                  type: echographie1.type,
                  voieAccouchement: echographie1.voieAccouchement
                });
                break; 

          case this.echographie:
                this.loadingEchographie =true
                this.addOrUpdateEchographie.disable();
                this.addOrUpdateEchographie.setValue( {
                  bip1: echographie1.bip1,
                  bip2: echographie1.bip2,
                  ca1: echographie1.ca1,
                  ca2: echographie1.ca2,
                  lf1: echographie1.lf1,
                  lf2: echographie1.lf2,
                  opn1: echographie1.opn1,
                  opn2: echographie1.opn2,
                  cn1:  echographie1.cn1,
                  cn2:  echographie1.cn2,
                  col: echographie1.col,
                  conclusion1:  echographie1.conclusion1,
                  conclusion2:  echographie1.conclusion2,
                  date:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  ddr: new Date(this.ddr * 1000)
                  .toISOString().substring(0, 10),
                  epf1:  echographie1.epf1,
                  epf2:  echographie1.epf2,
                  id:  echographie1.id,
                  la1: echographie1.la1,
                  la2: echographie1.la2,
                  lcc1:  echographie1.lcc1,
                  lcc2:  echographie1.lcc2,
                  medecin : echographie1.medecin,
                  morphologie1:  echographie1.morphologie1,
                  morphologie2:  echographie1.morphologie2,
                  nombreEmbryon: echographie1.nombreEmbryon,
                  placenta1: echographie1.placenta1,
                  placenta2: echographie1.placenta2,
                  precisionSuivi:  echographie1.precisionSuivi,
                  presentation1:  echographie1.presentation1,
                  presentation2:  echographie1.presentation2,
                  suiviCsSF: echographie1.suiviCsSF,
                  t:  echographie1.t,
                  terme:  echographie1.terme,
                  type: echographie1.type,
                  voieAccouchement: echographie1.voieAccouchement
                });
                 

                break; 
                case this.echographie_autre:
                  this.loadingEchographieAutre =true
                  this.addOrUpdateEchographieAutre.disable();
                  this.addOrUpdateEchographieAutre.setValue( {
                    bip1: echographie1.bip1,
                    bip2: echographie1.bip2,
                    ca1: echographie1.ca1,
                    ca2: echographie1.ca2,
                    lf1: echographie1.lf1,
                    lf2: echographie1.lf2,
                    opn1: echographie1.opn1,
                    opn2: echographie1.opn2,
                    cn1:  echographie1.cn1,
                    cn2:  echographie1.cn2,
                    col: echographie1.col,
                    conclusion1:  echographie1.conclusion1,
                    conclusion2:  echographie1.conclusion2,
                    date:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                    .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                    ddr: new Date(this.ddr * 1000)
                    .toISOString().substring(0, 10),
                    epf1:  echographie1.epf1,
                    epf2:  echographie1.epf2,
                    id:  echographie1.id,
                    la1: echographie1.la1,
                    la2: echographie1.la2,
                    lcc1:  echographie1.lcc1,
                    lcc2:  echographie1.lcc2,
                    medecin : echographie1.medecin,
                    morphologie1:  echographie1.morphologie1,
                    morphologie2:  echographie1.morphologie2,
                    nombreEmbryon: echographie1.nombreEmbryon,
                    placenta1: echographie1.placenta,
                    placenta2: echographie1.placenta,
                    precisionSuivi:  echographie1.precisionSuivi,
                    presentation1:  echographie1.presentation1,
                    presentation2:  echographie1.presentation2,
                    suiviCsSF: echographie1.suiviCsSF,
                    t:  echographie1.t,
                    terme:  echographie1.terme,
                    type: echographie1.type,
                    voieAccouchement: echographie1.voieAccouchement
                  });
                   
  
                  break; 
                          
                     }
        

            item++;
           }
          
      } 
    )
    
  }
  
  PrenatalLoad(){
    this.patientService.find(this.getPatientId()).subscribe( p=> {
      this.dateNaissance=Math.ceil(Math.abs(+new Date().getTime() - +new Date(p['result'].doB * 1000).getTime())/ (1000 * 60 * 60 * 24))
      this.updateFormPrenatal.patchValue({
        age:                   Math.trunc(this.dateNaissance /365),
      })
    })
    const detailsDossierPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.patientService.findDossierPrenatal(this.getPatientId()) 
    :  this.patientService.getAllDossierPrenatals(this.getPatientId()).pipe(map( p =>p['result'].filter( p => p.id ==localStorage.getItem("dossierPrenatalAvoir"))));
  
    detailsDossierPrenatal.subscribe( p => {
      this.updateFormPrenatal.patchValue({   
        age:                   (localStorage.getItem("dossierPrenatalAvoir") == null)? Math.trunc(this.dateNaissance /365) : p[0].age,       
        ageConjoint:           (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.ageConjoint : p[0].ageConjoint,
        groupSanguin:          (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.groupSanguin: p[0].groupSanguin,
        id:                    (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id: p[0].id,
        nationaliteConjoint:   (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.nationaliteConjoint: p[0].nationaliteConjoint,
        nombreEpousesConjoint: (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.nombreEpousesConjoint: p[0].nombreEpousesConjoint,
        praticien:             (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.praticien: p[0].praticien,
        profession:            (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.profession: p[0].profession,
        professionConjoint:    (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.professionConjoint: p[0].professionConjoint,
        rhesus:                (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.rhesus: p[0].rhesus,
        situationMatrimoniale: (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.situationMatrimoniale: p[0].situationMatrimoniale,
        patientId: this.getPatientId(),
        g:(localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.g: p[0].g,
        p:(localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.p: p[0].p
      }); 
     })

    this.disabled="disabled"
     this.updateFormPrenatal.disable()
 
  }
  ConsultationLoad(){ 
    this.disabled="disabled"
    this.loadingConsultation1 =false,
    this.loadingConsultation2 =false,
    this.loadingConsultation3 =false
    this.loadingConsultation4 =false
    this.loadingConsultation5 =false,
    this.loadingConsultation6 =false,
    this.loadingConsultation7 =false
    this.loadingConsultation8 =false
    this.loadingStaff =false
    this.addOrUpdateConsultation1.disable(); 
    this.addOrUpdateConsultation2.disable(); 
    this.addOrUpdateConsultation3.disable();
    this.addOrUpdateConsultation4.disable();
    this.addOrUpdateConsultation5.disable();
    this.addOrUpdateConsultation6.disable();
    this.addOrUpdateConsultation7.disable();
    this.addOrUpdateConsultation8.disable();
    this.addOrUpdateStaff.disable();
   this.rMessage=""
   this.placeholder="";
    let item :number=0
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.patientService.getAllConsultationsByIdPatientAndIdDossierPrenatal(this.getPatientId(),idDosserPrenatal)
    .subscribe(
      data =>{
            
           console.log(" LISTE CONSULTATION :"+JSON.stringify(data))
           while(data["result"][item] !=null){
            let consultation =data["result"][item];          
             switch(data["result"][item].type){
              case this.consultation_1:
                this.loadingConsultation1=true;                
                this.addOrUpdateConsultation1.disable();
                this.addOrUpdateConsultation1.setValue( {
                  conclusionConduiteAtenir:consultation.conclusionConduiteAtenir,
                  staffAvis: consultation.staffAvis,
                  staffDate: (consultation.date>0) ?new Date(consultation.staffDate * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  staffPresent: consultation.staffPresent,
                  albumine: consultation.albumine,
                  aspect: consultation.aspect,
                  autrePrescriptions: consultation.autrePrescriptions,
                  autres: consultation.autres,
                  bdc: consultation.bdc,
                  bilanPreaccouchement: consultation.bilanPreaccouchement,
                  conclusion: consultation.conclusion,
                  conseilsHygienoDietetique: consultation.conseilsHygienoDietetique,
                  consultationAnesthesie:consultation.consultationAnesthesie,
                  contractionAnormale: (consultation.contractionAnormale == true)? 'oui' : 'non',
                  date: new Date(consultation.date * 1000)
                  .toISOString().substring(0, 10),
                  echoDebutGrossesse: (consultation.echoDebutGrossesse  == true)? 'oui' : 'non',
                  etatGeneral: consultation.etatGeneral,
                  examenAbdomen: consultation.examenAbdomen,
                  examenBassin:consultation.examenBassin,
                  examenBiologique: consultation.examenBiologique,
                  precisionExamen: consultation.precisionExamen,
                  examenSeins: consultation.examenSeins,
                  ferAcideFollique: consultation.ferAcideFollique,
                  hu: consultation.hu,
                  id: consultation.id,
                  ivaIvl: consultation.ivaIvl,
                  maf: (consultation.maf  == true)? 'oui' : 'non',
                  metrorragies: (consultation.metrorragies  == true)? 'oui' : 'non',
                  mildaMmoustiquaireImpregeLongueDuree: consultation.mildaMmoustiquaireImpregeLongueDuree,
                  muqueuses: consultation.muqueuses,
                  nitriteLeuco: consultation.nitriteLeuco,
                  nomDuConsultant: consultation.nomDuConsultant,
                  osullivan: consultation.osullivan,
                  pertes: (consultation.pertes  == true)? 'oui' : 'non',
                  poids: consultation.poids,
                  pouls: consultation.pouls,
                  precisionEchographie: consultation.precisionEchographie,
                  preparationNaissance: consultation.preparationNaissance,
                  prisePoids: consultation.prisePoids,
                  prochEcho:  (consultation.prochEcho>0) ?new Date(consultation.prochEcho * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  prochRDV:  (consultation.prochRDV>0) ?new Date(consultation.prochRDV * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  projetNaissance: consultation.projetNaissance,
                  propositionNest: consultation.propositionNest,
                  ptiSp1dose: consultation.ptiSp1dose,
                  ptiSp3dose: consultation.ptiSp3dose,
                  ptiSpRattrapagedose: consultation.ptiSpRattrapagedose,
                  ptmePreventionTransmissionMereEnfant: consultation.ptmePreventionTransmissionMereEnfant,
                  qualification: consultation.qualification,
                  rdvTerme: (consultation.rdvTerme>0) ?new Date(consultation.rdvTerme * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  resulatEchographie1: consultation.resulatEchographie1,
                  resulatEchographie2:consultation.resulatEchographie2,
                  resulatEchographie3: consultation.resulatEchographie3,
                  signeParticulier: consultation.signeParticulier,
                  speculum: consultation.speculum,
                  sucre: consultation.sucre,
                  surveillanceFinGrossesse: consultation.surveillanceFinGrossesse,
                  ta: consultation.ta,
                  termeSA: consultation.termeSA,
                  troubleUrinaires: (consultation.troubleUrinaires  == true)? 'oui' : 'non',
                  tv: consultation.tv,
                  type: consultation.type,
                  urgence: (consultation.urgence == true)? 'oui' : 'non',
                  vaccinationAprevoir:consultation.vaccinationAprevoir,
                  voieAccouchementValidee: consultation.voieAccouchementValidee
                });
                 
      
                break;
              case this.consultation_2:
                  this.loadingConsultation2=true;                
                  this.addOrUpdateConsultation2.disable();
                  this.addOrUpdateConsultation2.setValue( {
                    conclusionConduiteAtenir:consultation.conclusionConduiteAtenir,
                    staffAvis: consultation.staffAvis,
                    staffDate: (consultation.date>0) ?new Date(consultation.staffDate * 1000)
                    .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                    staffPresent: consultation.staffPresent,  
                    albumine: consultation.albumine,
                    aspect: consultation.aspect,
                    autrePrescriptions: consultation.autrePrescriptions,
                    autres: consultation.autres,
                    bdc: consultation.bdc,
                    bilanPreaccouchement: consultation.bilanPreaccouchement,
                    conclusion: consultation.conclusion,
                    conseilsHygienoDietetique: consultation.conseilsHygienoDietetique,
                    consultationAnesthesie:consultation.consultationAnesthesie,
                    contractionAnormale: (consultation.contractionAnormale == true)? 'oui' : 'non',
                    date: (consultation.date>0) ?new Date(consultation.date * 1000)
                    .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                    echoDebutGrossesse: (consultation.echoDebutGrossesse  == true)? 'oui' : 'non',
                    etatGeneral: consultation.etatGeneral,
                    examenAbdomen: consultation.examenAbdomen,
                    examenBassin:consultation.examenBassin,
                    examenBiologique: consultation.examenBiologique,
                    precisionExamen: consultation.precisionExamen,
                    examenSeins: consultation.examenSeins,
                    ferAcideFollique: consultation.ferAcideFollique,
                    hu: consultation.hu,
                    id: consultation.id,
                    ivaIvl: consultation.ivaIvl,
                    maf: (consultation.maf  == true)? 'oui' : 'non',
                    metrorragies: (consultation.metrorragies  == true)? 'oui' : 'non',
                    mildaMmoustiquaireImpregeLongueDuree: consultation.mildaMmoustiquaireImpregeLongueDuree,
                    muqueuses: consultation.muqueuses,
                    nitriteLeuco: consultation.nitriteLeuco,
                    nomDuConsultant: consultation.nomDuConsultant,
                    osullivan: consultation.osullivan,
                    pertes: (consultation.pertes  == true)? 'oui' : 'non',
                    poids: consultation.poids,
                    pouls: consultation.pouls,
                    precisionEchographie: consultation.precisionEchographie,
                    preparationNaissance: consultation.preparationNaissance,
                    prisePoids: consultation.prisePoids,
                    prochEcho:  (consultation.prochEcho>0) ?new Date(consultation.prochEcho * 1000)
                    .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                    prochRDV:  (consultation.prochRDV>0) ?new Date(consultation.prochRDV * 1000)
                    .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                    projetNaissance: consultation.projetNaissance,
                    propositionNest: consultation.propositionNest,
                    ptiSp1dose: consultation.ptiSp1dose,
                    ptiSp3dose: consultation.ptiSp3dose,
                    ptiSpRattrapagedose: consultation.ptiSpRattrapagedose,
                    ptmePreventionTransmissionMereEnfant: consultation.ptmePreventionTransmissionMereEnfant,
                    qualification: consultation.qualification,
                    rdvTerme: (consultation.rdvTerme>0) ?new Date(consultation.rdvTerme * 1000)
                    .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                    resulatEchographie1: consultation.resulatEchographie1,
                    resulatEchographie2:consultation.resulatEchographie2,
                    resulatEchographie3: consultation.resulatEchographie3,
                    signeParticulier: consultation.signeParticulier,
                    speculum: consultation.speculum,
                    sucre: consultation.sucre,
                    surveillanceFinGrossesse: consultation.surveillanceFinGrossesse,
                    ta: consultation.ta,
                    termeSA: consultation.termeSA,
                    troubleUrinaires: (consultation.troubleUrinaires  == true)? 'oui' : 'non',
                    tv: consultation.tv,
                    type: consultation.type,
                    urgence: (consultation.urgence == true)? 'oui' : 'non',
                    vaccinationAprevoir:consultation.vaccinationAprevoir,
                    voieAccouchementValidee: consultation.voieAccouchementValidee
                  });
                   
        
                  break;
                  case this.consultation_3:
                    this.loadingConsultation3=true;                
                    this.addOrUpdateConsultation3.disable();
                    this.addOrUpdateConsultation3.setValue( {
                      conclusionConduiteAtenir:consultation.conclusionConduiteAtenir,
                      staffAvis: consultation.staffAvis,
                      staffDate: (consultation.date>0) ?new Date(consultation.staffDate * 1000)
                      .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                      staffPresent: consultation.staffPresent,
                      albumine: consultation.albumine,
                      aspect: consultation.aspect,
                      autrePrescriptions: consultation.autrePrescriptions,
                      autres: consultation.autres,
                      bdc: consultation.bdc,
                      bilanPreaccouchement: consultation.bilanPreaccouchement,
                      conclusion: consultation.conclusion,
                      conseilsHygienoDietetique: consultation.conseilsHygienoDietetique,
                      consultationAnesthesie:consultation.consultationAnesthesie,
                      contractionAnormale: (consultation.contractionAnormale == true)? 'oui' : 'non',
                      date: (consultation.date>0) ?new Date(consultation.date * 1000)
                      .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                      echoDebutGrossesse: (consultation.echoDebutGrossesse  == true)? 'oui' : 'non',
                      etatGeneral: consultation.etatGeneral,
                      examenAbdomen: consultation.examenAbdomen,
                      examenBassin:consultation.examenBassin,
                      examenBiologique: consultation.examenBiologique,
                      precisionExamen: consultation.precisionExamen,
                      examenSeins: consultation.examenSeins,
                      ferAcideFollique: consultation.ferAcideFollique,
                      hu: consultation.hu,
                      id: consultation.id,
                      ivaIvl: consultation.ivaIvl,
                      maf: (consultation.maf  == true)? 'oui' : 'non',
                      metrorragies: (consultation.metrorragies  == true)? 'oui' : 'non',
                      mildaMmoustiquaireImpregeLongueDuree: consultation.mildaMmoustiquaireImpregeLongueDuree,
                      muqueuses: consultation.muqueuses,
                      nitriteLeuco: consultation.nitriteLeuco,
                      nomDuConsultant: consultation.nomDuConsultant,
                      osullivan: consultation.osullivan,
                      pertes: (consultation.pertes  == true)? 'oui' : 'non',
                      poids: consultation.poids,
                      pouls: consultation.pouls,
                      precisionEchographie: consultation.precisionEchographie,
                      preparationNaissance: consultation.preparationNaissance,
                      prisePoids: consultation.prisePoids,
                      prochEcho:  (consultation.prochEcho>0) ?new Date(consultation.prochEcho * 1000)
                      .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                      prochRDV:  (consultation.prochRDV>0) ?new Date(consultation.prochRDV * 1000)
                      .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                      projetNaissance: consultation.projetNaissance,
                      propositionNest: consultation.propositionNest,
                      ptiSp1dose: consultation.ptiSp1dose,
                      ptiSp3dose: consultation.ptiSp3dose,
                      ptiSpRattrapagedose: consultation.ptiSpRattrapagedose,
                      ptmePreventionTransmissionMereEnfant: consultation.ptmePreventionTransmissionMereEnfant,
                      qualification: consultation.qualification,
                      rdvTerme: (consultation.rdvTerme>0) ?new Date(consultation.rdvTerme * 1000)
                      .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                      resulatEchographie1: consultation.resulatEchographie1,
                      resulatEchographie2:consultation.resulatEchographie2,
                      resulatEchographie3: consultation.resulatEchographie3,
                      signeParticulier: consultation.signeParticulier,
                      speculum: consultation.speculum,
                      sucre: consultation.sucre,
                      surveillanceFinGrossesse: consultation.surveillanceFinGrossesse,
                      ta: consultation.ta,
                      termeSA: consultation.termeSA,
                      troubleUrinaires: (consultation.troubleUrinaires  == true)? 'oui' : 'non',
                      tv: consultation.tv,
                      type: consultation.type,
                      urgence: (consultation.urgence == true)? 'oui' : 'non',
                      vaccinationAprevoir:consultation.vaccinationAprevoir,
                      voieAccouchementValidee: consultation.voieAccouchementValidee
                    });

                    break;
                      
              case this.consultation_4:
                    this.loadingConsultation4=true;                
                    this.addOrUpdateConsultation4.disable();
                    this.addOrUpdateConsultation4.setValue( {
                      conclusionConduiteAtenir:consultation.conclusionConduiteAtenir,
                    staffAvis: consultation.staffAvis,
                    staffDate: (consultation.date>0) ?new Date(consultation.staffDate * 1000)
                    .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                    staffPresent: consultation.staffPresent,
                      albumine: consultation.albumine,
                      aspect: consultation.aspect,
                      autrePrescriptions: consultation.autrePrescriptions,
                      autres: consultation.autres,
                      bdc: consultation.bdc,
                      bilanPreaccouchement: consultation.bilanPreaccouchement,
                      conclusion: consultation.conclusion,
                      conseilsHygienoDietetique: consultation.conseilsHygienoDietetique,
                      consultationAnesthesie:consultation.consultationAnesthesie,
                      contractionAnormale: (consultation.contractionAnormale == true)? 'oui' : 'non',
                      date: (consultation.date>0) ?new Date(consultation.date * 1000)
                      .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                      echoDebutGrossesse: (consultation.echoDebutGrossesse  == true)? 'oui' : 'non',
                      etatGeneral: consultation.etatGeneral,
                      examenAbdomen: consultation.examenAbdomen,
                      examenBassin:consultation.examenBassin,
                      examenBiologique: consultation.examenBiologique,
                      precisionExamen: consultation.precisionExamen,
                      examenSeins: consultation.examenSeins,
                      ferAcideFollique: consultation.ferAcideFollique,
                      hu: consultation.hu,
                      id: consultation.id,
                      ivaIvl: consultation.ivaIvl,
                      maf: (consultation.maf  == true)? 'oui' : 'non',
                      metrorragies: (consultation.metrorragies  == true)? 'oui' : 'non',
                      mildaMmoustiquaireImpregeLongueDuree: consultation.mildaMmoustiquaireImpregeLongueDuree,
                      muqueuses: consultation.muqueuses,
                      nitriteLeuco: consultation.nitriteLeuco,
                      nomDuConsultant: consultation.nomDuConsultant,
                      osullivan: consultation.osullivan,
                      pertes: (consultation.pertes  == true)? 'oui' : 'non',
                      poids: consultation.poids,
                      pouls: consultation.pouls,
                      precisionEchographie: consultation.precisionEchographie,
                      preparationNaissance: consultation.preparationNaissance,
                      prisePoids: consultation.prisePoids,
                      prochEcho:  new Date(consultation.prochEcho * 1000)
                      .toISOString().substring(0, 10),
                      prochRDV: new Date(consultation.prochRDV * 1000)
                      .toISOString().substring(0, 10),
                      projetNaissance: consultation.projetNaissance,
                      propositionNest: consultation.propositionNest,
                      ptiSp1dose: consultation.ptiSp1dose,
                      ptiSp3dose: consultation.ptiSp3dose,
                      ptiSpRattrapagedose: consultation.ptiSpRattrapagedose,
                      ptmePreventionTransmissionMereEnfant: consultation.ptmePreventionTransmissionMereEnfant,
                      qualification: consultation.qualification,
                      rdvTerme: (consultation.rdvTerme>0) ?new Date(consultation.rdvTerme * 1000)
                      .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),                
                      resulatEchographie1: consultation.resulatEchographie1,
                      resulatEchographie2:consultation.resulatEchographie2,
                      resulatEchographie3: consultation.resulatEchographie3,
                      signeParticulier: consultation.signeParticulier,
                      speculum: consultation.speculum,
                      sucre: consultation.sucre,
                      surveillanceFinGrossesse: consultation.surveillanceFinGrossesse,
                      ta: consultation.ta,
                      termeSA: consultation.termeSA,
                      troubleUrinaires: (consultation.troubleUrinaires  == true)? 'oui' : 'non',
                      tv: consultation.tv,
                      type: consultation.type,
                      urgence: (consultation.urgence == true)? 'oui' : 'non',
                      vaccinationAprevoir:consultation.vaccinationAprevoir,
                      voieAccouchementValidee: consultation.voieAccouchementValidee
                    });
                     
          
                    break;
              case this.consultation_5:
                  this.loadingConsultation5=true;                
                  this.addOrUpdateConsultation5.disable();
                  this.addOrUpdateConsultation5.setValue( {
                    conclusionConduiteAtenir:consultation.conclusionConduiteAtenir,
                  staffAvis: consultation.staffAvis,
                  staffDate: (consultation.date>0) ?new Date(consultation.staffDate * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  staffPresent: consultation.staffPresent,
                    albumine: consultation.albumine,
                    aspect: consultation.aspect,
                    autrePrescriptions: consultation.autrePrescriptions,
                    autres: consultation.autres,
                    bdc: consultation.bdc,
                    bilanPreaccouchement: consultation.bilanPreaccouchement,
                    conclusion: consultation.conclusion,
                    conseilsHygienoDietetique: consultation.conseilsHygienoDietetique,
                    consultationAnesthesie:consultation.consultationAnesthesie,
                    contractionAnormale: (consultation.contractionAnormale == true)? 'oui' : 'non',
                    date: (consultation.date>0) ?new Date(consultation.date * 1000)
                    .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                    echoDebutGrossesse: (consultation.echoDebutGrossesse  == true)? 'oui' : 'non',
                    etatGeneral: consultation.etatGeneral,
                    examenAbdomen: consultation.examenAbdomen,
                    examenBassin:consultation.examenBassin,
                    examenBiologique: consultation.examenBiologique,
                    precisionExamen: consultation.precisionExamen,
                    examenSeins: consultation.examenSeins,
                    ferAcideFollique: consultation.ferAcideFollique,
                    hu: consultation.hu,
                    id: consultation.id,
                    ivaIvl: consultation.ivaIvl,
                    maf: (consultation.maf  == true)? 'oui' : 'non',
                    metrorragies: (consultation.metrorragies  == true)? 'oui' : 'non',
                    mildaMmoustiquaireImpregeLongueDuree: consultation.mildaMmoustiquaireImpregeLongueDuree,
                    muqueuses: consultation.muqueuses,
                    nitriteLeuco: consultation.nitriteLeuco,
                    nomDuConsultant: consultation.nomDuConsultant,
                    osullivan: consultation.osullivan,
                    pertes: (consultation.pertes  == true)? 'oui' : 'non',
                    poids: consultation.poids,
                    pouls: consultation.pouls,
                    precisionEchographie: consultation.precisionEchographie,
                    preparationNaissance: consultation.preparationNaissance,
                    prisePoids: consultation.prisePoids,
                    prochEcho:  new Date(consultation.prochEcho * 1000)
                    .toISOString().substring(0, 10),
                    prochRDV: new Date(consultation.prochRDV * 1000)
                    .toISOString().substring(0, 10),
                    projetNaissance: consultation.projetNaissance,
                    propositionNest: consultation.propositionNest,
                    ptiSp1dose: consultation.ptiSp1dose,
                    ptiSp3dose: consultation.ptiSp3dose,
                    ptiSpRattrapagedose: consultation.ptiSpRattrapagedose,
                    ptmePreventionTransmissionMereEnfant: consultation.ptmePreventionTransmissionMereEnfant,
                    qualification: consultation.qualification,
                    rdvTerme: (consultation.rdvTerme>0) ?new Date(consultation.rdvTerme * 1000)
                    .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                    resulatEchographie1: consultation.resulatEchographie1,
                    resulatEchographie2:consultation.resulatEchographie2,
                    resulatEchographie3: consultation.resulatEchographie3,
                    signeParticulier: consultation.signeParticulier,
                    speculum: consultation.speculum,
                    sucre: consultation.sucre,
                    surveillanceFinGrossesse: consultation.surveillanceFinGrossesse,
                    ta: consultation.ta,
                    termeSA: consultation.termeSA,
                    troubleUrinaires: (consultation.troubleUrinaires  == true)? 'oui' : 'non',
                    tv: consultation.tv,
                    type: consultation.type,
                    urgence: (consultation.urgence == true)? 'oui' : 'non',
                    vaccinationAprevoir:consultation.vaccinationAprevoir,
                    voieAccouchementValidee: consultation.voieAccouchementValidee
                  });
                   
        
                  break;
              case this.consultation_6:
                    this.loadingConsultation6=true;                
                    this.addOrUpdateConsultation6.disable();
                    this.addOrUpdateConsultation6.setValue( {
                      conclusionConduiteAtenir:consultation.conclusionConduiteAtenir,
                  staffAvis: consultation.staffAvis,
                  staffDate: (consultation.date>0) ?new Date(consultation.staffDate * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  staffPresent: consultation.staffPresent,
                      albumine: consultation.albumine,
                      aspect: consultation.aspect,
                      autrePrescriptions: consultation.autrePrescriptions,
                      autres: consultation.autres,
                      bdc: consultation.bdc,
                      bilanPreaccouchement: consultation.bilanPreaccouchement,
                      conclusion: consultation.conclusion,
                      conseilsHygienoDietetique: consultation.conseilsHygienoDietetique,
                      consultationAnesthesie:consultation.consultationAnesthesie,
                      contractionAnormale: (consultation.contractionAnormale == true)? 'oui' : 'non',
                      date: (consultation.date>0) ?new Date(consultation.date * 1000)
                      .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                      echoDebutGrossesse: (consultation.echoDebutGrossesse  == true)? 'oui' : 'non',
                      etatGeneral: consultation.etatGeneral,
                      examenAbdomen: consultation.examenAbdomen,
                      examenBassin:consultation.examenBassin,
                      examenBiologique: consultation.examenBiologique,
                      precisionExamen: consultation.precisionExamen,
                      examenSeins: consultation.examenSeins,
                      ferAcideFollique: consultation.ferAcideFollique,
                      hu: consultation.hu,
                      id: consultation.id,
                      ivaIvl: consultation.ivaIvl,
                      maf: (consultation.maf  == true)? 'oui' : 'non',
                      metrorragies: (consultation.metrorragies  == true)? 'oui' : 'non',
                      mildaMmoustiquaireImpregeLongueDuree: consultation.mildaMmoustiquaireImpregeLongueDuree,
                      muqueuses: consultation.muqueuses,
                      nitriteLeuco: consultation.nitriteLeuco,
                      nomDuConsultant: consultation.nomDuConsultant,
                      osullivan: consultation.osullivan,
                      pertes: (consultation.pertes  == true)? 'oui' : 'non',
                      poids: consultation.poids,
                      pouls: consultation.pouls,
                      precisionEchographie: consultation.precisionEchographie,
                      preparationNaissance: consultation.preparationNaissance,
                      prisePoids: consultation.prisePoids,
                      prochEcho:  new Date(consultation.prochEcho * 1000)
                      .toISOString().substring(0, 10),
                      prochRDV: new Date(consultation.prochRDV * 1000)
                      .toISOString().substring(0, 10),
                      projetNaissance: consultation.projetNaissance,
                      propositionNest: consultation.propositionNest,
                      ptiSp1dose: consultation.ptiSp1dose,
                      ptiSp3dose: consultation.ptiSp3dose,
                      ptiSpRattrapagedose: consultation.ptiSpRattrapagedose,
                      ptmePreventionTransmissionMereEnfant: consultation.ptmePreventionTransmissionMereEnfant,
                      qualification: consultation.qualification,
                      rdvTerme: (consultation.rdvTerme>0) ?new Date(consultation.rdvTerme * 1000)
                     .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                      resulatEchographie1: consultation.resulatEchographie1,
                      resulatEchographie2:consultation.resulatEchographie2,
                      resulatEchographie3: consultation.resulatEchographie3,
                      signeParticulier: consultation.signeParticulier,
                      speculum: consultation.speculum,
                      sucre: consultation.sucre,
                      surveillanceFinGrossesse: consultation.surveillanceFinGrossesse,
                      ta: consultation.ta,
                      termeSA: consultation.termeSA,
                      troubleUrinaires: (consultation.troubleUrinaires  == true)? 'oui' : 'non',
                      tv: consultation.tv,
                      type: consultation.type,
                      urgence: (consultation.urgence == true)? 'oui' : 'non',
                      vaccinationAprevoir:consultation.vaccinationAprevoir,
                      voieAccouchementValidee: consultation.voieAccouchementValidee
                    });
                     
          
                    break;
              case this.consultation_7:
                      this.loadingConsultation7=true;                
                      this.addOrUpdateConsultation7.disable();
                      this.addOrUpdateConsultation7.setValue( {
                        conclusionConduiteAtenir:consultation.conclusionConduiteAtenir,
                        staffAvis: consultation.staffAvis,
                        staffDate: (consultation.date>0) ?new Date(consultation.staffDate * 1000)
                        .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                        staffPresent: consultation.staffPresent,      
                        albumine: consultation.albumine,
                        aspect: consultation.aspect,
                        autrePrescriptions: consultation.autrePrescriptions,
                        autres: consultation.autres,
                        bdc: consultation.bdc,
                        bilanPreaccouchement: consultation.bilanPreaccouchement,
                        conclusion: consultation.conclusion,
                        conseilsHygienoDietetique: consultation.conseilsHygienoDietetique,
                        consultationAnesthesie:consultation.consultationAnesthesie,
                        contractionAnormale: (consultation.contractionAnormale == true)? 'oui' : 'non',
                        date: (consultation.date>0) ?new Date(consultation.date * 1000)
                        .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                        echoDebutGrossesse: (consultation.echoDebutGrossesse  == true)? 'oui' : 'non',
                        etatGeneral: consultation.etatGeneral,
                        examenAbdomen: consultation.examenAbdomen,
                        examenBassin:consultation.examenBassin,
                        examenBiologique: consultation.examenBiologique,
                        precisionExamen: consultation.precisionExamen,
                        examenSeins: consultation.examenSeins,
                        ferAcideFollique: consultation.ferAcideFollique,
                        hu: consultation.hu,
                        id: consultation.id,
                        ivaIvl: consultation.ivaIvl,
                        maf: (consultation.maf  == true)? 'oui' : 'non',
                        metrorragies: (consultation.metrorragies  == true)? 'oui' : 'non',
                        mildaMmoustiquaireImpregeLongueDuree: consultation.mildaMmoustiquaireImpregeLongueDuree,
                        muqueuses: consultation.muqueuses,
                        nitriteLeuco: consultation.nitriteLeuco,
                        nomDuConsultant: consultation.nomDuConsultant,
                        osullivan: consultation.osullivan,
                        pertes: (consultation.pertes  == true)? 'oui' : 'non',
                        poids: consultation.poids,
                        pouls: consultation.pouls,
                        precisionEchographie: consultation.precisionEchographie,
                        preparationNaissance: consultation.preparationNaissance,
                        prisePoids: consultation.prisePoids,
                        prochEcho:  new Date(consultation.prochEcho * 1000)
                        .toISOString().substring(0, 10),
                        prochRDV: new Date(consultation.prochRDV * 1000)
                        .toISOString().substring(0, 10),
                        projetNaissance: consultation.projetNaissance,
                        propositionNest: consultation.propositionNest,
                        ptiSp1dose: consultation.ptiSp1dose,
                        ptiSp3dose: consultation.ptiSp3dose,
                        ptiSpRattrapagedose: consultation.ptiSpRattrapagedose,
                        ptmePreventionTransmissionMereEnfant: consultation.ptmePreventionTransmissionMereEnfant,
                        qualification: consultation.qualification,
                        rdvTerme: (consultation.rdvTerme>0) ?new Date(consultation.rdvTerme * 1000)
                        .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                        resulatEchographie1: consultation.resulatEchographie1,
                        resulatEchographie2:consultation.resulatEchographie2,
                        resulatEchographie3: consultation.resulatEchographie3,
                        signeParticulier: consultation.signeParticulier,
                        speculum: consultation.speculum,
                        sucre: consultation.sucre,
                        surveillanceFinGrossesse: consultation.surveillanceFinGrossesse,
                        ta: consultation.ta,
                        termeSA: consultation.termeSA,
                        troubleUrinaires: (consultation.troubleUrinaires  == true)? 'oui' : 'non',
                        tv: consultation.tv,
                        type: consultation.type,
                        urgence: (consultation.urgence == true)? 'oui' : 'non',
                        vaccinationAprevoir:consultation.vaccinationAprevoir,
                        voieAccouchementValidee: consultation.voieAccouchementValidee
                      });
                       
            
                      break;
              case this.consultation_8:
                        this.loadingConsultation8=true;                
                        this.addOrUpdateConsultation8.disable();
                        this.addOrUpdateConsultation8.setValue( {
                          conclusionConduiteAtenir:consultation.conclusionConduiteAtenir,
                  staffAvis: consultation.staffAvis,
                  staffDate: (consultation.date>0) ?new Date(consultation.staffDate * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  staffPresent: consultation.staffPresent,
                          albumine: consultation.albumine,
                          aspect: consultation.aspect,
                          autrePrescriptions: consultation.autrePrescriptions,
                          autres: consultation.autres,
                          bdc: consultation.bdc,
                          bilanPreaccouchement: consultation.bilanPreaccouchement,
                          conclusion: consultation.conclusion,
                          conseilsHygienoDietetique: consultation.conseilsHygienoDietetique,
                          consultationAnesthesie:consultation.consultationAnesthesie,
                          contractionAnormale: (consultation.contractionAnormale == true)? 'oui' : 'non',
                          date: (consultation.date>0) ?new Date(consultation.date * 1000)
                          .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                          echoDebutGrossesse: (consultation.echoDebutGrossesse  == true)? 'oui' : 'non',
                          etatGeneral: consultation.etatGeneral,
                          examenAbdomen: consultation.examenAbdomen,
                          examenBassin:consultation.examenBassin,
                          examenBiologique: consultation.examenBiologique,
                          precisionExamen: consultation.precisionExamen,
                          examenSeins: consultation.examenSeins,
                          ferAcideFollique: consultation.ferAcideFollique,
                          hu: consultation.hu,
                          id: consultation.id,
                          ivaIvl: consultation.ivaIvl,
                          maf: (consultation.maf  == true)? 'oui' : 'non',
                          metrorragies: (consultation.metrorragies  == true)? 'oui' : 'non',
                          mildaMmoustiquaireImpregeLongueDuree: consultation.mildaMmoustiquaireImpregeLongueDuree,
                          muqueuses: consultation.muqueuses,
                          nitriteLeuco: consultation.nitriteLeuco,
                          nomDuConsultant: consultation.nomDuConsultant,
                          osullivan: consultation.osullivan,
                          pertes: (consultation.pertes  == true)? 'oui' : 'non',
                          poids: consultation.poids,
                          pouls: consultation.pouls,
                          precisionEchographie: consultation.precisionEchographie,
                          preparationNaissance: consultation.preparationNaissance,
                          prisePoids: consultation.prisePoids,
                          prochEcho:  new Date(consultation.prochEcho * 1000)
                          .toISOString().substring(0, 10),
                          prochRDV: new Date(consultation.prochRDV * 1000)
                          .toISOString().substring(0, 10),
                          projetNaissance: consultation.projetNaissance,
                          propositionNest: consultation.propositionNest,
                          ptiSp1dose: consultation.ptiSp1dose,
                          ptiSp3dose: consultation.ptiSp3dose,
                          ptiSpRattrapagedose: consultation.ptiSpRattrapagedose,
                          ptmePreventionTransmissionMereEnfant: consultation.ptmePreventionTransmissionMereEnfant,
                          qualification: consultation.qualification,
                          rdvTerme: (consultation.rdvTerme>0) ?new Date(consultation.rdvTerme * 1000)
                          .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),                          resulatEchographie1: consultation.resulatEchographie1,
                          resulatEchographie2:consultation.resulatEchographie2,
                          resulatEchographie3: consultation.resulatEchographie3,
                          signeParticulier: consultation.signeParticulier,
                          speculum: consultation.speculum,
                          sucre: consultation.sucre,
                          surveillanceFinGrossesse: consultation.surveillanceFinGrossesse,
                          ta: consultation.ta,
                          termeSA: consultation.termeSA,
                          troubleUrinaires: (consultation.troubleUrinaires  == true)? 'oui' : 'non',
                          tv: consultation.tv,
                          type: consultation.type,
                          urgence: (consultation.urgence == true)? 'oui' : 'non',
                          vaccinationAprevoir:consultation.vaccinationAprevoir,
                          voieAccouchementValidee: consultation.voieAccouchementValidee
                        });
                         
              
                        break;
              case this.staff:
                          this.loadingStaff=true;                
                          this.addOrUpdateStaff.disable();
                          this.addOrUpdateStaff.setValue( {
                            conclusionConduiteAtenir:consultation.conclusionConduiteAtenir,
                            staffAvis: consultation.staffAvis,
                            staffDate: (consultation.date>0) ?new Date(consultation.staffDate * 1000)
                            .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                            staffPresent: consultation.staffPresent,          
                            albumine: consultation.albumine,
                            aspect: consultation.aspect,
                            autrePrescriptions: consultation.autrePrescriptions,
                            autres: consultation.autres,
                            bdc: consultation.bdc,
                            bilanPreaccouchement: consultation.bilanPreaccouchement,
                            conclusion: consultation.conclusion,
                            conseilsHygienoDietetique: consultation.conseilsHygienoDietetique,
                            consultationAnesthesie:consultation.consultationAnesthesie,
                            contractionAnormale: (consultation.contractionAnormale == true)? 'oui' : 'non',
                            date: (consultation.date>0) ?new Date(consultation.date * 1000)
                            .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                            echoDebutGrossesse: (consultation.echoDebutGrossesse  == true)? 'oui' : 'non',
                            etatGeneral: consultation.etatGeneral,
                            examenAbdomen: consultation.examenAbdomen,
                            examenBassin:consultation.examenBassin,
                            examenBiologique: consultation.examenBiologique,
                            precisionExamen: consultation.precisionExamen,
                            examenSeins: consultation.examenSeins,
                            ferAcideFollique: consultation.ferAcideFollique,
                            hu: consultation.hu,
                            id: consultation.id,
                            ivaIvl: consultation.ivaIvl,
                            maf: (consultation.maf  == true)? 'oui' : 'non',
                            metrorragies: (consultation.metrorragies  == true)? 'oui' : 'non',
                            mildaMmoustiquaireImpregeLongueDuree: consultation.mildaMmoustiquaireImpregeLongueDuree,
                            muqueuses: consultation.muqueuses,
                            nitriteLeuco: consultation.nitriteLeuco,
                            nomDuConsultant: consultation.nomDuConsultant,
                            osullivan: consultation.osullivan,
                            pertes: (consultation.pertes  == true)? 'oui' : 'non',
                            poids: consultation.poids,
                            pouls: consultation.pouls,
                            precisionEchographie: consultation.precisionEchographie,
                            preparationNaissance: consultation.preparationNaissance,
                            prisePoids: consultation.prisePoids,
                            prochEcho:  new Date(consultation.prochEcho * 1000)
                            .toISOString().substring(0, 10),
                            prochRDV: new Date(consultation.prochRDV * 1000)
                            .toISOString().substring(0, 10),
                            projetNaissance: consultation.projetNaissance,
                            propositionNest: consultation.propositionNest,
                            ptiSp1dose: consultation.ptiSp1dose,
                            ptiSp3dose: consultation.ptiSp3dose,
                            ptiSpRattrapagedose: consultation.ptiSpRattrapagedose,
                            ptmePreventionTransmissionMereEnfant: consultation.ptmePreventionTransmissionMereEnfant,
                            qualification: consultation.qualification,
                            rdvTerme: (consultation.rdvTerme>0) ?new Date(consultation.rdvTerme * 1000)
                            .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),    
                            resulatEchographie1: consultation.resulatEchographie1,
                            resulatEchographie2:consultation.resulatEchographie2,
                            resulatEchographie3: consultation.resulatEchographie3,
                            signeParticulier: consultation.signeParticulier,
                            speculum: consultation.speculum,
                            sucre: consultation.sucre,
                            surveillanceFinGrossesse: consultation.surveillanceFinGrossesse,
                            ta: consultation.ta,
                            termeSA: consultation.termeSA,
                            troubleUrinaires: (consultation.troubleUrinaires  == true)? 'oui' : 'non',
                            tv: consultation.tv,
                            type: consultation.type,
                            urgence: (consultation.urgence == true)? 'oui' : 'non',
                            vaccinationAprevoir:consultation.vaccinationAprevoir,
                            voieAccouchementValidee: consultation.voieAccouchementValidee
                          });
                           
                
                          break;
                
            }
        

            item++;
           }
          
      } 
    )
    
  }

  AntecedentLoad(){
    this.addOrUpdateAntecedentConjointForm.disable();
    this.addOrUpdateAntecedentMedMereForm.disable();
    this.addOrUpdateAntecedentMereChirurgicauxForm.disable();
    this.addOrUpdateAntecedentGynecologique.disable();
    this.addOrUpdateAntecedentFamiliauxForm.disable()
    this.disabled ="disabled";
    this.dossierId = ((localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir")).toString();
    const detailsAntecedentConjoint = this.patientService.findGeneric(this.getPatientId(), this.dossierId, 4);
    const detailsAntecedentFamiliaux = this.patientService.findGeneric(this.getPatientId(), this.dossierId, 5);
    const detailsAntecedentsMedicauxMere = this.patientService.findGeneric(this.getPatientId(),this.dossierId,6);
    const detailsAntecedentsChirurgicauxMere = this.patientService.findGeneric(this.getPatientId(),this.dossierId,7);
    const detailsAntecedentsGyneco = this.patientService.findGeneric(this.getPatientId(),this.dossierId,8);
    const detailsAntecedentsObstetricaux = this.patientService.findGeneric(this.getPatientId(),this.dossierId,9);

forkJoin([detailsAntecedentFamiliaux, detailsAntecedentConjoint,detailsAntecedentsMedicauxMere,detailsAntecedentsChirurgicauxMere,detailsAntecedentsGyneco,detailsAntecedentsObstetricaux]).subscribe(responses => {


       if (responses[5]['code'] == 200) {
          this.lstObstetricaux =responses[5]["result"]

       }

      if (responses[0]['code'] == 200) {
        let data = Object.assign(new antecedentFamiliaux(), responses[0]["result"][0]);
        this.populateFormAntecedentFamiliaux(this.addOrUpdateAntecedentFamiliauxForm, data);
      }
      if (responses[1]['code'] == 200) {
        let data = Object.assign(new antecedentConjoint(), responses[1]["result"][0]);
        this.addOrUpdateAntecedentConjointForm.patchValue({
          age: data.age>0?data.age:this.dossier.ageConjoint,
          dossierPrenatalId: data.dossierPrenatalId,
          id: data.id,
          nationalite: data.nationalite>0?data.nationalite:this.dossier.nationaliteConjoint,
          nombreEpouses: data.nombreEpouses>0?data.nombreEpouses:this.dossier.nombreEpousesConjoint,
          pathologie: data.pathologie,
          patientId: data.patientId,
          groupeSanguin:data.groupeSanguin,
          poids: data.poids,
          profession: data.profession!=null?data.profession:this.dossier.professionConjoint,
          rhesus: data.rhesus,
          taille: data.taille
        });
      }

      if (responses[2]['code'] == 200){

        let data = Object.assign(new antecedentMedicauxMere(), responses[2]["result"][0])
         this.addOrUpdateAntecedentMedMereForm.setValue({
          autres: data.autres,
          allergies:data.allergies,
          hypertension: (data.maladies.filter(p => p == 'hypertension')[0] !=null) ? 'oui' : 'non',
          cardiopathie: (data.maladies.filter(p => p == 'cardiopathie')[0] !=null) ? 'oui' : 'non',
          insuffisanceRenale: (data.maladies.filter(p => p == 'insuffisanceRenale')[0] !=null) ? 'oui' : 'non',
          asthme: (data.maladies.filter(p => p == 'asthme')[0] !=null) ? 'oui' : 'non',
          tuberculose: (data.maladies.filter(p => p == 'tuberculose')[0] !=null) ? 'oui' : 'non',
          hepatiteB: (data.maladies.filter(p => p == 'hepatiteB')[0] !=null) ? 'oui' : 'non',
          diabete: (data.maladies.filter(p => p == 'diabete')[0] !=null) ? 'oui' : 'non',
          drepanocytose:(data.maladies.filter(p => p == 'drepanocytose')[0] !=null) ? 'oui' : 'non',
          arv: (data.maladies.filter(p => p == 'arv')[0] !=null) ? 'oui' : 'non',
          anemie: (data.maladies.filter(p => p == 'anemie')[0] !=null) ? 'oui' : 'non',
          id: data.id,
          imc: data.imc,
          poids: data.poids,
          tabac: data.tabac,
          taille: data.taille,
          toxicomanie:data.toxicomanie
        });
      }
      if (responses[3]['code'] == 200) {
        let data = Object.assign(new antecedentChirurgieMere(), responses[3]["result"][0]);
        this.addOrUpdateAntecedentMereChirurgicauxForm.patchValue({
          id: data.id,
          chirurAutres: data.chirurAutres,
          chirurGyneco: data.chirurGyneco
        });
      }
      if (responses[4]['code'] == 200) {
        let data = Object.assign(new antecedentGynecologique(), responses[4]["result"][0]);
        this.addOrUpdateAntecedentGynecologique.setValue({
          gynecoAutres: data.gynecoAutres,
          id: data.id,
          infertilite:(data.maladies.filter(p => p == 'infertilite')[0] !=null) ? 'oui' : 'non',
          contraception: (data.maladies.filter(p => p == 'contraception')[0] !=null) ? 'oui' : 'non'
        });
      

      }

     

    }, err => {
      alert(err);
    });
  }

  seeObstetricals(id){
    let patientId =this.getPatientId();;
    let dossierId = this.dossier.id;
    let data =this.lstObstetricaux.filter( p => p.id==id)[0]
    console.log("seeObstetricals id : "+id)
    console.log("seeObstetricals  : "+JSON.stringify(data))
    this.addOrUpdateAntecedentObstetricals.patchValue({
      accouchement_delivrance: data.accouchement_delivrance,
      allaitement: data.allaitement,
      hta: data.hta,
      grossesseNormale: data.grossesseNormale,
      preeclampsie: data.preeclampsie,
      diabeteGestationnel:data.diabeteGestationnel,
      autres: data.autres,
      annee: data.annee,
      deroulementGrossesse: data.deroulementGrossesse,
      evolution_commentaire: data.evolution_commentaire,
      id: data.id,
      issue: data.issue,
      poidsNne1: data.poidsNne1,
      sexeNne1: data.sexeNne1,
      poidsNne2: data.poidsNne2,
      sexeNne2: data.sexeNne2,
      terme: data.terme,
      typeGrossesse: data.typeGrossesse
    });

  }


  GrossesseLoad(){
     this.addOrUpdateGrossesseForm.disable();
     this.disabled ="disabled";
     const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
     this.patientService.findGrossesse(this.getPatientId(), idDosserPrenatal).subscribe(responses => {
         if (responses['code'] == 200) {
          let data = Object.assign(new Grossesse(), responses["result"][0]);
          let datTp =new Date(this.dossier?.dateDerniereRegle * 1000);
          let dateTp =(this.dossier?.dateDerniereRegle>0)?datTp.setDate(datTp.getDate()+280): new Date().setDate(new Date().getDate()+280);
          let dpFInal =new Date(dateTp).toISOString().substring(0, 10);
          this.addOrUpdateGrossesseForm.patchValue({
            id: data.id,
            typeGrossesse:data.typeGrossesse,
            precisionGrossesse: data.precisionGrossesse,
            caractereCicatriciel: data.caractereCicatriciel,
            medecin: data.medecin,
            le:(data.le>0) ?new Date(data.le * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            pronosticVoieAccouchement: data.pronosticVoieAccouchement,
            observations: data.observations,
            dateDerniereRegle:(this.dossier?.dateDerniereRegle>0) ?new Date(this.dossier?.dateDerniereRegle * 1000)
            .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            g:(this.dossier.g != 0)? this.dossier.g : null ,
            p:(this.dossier.p != 0)? this.dossier.p : null ,
            tp: dpFInal,
            typeUterus: data.typeUterus
          });
      }
    });
   

  }

  private getPatientId() {
    let idPatient=0;
    this.route.params.subscribe((params) => {
      idPatient = params.id;
    });
    return idPatient;
  }

  set isDisabled(value: boolean) {
    // this._isDisabled = value;
    // if(value) {
    //  this.addOrUpdateGrossesseForm.controls['precisionGrossesse'].disable();
    // } else {
    //    this.addOrUpdateGrossesseForm.controls['precisionGrossesse'].enable();
    //  }
   }


  onSubmitForm(f:FormGroup,mess1,mess2,mess3,typeId){
    let patientId =this.getPatientId();
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.rMessage="";

    if (f.invalid){
      return;
    }

    if (f.value.id!=null){
      let Id =f.value.id;
      this.patientService.updateForm(patientId,idDosserPrenatal,Id,f.getRawValue(),typeId).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = mess2;
          this.loadDataForm(typeId, f, data);
        } else {
          this.rMessage = mess3;
        }
      });
    }
    else{
      this.patientService.createForm(patientId,idDosserPrenatal,f.getRawValue(),typeId).subscribe((data) => {
        if (data.code === 201){
          this.submitted = false;
          this.rMessage = mess1;
          this.loadDataForm(typeId, f, data);
        }
        else {
          this.rMessage = mess3;
        }
      });
    }


  }

  private loadDataForm(typeId: any, f: FormGroup, data: any) {
    switch (typeId) {
      case 4:
        this.populateFormAntecedentConjoint(f, data);
        break;
    }
  }
     
 
  private populateFormAntecedentFamiliaux(f: FormGroup, data: any){
    f.patchValue({
      id: data.id,
      pere:data.pere,
      mere:data.mere

    });
  }

  private populateFormAntecedentChirurgicauxForm(f: FormGroup, data: any){
    this.addOrUpdateAntecedentMereChirurgicauxForm.patchValue({
      id: data.id,
      chirurAutres: data.chirurAutres,
      chirurGyneco: data.chirurGyneco
    });
  }

  private populateFormAntecedentConjoint(f: FormGroup, data: any) {
    f.patchValue({
      age: data.age,
      dossierPrenatalId: data.dossierPrenatalId,
      groupeSanguin: data.groupeSanguin,
      id: data.id,
      nationalite: data.nationalite,
      nombreEpouses: data.nombreEpouses,
      pathologie: data.pathologie,
      patientId: data.patientId,
      poids: data.poids,
      profession: data.profession,
      rhesus: data.rhesus,
      taille: data.taille
    });
  }
// PARTIE BILAN
onSubmitBilan()
 {
   this.loading=true
   const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

  let dataTab = [
    {
      labelle: this.items[0].labelle,
      resultat:(this.addOrUpdateBilan.getRawValue().gp !=null) ? this.addOrUpdateBilan.getRawValue().gp : this.dossier?.groupSanguin,
      date:(this.addOrUpdateBilan.getRawValue().gpdate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().gpdate).getTime() / 1000 : null
    },
    {
      labelle: this.items[1].labelle,
      resultat:(this.addOrUpdateBilan.getRawValue().rh !=null) ? this.addOrUpdateBilan.getRawValue().rh : this.dossier?.rhesus,
      date:(this.addOrUpdateBilan.getRawValue().rhdate !=null) ?  new Date(this.addOrUpdateBilan.getRawValue().rhdate).getTime() / 1000 : null
     },
    { 
      labelle: this.items[2].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().ra,
      date:(this.addOrUpdateBilan.getRawValue().radate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().radate).getTime() / 1000 : null 
    },
    {  
      labelle: this.items[3].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().sra,
      date:(this.addOrUpdateBilan.getRawValue().sradate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().sradate).getTime() / 1000 : null
     },
    { 
      labelle: this.items[4].labelle,
       resultat:this.addOrUpdateBilan.getRawValue().to,
       date:(this.addOrUpdateBilan.getRawValue().todate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().todate).getTime() / 1000 : null
       },
    {  
      labelle: this.items[5].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().toigm,
      date:(this.addOrUpdateBilan.getRawValue().toigmdate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().toigmdate).getTime() / 1000 : null
    },
    { 
      labelle: this.items[6].labelle,
       resultat:this.addOrUpdateBilan.getRawValue().toigg,
       date:(this.addOrUpdateBilan.getRawValue().toiggdate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().toiggdate).getTime() / 1000 : null
      },
    {  
      labelle: this.items[7].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().ru,
      date:(this.addOrUpdateBilan.getRawValue().rudate !=null) ?  new Date(this.addOrUpdateBilan.getRawValue().rudate).getTime() / 1000 : null
     },
     {  
      labelle: this.items[8].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().ruigm,
      date:(this.addOrUpdateBilan.getRawValue().ruigmdate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().ruigmdate).getTime() / 1000 : null
    },
    { 
      labelle: this.items[9].labelle,
       resultat:this.addOrUpdateBilan.getRawValue().ruigg,
       date:(this.addOrUpdateBilan.getRawValue().ruiggdate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().ruiggdate).getTime() / 1000 : null
      },
    { 
      labelle: this.items[10].labelle,
       resultat:this.addOrUpdateBilan.getRawValue().tv,
       date:(this.addOrUpdateBilan.getRawValue().tvdate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().tvdate).getTime() / 1000 : null
      },
    { 
      labelle: this.items[11].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().tp,
      date:(this.addOrUpdateBilan.getRawValue().tpdate !=null) ?  new Date(this.addOrUpdateBilan.getRawValue().tpdate).getTime() / 1000 : null
     },
    {  
      labelle: this.items[12].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().vd,
      date:(this.addOrUpdateBilan.getRawValue().vddate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().vddate).getTime() / 1000 : null
    },
    { 
      labelle: this.items[13].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().hi,
      date:(this.addOrUpdateBilan.getRawValue().hidate !=null) ?  new Date(this.addOrUpdateBilan.getRawValue().hidate).getTime() / 1000 : null
     },
    { 
      labelle: this.items[14].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().hc,
      date:(this.addOrUpdateBilan.getRawValue().hcdate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().hcdate).getTime() / 1000 : null
    },
    { 
      labelle: this.items[15].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().hb,
      date:(this.addOrUpdateBilan.getRawValue().hbdate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().hbdate).getTime() / 1000 : null 
    
     },
    { 
      labelle: this.items[16].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().te,
      date:(this.addOrUpdateBilan.getRawValue().tedate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().tedate).getTime() / 1000 : null 
     },
    {  
      labelle: this.items[17].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().el,
      date:(this.addOrUpdateBilan.getRawValue().eldate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().eldate).getTime() / 1000 : null 
     },
    { 
      labelle: this.items[18].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().hba,
      date:(this.addOrUpdateBilan.getRawValue().hbadate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().hbadate).getTime() / 1000 : null 
     },
    { 
      labelle: this.items[19].labelle,
       resultat:this.addOrUpdateBilan.getRawValue().hbf,
       date:(this.addOrUpdateBilan.getRawValue().hbfdate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().hbfdate).getTime() / 1000 : null 
       },
    { 
      labelle: this.items[20].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().hbb,
      date:(this.addOrUpdateBilan.getRawValue().hbbdate !=null) ?  new Date(this.addOrUpdateBilan.getRawValue().hbbdate).getTime() / 1000 : null 
    },
    { 
      labelle: this.items[21].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().nfs,
      date:(this.addOrUpdateBilan.getRawValue().nfsdate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().nfsdate).getTime() / 1000 : null 
     },
    { 
      labelle: this.items[22].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().HB,
      date:(this.addOrUpdateBilan.getRawValue().HBdate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().HBdate).getTime() / 1000 : null 
     },
    { 
      labelle: this.items[23].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().pl,
      date:(this.addOrUpdateBilan.getRawValue().pldate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().pldate).getTime() / 1000 : null 
     },
    { 
      labelle: this.items[24].labelle,
       resultat:this.addOrUpdateBilan.getRawValue().tpTcaFi,
       date:(this.addOrUpdateBilan.getRawValue().tpTcaFidate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().tpTcaFidate).getTime() / 1000 : null 
       },
    {  
      labelle: this.items[25].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().gly,
      date:(this.addOrUpdateBilan.getRawValue().glydate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().glydate).getTime() / 1000 : null
    },
    {  
      labelle: this.items[26].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().ddg,
      date:(this.addOrUpdateBilan.getRawValue().ddgdate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().ddgdate).getTime() / 1000 : null
     },
    { 
      labelle: this.items[27].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().osuli,
      date:(this.addOrUpdateBilan.getRawValue().osulidate !=null) ? new Date(this.addOrUpdateBilan.getRawValue().osulidate).getTime() / 1000 : null
     },
    { 
      labelle: this.items[28].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().t1,
      date:(this.addOrUpdateBilan.getRawValue().t1date !=null) ? new Date(this.addOrUpdateBilan.getRawValue().t1date).getTime() / 1000 : null
     },
    {  
      labelle: this.items[29].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().t2,
      date:(this.addOrUpdateBilan.getRawValue().t2date !=null) ?  new Date(this.addOrUpdateBilan.getRawValue().t2date).getTime() / 1000 : null
    },
    {  
      labelle: this.items[30].labelle,
      resultat:this.addOrUpdateBilan.getRawValue().hbs
    }
  ];

let bilan ={
        "dataTab":dataTab,
        "id":0
}

console.log(" BILAN DATA :"+JSON.stringify(bilan))
    
  this.rMessage="";
 
  if (this.addOrUpdateBilan.invalid) {
    return;
  }else {
 
     if(!this.loadingBilan){
      
        this.patientService.createBilan(this.getPatientId(),idDosserPrenatal,bilan).subscribe((data) => {
          if (data.code === 201) {
            this.submitted = false;
            this.rMessage = "bSaveBilan";
            this.loading=false
            this.BilanLoad();
           console.log( "data ok :"+JSON.stringify(data));
          } else {
            this.rMessage = "bErrorAddOrUpdateBilan";
   
          }
        });
     }else {
      
       this.patientService.updateBilan(this.getPatientId(),idDosserPrenatal, this.idBilan,bilan).subscribe((data) => {
         if (data.code === 200) {
           this.submitted = false;
           this.rMessage = "bUpdateBilan";
           this.updateBilan =false;
           this.loading=false
           this.BilanLoad();
         } else {
           this.rMessage = "bErrorAddOrUpdateBilan";
 
           
         }
       });
     }
   
 
 
  }
 
 
 }

//FIN BILAN

// PARTIE TPI

onSubmitTpi(){
  if(this.myTpisTempo.length < 3){
    //traitement si le formulaire est null
    if((this.createTpi.value.date == null)
    &&(this.createTpi.value.libelleDose == null)
    &&(this.createTpi.value.nombreComprime == null)
    &&(this.createTpi.value.numeroDose == null)
    &&(this.createTpi.value.terme == null)){
     this.submittedTpi=false
     this.rMessage = "bErrorSaisiTpi";
    }else{
  this.submittedTpi=true
  this.loading=true
  let patientId =this.getPatientId();;
  let dossierId = this.dossier.id;
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    let dateConvertis =new Date(this.createTpi.value.date).getTime() / 1000;
    this.createTpi.patchValue({
     date:dateConvertis
       });
   console.log(" DATA Tpi BEFORE CREATE :"+JSON.stringify(this.createTpi.value))

    this.patientService.createTpi(patientId,idDosserPrenatal,this.createTpi.getRawValue()).subscribe((data) => {
      if (data.code === 201) {

        this.rMessage = "bSaveTpi";
        this.myTpis=[];
        this.myTpisTempo=[];
        this.createTpi.reset()
        this.loading=false
        this.closeTpiForm()
        setTimeout(() => 
       {

      this.rMessage = "";
       $("#formCreateTpi").modal("hide");
    },
    500);
        this.VaccinationLoad()
      } else {
        this.rMessage = "bErrorTpi";
    
      }
    });
  
  this.validerTpi =false

}
  }else {
    this.myTpiNombreLimit=true
    this.rMessage = "bCompletedTpi";

  }
 
}


getIndexTpiSelected(i:number){
  this.rMessage=""
  this.tpiIndex=i;
  this.patientService.getAllTpi(this.getPatientId(),this.dossier.id)
  .subscribe(data =>{
    this.myTpis= data['result']
    const tpi=this.myTpis.filter( p => this.myTpis.indexOf(p) == i)
    this.myTpiIdTempo=tpi[0].id;
    console.log("  DATA TPI  :"+JSON.stringify(tpi))


    this.updateTpi.setValue({
      numeroDose:tpi[0].numeroDose,
      terme:tpi[0].terme,
      id:tpi[0].id,
      nombreComprime:tpi[0].nombreComprime,
      libelleDose:tpi[0].libelleDose,
      date:(tpi[0].date > 0) ? new Date(tpi[0].date * 1000)
      .toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
    })
    console.log("  DATA TPI UPDATEFORM :"+JSON.stringify( this.updateTpi.value))

}
  );
}
getIdSelected(type:number,i:String){
    this.typeVaccinationChoisi=type
    this.idSelected=i; 
}
  

onSubmitUpdateTpi(){
  if((this.updateTpi.value.date == null)
  &&(this.updateTpi.value.libelleDose == null)
  &&(this.updateTpi.value.nombreComprime == null)
  &&(this.updateTpi.value.numeroDose == null)
  &&(this.updateTpi.value.terme == null)){
    this.rMessage = "bErrorSaisiTpi";
  }else{
    this.submittedTpi=true
    this.loading=true
    let patientId =this.getPatientId();;
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
    console.log("updateTpi form  : "+this.inputValue)

   //recuperation pour creer tetanos
   let dateConvertis =new Date(this.updateTpi.value.date).getTime() / 1000;
    this.updateTpi.patchValue({
     date:dateConvertis,
     terme:this.inputValue
       }); 
   console.log("updateTpi : "+JSON.stringify(this.updateTpi.value))

  this.patientService.updateTpi(patientId,idDosserPrenatal,this.myTpiIdTempo,this.updateTpi.getRawValue()).subscribe((data) => {
    if (data.code === 200) {
      this.rMessage = "bUpdateTpi";
      this.myTpis=[];
      this.loading=false
      this.myTpisTempo=[];
      this.validerTpi =false  
      this.updateTpi.reset()
      setTimeout(() => 
      {
        this.rMessage = "";
        $("#formUpdateTpi").modal("hide");
      },
      1000);
      this.TpiLoad()
    } else {
      this.rMessage = "bErrorTpi";  
    }
  });
  }
    
}

supprimerTpi(i:String){
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

this.patientService.deleteTpi(this.getPatientId(),idDosserPrenatal,i).subscribe(
  data =>{
    if(data.code==200){
      this.idSelected="-1";
      $("#formSuppression").modal("hide");
      this.VaccinationLoad()
    }
  }
)
 
}

closeTpiForm(){
    this.validerTpi =false  
    this.createTpi.reset()
    this.rMessage = "";
  
}

//FIN Rhophylac

// PARTIE Rhophylac
onSubmitRhophylac(){
  if(this.myRhophylacTempo.length <3){
    if((this.createRhophylac.value.date == null)
    &&(this.createRhophylac.value.dose == null)
    &&(this.createRhophylac.value.terme == null)
    &&(this.createRhophylac.value.numero == null)
    &&(this.createRhophylac.value.rhophylac == null)){
     this.submittedRhophylac=false
     this.rMessage = "bErrorSaisiRhophylac";
  }else{
  this.submittedRhophylac=true
  this.loading=true
  let patientId =this.getPatientId();;
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
 
    let dateConvertis =new Date(this.createRhophylac.value.date).getTime() / 1000;
    this.createRhophylac.patchValue({
     date:dateConvertis
   });
   console.log(" DATA Rhophylac BEFORE CREATE :"+JSON.stringify(this.createRhophylac.value))

    this.patientService.createRhophylac(patientId,idDosserPrenatal,this.createRhophylac.getRawValue()).subscribe((data) => {
      if (data.code === 201) {
        console.log(" DATA Rhophylac AFTER CREATE :"+JSON.stringify(data))

        this.rMessage = "bSaveRhophylac";
        this.myRhophylacs=[];
        this.myRhophylacTempo=[];
        this.createRhophylac.reset()
        this.loading=false
        this.closeRhophylacForm()
        setTimeout(() => 
       {

      this.rMessage = "";
       $("#formCreateRhophylac").modal("hide");
    },
    500);
        this.VaccinationLoad()
      } else {
        this.rMessage = "bErrorRhophylac";
    
      }
    });
  
  this.validerRhophylac =false

}
  }else {
    this.myRhophylacNombreLimit=true
    this.rMessage = "bCompletedRhophylac";

  }
 
}

getIndexRhophylacSelected(i:number){
  this.rhophylacIndex=i;
  this.patientService.getAllRhophylac(this.getPatientId(),this.dossier.id)
  .subscribe(data =>{
    this.myRhophylacs= data['result']
    const rhophylac=this.myRhophylacs.filter( p => this.myRhophylacs.indexOf(p) == i)
    this.myRhophylacIdTempo=rhophylac[0].id

    this.updateRhophylac.setValue({
      rhophylac:rhophylac[0].rhophylac,
      terme:rhophylac[0].terme,
      numero:rhophylac[0].numero,
      id:rhophylac[0].id,
      dose:rhophylac[0].dose,
      date:(rhophylac[0].date > 0) ? new Date(rhophylac[0].date * 1000)
      .toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
    })
}
  );
}

onSubmitUpdateRhophylac(){

  if((this.updateRhophylac.value.date == null)
  &&(this.updateRhophylac.value.dose == null)
  &&(this.updateRhophylac.value.terme == null)
  &&(this.updateRhophylac.value.numero == null)
  &&(this.updateRhophylac.value.rhophylac == null)){
    this.rMessage = "bErrorSaisiRhophylac";

  }else{
    this.loading=true
    let patientId =this.getPatientId();;
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
    //recuperation pour creer tetanos
   let dateConvertis =new Date(this.updateRhophylac.getRawValue().date).getTime() / 1000;
    this.updateRhophylac.patchValue({
     date:dateConvertis,
     terme:this.inputValue
   });
     this.patientService.updateRhophylac(patientId,idDosserPrenatal,this.myRhophylacIdTempo,this.updateRhophylac.getRawValue()).subscribe((data) => {
    if (data.code === 200) {  
      console.log("  DATA Rhophylac AFTER UPDATE :"+JSON.stringify(data))
      this.rMessage = "bUpdateRhophylac";
      this.myRhophylacs=[];
      this.myRhophylacTempo=[];
      this.loading=false
      this.validerRhophylac=false
      this.updateRhophylac.reset()
      setTimeout(() => 
      {
         this.rMessage=""
        $("#formUpdateRhophylac").modal("hide");
      },
      1000);
      this.RhophylacLoad()
    } else {
      this.rMessage = "bErrorRhophylac";  
    }
  });

  }
   
}



closeRhophylacForm(){
  if(!this.submittedRhophylac || this.myRhophylacNombreLimit){
    this.validerRhophylac =false 

  }else {
    this.validerRhophylac =true  

  }
  this.rMessage =""
  this.createRhophylac.reset()
}

supprimerRhophylac(i:String){
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

  this.patientService.deleteRhophylac(this.getPatientId(),idDosserPrenatal,i).subscribe(
    data =>{
      if(data.code==200){
        this.idSelected="-1"
        $("#formSuppression").modal("hide");
        this.VaccinationLoad()
      }
    }
  )
   }

//FIN Rhophylac



// PARTIE Tetano 
onSubmitTetanos(){
  if( this.myLinesTempo.length <5){
if((this.createTetanos.value.lot == null)
&&(this.createTetanos.value.vat == null)
&&(this.createTetanos.value.date == null)){
 this.submittedTetanos=false
 this.rMessage = "bErrorSaisiTetanos";
}else{
  this.submittedTetanos=true
  this.loading=true
  let patientId =this.getPatientId();;
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
 
    let dateConvertis =new Date(this.createTetanos.value.date).getTime() / 1000;
    this.createTetanos.patchValue({
     date:dateConvertis
   });
   console.log("TETANOS DATA BEFROE CREATE :"+JSON.stringify(this.createTetanos.value))

    this.patientService.createTetanos(patientId,idDosserPrenatal,this.createTetanos.value).subscribe((data) => {
      if (data.code === 201) {
        console.log("TETANOS DATA AFTER CREATE :"+JSON.stringify(data))

        this.loading=false
        this.rMessage = "bValiderTetanos";
        this.myLines=[];
        this.myLinesTempo=[];
        this.createTetanos.reset()
        this.closeTetanoForm()
        setTimeout(() => 
       {

      this.rMessage = "";
       $("#formCreateTetanos").modal("hide");
    },
    500);
        this.VaccinationLoad()
      } else {
        this.rMessage = "bErrorTetanos";
    
      }
    });
  
  this.validerTetanos =false

}
  }else {
    this.myTetanosNombreLimit=true
    this.rMessage = "bCompletedTetanos";

  }
 
}

getIndexTetanosSelected(i:number){
  this.rMessage=""
  this.tetanosIndex=i;
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

  this.patientService.getAllTetanos(this.getPatientId(),idDosserPrenatal)
  .subscribe(data =>{
    this.myLines= data['result']
    const line=this.myLines.filter( p => this.myLines.indexOf(p) == i)
    this.myTetanosIdTempo=line[0].id
    this.updateTetanos.setValue({
      lot:line[0].lot,
      vat:line[0].vat,
      id:line[0].id,
      date:(line[0].date > 0) ? new Date(line[0].date * 1000)
      .toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
    })
}
  );
}

onSubmitUpdateTetanos(){
  if((this.updateTetanos.value.lot == null)
 &&(this.updateTetanos.value.vat == null)
 &&(this.updateTetanos.value.date == null)){
  this.rMessage = "bErrorSaisiTetanos";
}else{
  this.loading=true;
  let patientId =this.getPatientId();;
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
 //recuperation pour creer tetanos
 let dateConvertis =new Date(this.updateTetanos.value.date).getTime() / 1000;
  this.updateTetanos.patchValue({
   date:dateConvertis
 });
 // recuperation temporaire
const lineTempo =this.updateTetanos.value 
this.myLines[this.tetanosIndex]=lineTempo,
console.log("listes apres : "+JSON.stringify(this.myLines))

this.patientService.updateTetanos(patientId,idDosserPrenatal,this.myTetanosIdTempo,this.updateTetanos.value).subscribe((data) => {
  if (data.code === 200) {
    this.rMessage = "bUpdateTetanos";
    this.myLines=[];
    this.myLinesTempo=[];
    this.validerTetanos=false  
    this.loading=false;
    this.updateTetanos.reset()
    setTimeout(() => 
    {

      this.rMessage = "";
     $("#formUpdateTetanos").modal("hide");
    },
    500);
    this.VaccinationLoad()
  } else {
    this.rMessage = "bErrorTetanos";  
  }
});

 }
  
}

supprimerTetanos(i:String){
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

  this.patientService.deleteTetanos(this.getPatientId(),idDosserPrenatal,i).subscribe(
    data =>{
      if(data.code==200){
        this.idSelected="-1"
        $("#formSuppression").modal("hide");
        this.VaccinationLoad()
      }
    }
  )
   }



closeTetanoForm(){
 if(!this.submittedTetanos || this.myTetanosNombreLimit){
 this.validerTetanos =false

 } else {
  this.validerTetanos =true

 } 
 this.rMessage =""
 this.createTetanos.reset()
}

//FIN RHYPHYLAC

oncloseUpdateFormGeneral(){
  this.rMessage =""
}


// ADD ECHOGRAPIE 1Autre

onSubmitEchographieAutre()
{
  let dateConvertis =new Date(this.addOrUpdateEchographieAutre.value.date).getTime() / 1000;
  let ddr=new Date(this.ddr).getTime() / 1000;
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.addOrUpdateEchographieAutre.patchValue({
      date:dateConvertis,
      type:this.echographie_autre,
      ddr:ddr,
      terme:this.inputValue
    });
  
 
   
 this.rMessage="";

 if (this.addOrUpdateEchographieAutre.invalid) {
   return;
 }else {

    if(!this.loadingEchographieAutre){
     
       this.patientService.createEchographie(this.addOrUpdateEchographieAutre.getRawValue(),this.getPatientId(),idDosserPrenatal).subscribe((data) => {
         if (data.code === 201) {
           this.submitted = false;
           this.rMessage = "bSaveEchographieAutre";
           this.echographieLoad();
          console.log( "data ok :"+JSON.stringify(data));
         } else {
           this.rMessage = "bErrorAddOrUpdateEchographieAutre";
  
         }
       });
    }else {
     
      this.patientService.updateEchographie(this.addOrUpdateEchographieAutre.getRawValue(),this.getPatientId(),this.dossier.id,this.addOrUpdateEchographieAutre.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateEchographieAutre";
          this.updateEchographie =false;
          this.echographieLoad();
        } else {
          this.rMessage = "bErrorAddOrUpdateEchographieAutre";

          
        }
      });
    }
  


 }


}


// ADD ECHOGRAPHIE 
 onSubmitEchographie()
 {
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

   let dateConvertis =new Date(this.addOrUpdateEchographie.value.date).getTime() / 1000;
   let ddr=new Date(this.addOrUpdateEchographieAutre.value.ddr).getTime() / 1000;

    this.addOrUpdateEchographie.patchValue({
       date:dateConvertis,
       terme:this.inputValue,
       ddr:ddr,
       type:this.echographie,
     });
  
    
  this.rMessage="";
 
  if (this.addOrUpdateEchographie.invalid) {
    return;
  }else {
 
     if(!this.loadingEchographie){
      
        this.patientService.createEchographie(this.addOrUpdateEchographie.getRawValue(),this.getPatientId(),idDosserPrenatal).subscribe((data) => {
          if (data.code === 201) {
            this.submitted = false;
            this.rMessage = "bSaveEchographie";
            this.echographieLoad();
           console.log( "data ok :"+JSON.stringify(data));
          } else {
            this.rMessage = "bErrorAddOrUpdateEchographie";
   
          }
        });
     }else {
      
       this.patientService.updateEchographie(this.addOrUpdateEchographie.getRawValue(),this.getPatientId(),idDosserPrenatal,this.addOrUpdateEchographie.value.id).subscribe((data) => {
         if (data.code === 200) {
           this.submitted = false;
           this.rMessage = "bUpdateEchographie";
           this.updateEchographie =false;
           this.echographieLoad();
         } else {
           this.rMessage = "bErrorAddOrUpdateEchographie";
 
           
         }
       });
     }
   
 
 
  }
 
 
 }

// ADD ECHOGRAPIE 1

onSubmitEchographie1()
{
  let dateConvertis =new Date(this.addOrUpdateEchographie1.value.date).getTime() / 1000;
  let ddr=new Date(this.ddr).getTime() / 1000;
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.addOrUpdateEchographie1.patchValue({
      date:dateConvertis,
      ddr:ddr,
      terme:this.inputValue,
      type:this.echographie_1
    });
 
 this.rMessage="";

 if (this.addOrUpdateEchographie1.invalid) {
   return;
 }else {

    if(!this.loadingEchographie1){
     
       this.patientService.createEchographie(this.addOrUpdateEchographie1.getRawValue(),this.getPatientId(),idDosserPrenatal).subscribe((data) => {
         if (data.code === 201) {
           this.submitted = false;
           this.rMessage = "bSaveEchographie1";
           this.echographieLoad();
          console.log( "data ok :"+JSON.stringify(data));
         } else {
           this.rMessage = "bErrorAddOrUpdateEchographie1";
  
         }
       });
    }else {
     
      this.patientService.updateEchographie(this.addOrUpdateEchographie1.getRawValue(),this.getPatientId(),idDosserPrenatal,this.addOrUpdateEchographie1.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateEchographie1";
          this.updateEchographie1 =false;
          this.echographieLoad();
        } else {
          this.rMessage = "bErrorAddOrUpdateEchographie1";

          
        }
      });
    }
  


 }


}
  // ADD ECHOGRAPIE 2
onSubmitEchographie2()
{
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

  let dateConvertis =new Date(this.addOrUpdateEchographie2.value.date).getTime() / 1000;
  let suiviCsSF=this.addOrUpdateEchographie2.value.suiviCsSF;
  let ddr=new Date(this.ddr).getTime() / 1000;

    this.addOrUpdateEchographie2.patchValue({
      date:dateConvertis,
      type:this.echographie_2,
      ddr:ddr,
      terme:this.inputValue
    });
 
 
   
 this.rMessage="";

 if (this.addOrUpdateEchographie2.invalid) {
   return;
 }else {

    if(!this.loadingEchographie2){
     
       this.patientService.createEchographie(this.addOrUpdateEchographie2.getRawValue(),this.getPatientId(),idDosserPrenatal).subscribe((data) => {
         if (data.code === 201) {
           this.submitted = false;
           this.rMessage = "bSaveEchographie2";
           this.echographieLoad();
          console.log( "data ok :"+JSON.stringify(data));
         } else {
           this.rMessage = "bErrorAddOrUpdateEchographie2";
  
         }
       });
    }else {
     
      this.patientService.updateEchographie(this.addOrUpdateEchographie2.getRawValue(),this.getPatientId(),idDosserPrenatal,this.addOrUpdateEchographie2.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateEchographie2";
          this.updateEchographie2 =false;
          this.echographieLoad();
        } else {
          this.rMessage = "bErrorAddOrUpdateEchographie2";

          
        }
      });
    }
  


 }


}

// ADD ECHOGRAPIE 3
onSubmitEchographie3()
{
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

  let dateConvertis =new Date(this.addOrUpdateEchographie3.value.date).getTime() / 1000;
  let ddr=new Date(this.ddr).getTime() / 1000;


    this.addOrUpdateEchographie3.patchValue({
      date:dateConvertis,
      ddr:ddr,
      terme:this.inputValue,
      type:this.echographie_3
    });
 
 this.rMessage="";

 if (this.addOrUpdateEchographie3.invalid) {
   return;
 }else {

    if(!this.loadingEchographie3){
       this.patientService.createEchographie(this.addOrUpdateEchographie3.getRawValue(),this.getPatientId(),idDosserPrenatal).subscribe((data) => {
         if (data.code === 201) {
           this.submitted = false;
           this.rMessage = "bSaveEchographie3";
           this.echographieLoad();
         } else {
           this.rMessage = "bErrorAddOrUpdateEchographie3";
  
        }
       });
    }else {
     
      this.patientService.updateEchographie(this.addOrUpdateEchographie3.getRawValue(),this.getPatientId(),idDosserPrenatal,this.addOrUpdateEchographie3.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateEchographie3";
           this.updateEchographie3 =false;

          this.echographieLoad();
        } else {
          this.rMessage = "bErrorAddOrUpdateEchographie3";
  
        }
      });
    }
  


 }


}

// FIN ECHOGRAPHIE
////////////////////////////////////////
// ADD CONSULTATION 1
onSubmitStaff()
{                 

  let dateConvertis =new Date(this.addOrUpdateStaff.value.staffDate).getTime() / 1000;
  let date =new Date(this.addOrUpdateStaff.value.date).getTime() / 1000;
  let rdvTerme  =new Date(this.addOrUpdateStaff.value.rdvTerme).getTime() / 1000;
  let prochEcho = (this.addOrUpdateStaff.value.prochEcho>0) ?new Date(this.addOrUpdateStaff.value.prochEcho).getTime() / 1000:
  new Date().getTime() / 1000;
  let prochRDV= (this.addOrUpdateStaff.value.prochRDV>0) ?new Date(this.addOrUpdateStaff.value.prochRDV).getTime() / 1000
  :new Date().getTime() / 1000;
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.addOrUpdateStaff.patchValue({
      date:dateConvertis,
      staffDate:dateConvertis,
      prochEcho:prochEcho,
      prochRDV:prochRDV,
      rdvTerme:rdvTerme,
      type:this.staff,
      troubleUrinaires: (this.addOrUpdateConsultation1.value.troubleUrinaires == 'oui')? true : false,
      urgence: (this.addOrUpdateConsultation1.value.urgence == 'oui')? true : false,
      pertes: (this.addOrUpdateConsultation1.value.pertes == 'oui')? true : false,
      maf: (this.addOrUpdateConsultation1.value.maf == 'oui')? true : false,
      metrorragies: (this.addOrUpdateConsultation1.value.metrorragies == 'oui')? true : false,
      echoDebutGrossesse: (this.addOrUpdateConsultation1.value.echoDebutGrossesse == 'oui')? true : false,
      contractionAnormale: (this.addOrUpdateConsultation1.value.contractionAnormale == 'oui')? true : false,
    });




 
 this.rMessage="";

 if (this.addOrUpdateStaff.invalid) {
   return;
 }else {

    if(!this.updateStaff){
       this.patientService.createConsultation(this.addOrUpdateStaff.value,this.getPatientId(),idDosserPrenatal).subscribe((data) => {
         if (data.code === 201) {
           this.submitted = false;
           this.rMessage = "bSaveStaff";
           this.ConsultationLoad();

         } else {
           this.rMessage = "bErrorAddOrUpdateStaff";
  
        }
       });
    }else {

      this.patientService.updateConsultation(this.addOrUpdateStaff.value,this.getPatientId(),idDosserPrenatal,this.addOrUpdateStaff.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateStaff";
           this.updateStaff =false;

          this.ConsultationLoad();
        } else {
          this.rMessage = "bErrorAddOrUpdateStaff";
  
        }
      });
    }
  


 }


}

// ADD CONSULTATION 1
onSubmitConsultation1()
{                 
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

  let dateConvertis =new Date(this.addOrUpdateConsultation1.value.date).getTime() / 1000;
  let staffDate =new Date(this.addOrUpdateConsultation1.value.staffDate).getTime() / 1000;
  let rdvTerme  =new Date(this.addOrUpdateConsultation1.value.rdvTerme).getTime() / 1000;
  let prochEcho = new Date(this.addOrUpdateConsultation1.value.prochEcho).getTime() / 1000;
 
  let prochRDV= new Date(this.addOrUpdateConsultation1.value.prochRDV).getTime() / 1000;

    this.addOrUpdateConsultation1.patchValue({
      date:dateConvertis,
      staffDate:staffDate,
      prochEcho:prochEcho,
      prochRDV:prochRDV,
      termeSA:this.inputValueTerme,
      rdvTerme:rdvTerme,
      type:this.consultation_1,
      troubleUrinaires: (this.addOrUpdateConsultation1.value.troubleUrinaires == 'oui')? true : false,
      urgence: (this.addOrUpdateConsultation1.value.urgence == 'oui')? true : false,
      pertes: (this.addOrUpdateConsultation1.value.pertes == 'oui')? true : false,
      maf: (this.addOrUpdateConsultation1.value.maf == 'oui')? true : false,
      metrorragies: (this.addOrUpdateConsultation1.value.metrorragies == 'oui')? true : false,
      echoDebutGrossesse: (this.addOrUpdateConsultation1.value.echoDebutGrossesse == 'oui')? true : false,
      contractionAnormale: (this.addOrUpdateConsultation1.value.contractionAnormale == 'oui')? true : false,
    });

 this.rMessage="";

 if (this.addOrUpdateConsultation1.invalid) {
   return;
 }else {

    if(!this.loadingConsultation1){
      this.addOrUpdateConsultation1.patchValue({
        termeSA:this.inputValueTerme
      })
       this.patientService.createConsultation(this.addOrUpdateConsultation1.getRawValue(),this.getPatientId(),idDosserPrenatal).subscribe((data) => {
         if (data.code === 201) {
          console.log("CONSULTATION DATA CREATE :"+JSON.stringify(data['result']))
           this.submitted = false;
           this.rMessage = "bSaveConsultation1";
           this.ConsultationLoad();

         } else {
           this.rMessage = "bErrorAddOrUpdateConsultation1";
  
        }
       });
    }else {
      this.addOrUpdateConsultation1.patchValue({
        termeSA:this.inputValueTerme
      })
     
      this.patientService.updateConsultation(this.addOrUpdateConsultation1.getRawValue(),this.getPatientId(),idDosserPrenatal,this.addOrUpdateConsultation1.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateConsultation1";
         
           this.updateConsultation1 =false;

          this.ConsultationLoad();
        } else {
          this.rMessage = "bErrorAddOrUpdateConsultation1";
  
        }
      });
    }
  


 }


}

// ADD CONSULTATION 2
onSubmitConsultation2()
{   
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
              
  let rdvTerme  =new Date(this.addOrUpdateConsultation2.value.rdvTerme).getTime() / 1000;
  let dateConvertis =new Date(this.addOrUpdateConsultation2.value.date).getTime() / 1000;
  let prochEcho = new Date(this.addOrUpdateConsultation2.value.prochEcho).getTime() / 1000;
 
  let prochRDV= new Date(this.addOrUpdateConsultation2.value.prochRDV).getTime() / 1000;
  
  let staffDate =new Date(this.addOrUpdateConsultation2.value.staffDate).getTime() / 1000;

  this.addOrUpdateConsultation2.patchValue({
    date:dateConvertis,
    staffDate:staffDate,
    prochEcho:prochEcho,
    prochRDV:prochRDV,
    termeSA:this.inputValue,
    rdvTerme:rdvTerme,
    type:this.consultation_2,
    troubleUrinaires: (this.addOrUpdateConsultation2.value.troubleUrinaires == 'oui')? true : false,
    urgence: (this.addOrUpdateConsultation2.value.urgence == 'oui')? true : false,
    pertes: (this.addOrUpdateConsultation2.value.pertes == 'oui')? true : false,
    maf: (this.addOrUpdateConsultation2.value.maf == 'oui')? true : false,
    metrorragies: (this.addOrUpdateConsultation2.value.metrorragies == 'oui')? true : false,
    echoDebutGrossesse: (this.addOrUpdateConsultation2.value.echoDebutGrossesse == 'oui')? true : false,
    contractionAnormale: (this.addOrUpdateConsultation2.value.contractionAnormale == 'oui')? true : false,
  });
 
 this.rMessage="";

 if (this.addOrUpdateConsultation2.invalid) {
   return;
 }else {

    if(!this.loadingConsultation2){
      this.addOrUpdateConsultation2.patchValue({
        termeSA:this.inputValueTerme
      })
       this.patientService.createConsultation(this.addOrUpdateConsultation2.getRawValue(),this.getPatientId(),idDosserPrenatal).subscribe((data) => {
         if (data.code === 201) {
           this.submitted = false;
           this.rMessage = "bSaveConsultation2";
           this.ConsultationLoad();

         } else {
           this.rMessage = "bErrorAddOrUpdateConsultation2";
  
        }
       });
    }else {
      this.addOrUpdateConsultation2.patchValue({
        termeSA:this.inputValueTerme
      })
      this.patientService.updateConsultation(this.addOrUpdateConsultation2.getRawValue(),this.getPatientId(),idDosserPrenatal,this.addOrUpdateConsultation2.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateConsultation2";
        
           this.updateConsultation2 =false;

          this.ConsultationLoad();
        } else {
          this.rMessage = "bErrorAddOrUpdateConsultation2";
  
        }
      });
    }
  


 }


}


// ADD CONSULTATION 3
onSubmitConsultation3()
{                 
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

  let rdvTerme  =new Date(this.addOrUpdateConsultation3.value.rdvTerme).getTime() / 1000;
  let dateConvertis =new Date(this.addOrUpdateConsultation3.value.date).getTime() / 1000;
  let prochEcho = new Date(this.addOrUpdateConsultation3.value.prochEcho).getTime() / 1000;
  
  let prochRDV= new Date(this.addOrUpdateConsultation3.value.prochRDV).getTime() / 1000;
 
  let staffDate =new Date(this.addOrUpdateConsultation3.value.staffDate).getTime() / 1000;

  this.addOrUpdateConsultation3.patchValue({
    date:dateConvertis,
    staffDate:staffDate,
    prochEcho:prochEcho,
    prochRDV:prochRDV,
    termeSA:this.inputValue,
    rdvTerme:rdvTerme,
    type:this.consultation_3,
    troubleUrinaires: (this.addOrUpdateConsultation3.value.troubleUrinaires == 'oui')? true : false,
    urgence: (this.addOrUpdateConsultation3.value.urgence == 'oui')? true : false,
    pertes: (this.addOrUpdateConsultation3.value.pertes == 'oui')? true : false,
    maf: (this.addOrUpdateConsultation3.value.maf == 'oui')? true : false,
    metrorragies: (this.addOrUpdateConsultation3.value.metrorragies == 'oui')? true : false,
    echoDebutGrossesse: (this.addOrUpdateConsultation3.value.echoDebutGrossesse == 'oui')? true : false,
    contractionAnormale: (this.addOrUpdateConsultation3.value.contractionAnormale == 'oui')? true : false,
  });
 this.rMessage="";

 if (this.addOrUpdateConsultation3.invalid) {
   return;
 }else {

    if(!this.loadingConsultation3){
      this.addOrUpdateConsultation3.patchValue({
        termeSA:this.inputValueTerme
      })
       this.patientService.createConsultation(this.addOrUpdateConsultation3.getRawValue(),this.getPatientId(),idDosserPrenatal).subscribe((data) => {
         if (data.code === 201) {
           this.submitted = false;
           this.rMessage = "bSaveConsultation3";
           this.ConsultationLoad();

         } else {
           this.rMessage = "bErrorAddOrUpdateConsultation3";
  
        }
       });
    }else {
      this.addOrUpdateConsultation3.patchValue({
        termeSA:this.inputValueTerme
      })
      this.patientService.updateConsultation(this.addOrUpdateConsultation3.getRawValue(),this.getPatientId(),idDosserPrenatal,this.addOrUpdateConsultation3.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateConsultation3";
         
           this.updateConsultation3 =false;

          this.ConsultationLoad();
        } else {
          this.rMessage = "bErrorAddOrUpdateConsultation3";
  
        }
      });
    }
  


 }


}

// ADD CONSULTATION 4
onSubmitConsultation4()
{  
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
               
  let rdvTerme  =new Date(this.addOrUpdateConsultation4.value.rdvTerme).getTime() / 1000;
  let dateConvertis =new Date(this.addOrUpdateConsultation4.value.date).getTime() / 1000;
  let prochEcho = new Date(this.addOrUpdateConsultation4.value.prochEcho).getTime() / 1000;
  
  let prochRDV= new Date(this.addOrUpdateConsultation4.value.prochRDV).getTime() / 1000;
 

  let staffDate =new Date(this.addOrUpdateConsultation4.value.staffDate).getTime() / 1000;

  this.addOrUpdateConsultation4.patchValue({
    date:dateConvertis,
    staffDate:staffDate,
    prochEcho:prochEcho,
    prochRDV:prochRDV,
    termeSA:this.inputValueTerme,
    rdvTerme:rdvTerme,
    type:this.consultation_4,
    troubleUrinaires: (this.addOrUpdateConsultation4.value.troubleUrinaires == 'oui')? true : false,
    urgence: (this.addOrUpdateConsultation4.value.urgence == 'oui')? true : false,
    pertes: (this.addOrUpdateConsultation4.value.pertes == 'oui')? true : false,
    maf: (this.addOrUpdateConsultation4.value.maf == 'oui')? true : false,
    metrorragies: (this.addOrUpdateConsultation4.value.metrorragies == 'oui')? true : false,
    echoDebutGrossesse: (this.addOrUpdateConsultation4.value.echoDebutGrossesse == 'oui')? true : false,
    contractionAnormale: (this.addOrUpdateConsultation4.value.contractionAnormale == 'oui')? true : false,
  });
 
 this.rMessage="";

 if (this.addOrUpdateConsultation4.invalid) {
   return;
 }else {
  this.addOrUpdateConsultation4.patchValue({
    termeSA:this.inputValueTerme
  })
    if(!this.loadingConsultation4){
       this.patientService.createConsultation(this.addOrUpdateConsultation4.getRawValue(),this.getPatientId(),idDosserPrenatal).subscribe((data) => {
         if (data.code === 201) {
          console.log("CONSULTATION 2 DATA CREATE :"+JSON.stringify(data['result']))
           this.submitted = false;
           this.rMessage = "bSaveConsultation4";
           this.ConsultationLoad();

         } else {
           this.rMessage = "bErrorAddOrUpdateConsultation4";
  
        }
       });
    }else {
      this.addOrUpdateConsultation4.patchValue({
        termeSA:this.inputValueTerme
      })
      this.patientService.updateConsultation(this.addOrUpdateConsultation4.getRawValue(),this.getPatientId(),idDosserPrenatal,this.addOrUpdateConsultation4.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateConsultation4";
          console.log("CONSULTATION DATA UPDATE :"+JSON.stringify(this.addOrUpdateConsultation4.value))
          console.log("CONSULTATION DATA UPDATE after :"+JSON.stringify(data))

           this.updateConsultation4 =false;

          this.ConsultationLoad();
        } else {
          this.rMessage = "bErrorAddOrUpdateConsultation4";
  
        }
      });
    }
  


 }


}


// ADD CONSULTATION 5
onSubmitConsultation5()
{                 
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

  let rdvTerme  =new Date(this.addOrUpdateConsultation5.value.rdvTerme).getTime() / 1000;
  let dateConvertis =new Date(this.addOrUpdateConsultation5.value.date).getTime() / 1000;
  let prochEcho = new Date(this.addOrUpdateConsultation5.value.prochEcho).getTime() / 1000;
  
  let prochRDV= new Date(this.addOrUpdateConsultation5.value.prochRDV).getTime() / 1000;
 
  let staffDate =new Date(this.addOrUpdateConsultation5.value.staffDate).getTime() / 1000;

  this.addOrUpdateConsultation5.patchValue({
    date:dateConvertis,
    staffDate:staffDate,
    prochEcho:prochEcho,
    prochRDV:prochRDV,
    termeSA:this.inputValueTerme,
    rdvTerme:rdvTerme,
    type:this.consultation_5,
    troubleUrinaires: (this.addOrUpdateConsultation5.value.troubleUrinaires == 'oui')? true : false,
    urgence: (this.addOrUpdateConsultation5.value.urgence == 'oui')? true : false,
    pertes: (this.addOrUpdateConsultation5.value.pertes == 'oui')? true : false,
    maf: (this.addOrUpdateConsultation5.value.maf == 'oui')? true : false,
    metrorragies: (this.addOrUpdateConsultation5.value.metrorragies == 'oui')? true : false,
    echoDebutGrossesse: (this.addOrUpdateConsultation5.value.echoDebutGrossesse == 'oui')? true : false,
    contractionAnormale: (this.addOrUpdateConsultation5.value.contractionAnormale == 'oui')? true : false,
  });
 
 this.rMessage="";

 if (this.addOrUpdateConsultation5.invalid) {
   return;
 }else {

    if(!this.updateConsultation5){
       this.patientService.createConsultation(this.addOrUpdateConsultation5.getRawValue(),this.getPatientId(),idDosserPrenatal).subscribe((data) => {
         if (data.code === 201) {
          console.log("CONSULTATION DATA CREATE :"+JSON.stringify(data['result']))
           this.submitted = false;
           this.rMessage = "bSaveConsultation5";
           this.ConsultationLoad();

         } else {
           this.rMessage = "bErrorAddOrUpdateConsultation5";
  
        }
       });
    }else {

      this.patientService.updateConsultation(this.addOrUpdateConsultation5.getRawValue(),this.getPatientId(),idDosserPrenatal,this.addOrUpdateConsultation5.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateConsultation5";
         
           this.updateConsultation5 =false;

          this.ConsultationLoad();
        } else {
          this.rMessage = "bErrorAddOrUpdateConsultation5";
  
        }
      });
    }
  


 }


}

// ADD CONSULTATION 6
onSubmitConsultation6()
{   
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
              
  let rdvTerme  =new Date(this.addOrUpdateConsultation6.value.rdvTerme).getTime() / 1000;
  let dateConvertis =new Date(this.addOrUpdateConsultation6.value.date).getTime() / 1000;
  let prochEcho = new Date(this.addOrUpdateConsultation6.value.prochEcho).getTime() / 1000;
  
  let prochRDV= new Date(this.addOrUpdateConsultation6.value.prochRDV).getTime() / 1000;
 
  let staffDate =new Date(this.addOrUpdateConsultation6.value.staffDate).getTime() / 1000;
  this.addOrUpdateConsultation6.patchValue({
    date:dateConvertis,
    staffDate:staffDate,
    prochEcho:prochEcho,
    prochRDV:prochRDV,
    termeSA:this.inputValueTerme,
    rdvTerme:rdvTerme,
    type:this.consultation_6,
    troubleUrinaires: (this.addOrUpdateConsultation6.value.troubleUrinaires == 'oui')? true : false,
    urgence: (this.addOrUpdateConsultation6.value.urgence == 'oui')? true : false,
    pertes: (this.addOrUpdateConsultation6.value.pertes == 'oui')? true : false,
    maf: (this.addOrUpdateConsultation6.value.maf == 'oui')? true : false,
    metrorragies: (this.addOrUpdateConsultation6.value.metrorragies == 'oui')? true : false,
    echoDebutGrossesse: (this.addOrUpdateConsultation6.value.echoDebutGrossesse == 'oui')? true : false,
    contractionAnormale: (this.addOrUpdateConsultation6.value.contractionAnormale == 'oui')? true : false,
  });
 
 this.rMessage="";

 if (this.addOrUpdateConsultation6.invalid) {
   return;
 }else {

    if(!this.updateConsultation6){
       this.patientService.createConsultation(this.addOrUpdateConsultation6.getRawValue(),this.getPatientId(),idDosserPrenatal).subscribe((data) => {
         if (data.code === 201) {
          console.log("CONSULTATION 2 DATA CREATE :"+JSON.stringify(data['result']))
           this.submitted = false;
           this.rMessage = "bSaveConsultation6";
           this.ConsultationLoad();

         } else {
           this.rMessage = "bErrorAddOrUpdateConsultation6";
  
        }
       });
    }else {

      this.patientService.updateConsultation(this.addOrUpdateConsultation6.getRawValue(),this.getPatientId(),idDosserPrenatal,this.addOrUpdateConsultation6.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateConsultation6";
          console.log("CONSULTATION DATA UPDATE :"+JSON.stringify(this.addOrUpdateConsultation6.value))
          console.log("CONSULTATION DATA UPDATE after :"+JSON.stringify(data))

           this.updateConsultation6 =false;

          this.ConsultationLoad();
        } else {
          this.rMessage = "bErrorAddOrUpdateConsultation6";
  
        }
      });
    }
  


 }


}

// ADD CONSULTATION 7
onSubmitConsultation7()
{                 
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

  let rdvTerme  =new Date(this.addOrUpdateConsultation7.value.rdvTerme).getTime() / 1000;
  let dateConvertis =new Date(this.addOrUpdateConsultation7.value.date).getTime() / 1000;
  let prochEcho = new Date(this.addOrUpdateConsultation7.value.prochEcho).getTime() / 1000;
  
  let prochRDV= new Date(this.addOrUpdateConsultation7.value.prochRDV).getTime() / 1000;
 
  let staffDate =new Date(this.addOrUpdateConsultation7.value.staffDate).getTime() / 1000;

  this.addOrUpdateConsultation7.patchValue({
    date:dateConvertis,
    staffDate:staffDate,
    prochEcho:prochEcho,
    prochRDV:prochRDV,
    termeSA:this.inputValueTerme,
    rdvTerme:rdvTerme,
    type:this.consultation_7,
    troubleUrinaires: (this.addOrUpdateConsultation7.value.troubleUrinaires == 'oui')? true : false,
    urgence: (this.addOrUpdateConsultation7.value.urgence == 'oui')? true : false,
    pertes: (this.addOrUpdateConsultation7.value.pertes == 'oui')? true : false,
    maf: (this.addOrUpdateConsultation7.value.maf == 'oui')? true : false,
    metrorragies: (this.addOrUpdateConsultation7.value.metrorragies == 'oui')? true : false,
    echoDebutGrossesse: (this.addOrUpdateConsultation7.value.echoDebutGrossesse == 'oui')? true : false,
    contractionAnormale: (this.addOrUpdateConsultation7.value.contractionAnormale == 'oui')? true : false,
  });
 
 this.rMessage="";

 if (this.addOrUpdateConsultation7.invalid) {
   return;
 }else {

    if(!this.updateConsultation7){
       this.patientService.createConsultation(this.addOrUpdateConsultation7.getRawValue(),this.getPatientId(),idDosserPrenatal).subscribe((data) => {
         if (data.code === 201) {
          console.log("CONSULTATION DATA CREATE :"+JSON.stringify(data['result']))
           this.submitted = false;
           this.rMessage = "bSaveConsultation7";
           this.ConsultationLoad();

         } else {
           this.rMessage = "bErrorAddOrUpdateConsultation7";
  
        }
       });
    }else {

      this.patientService.updateConsultation(this.addOrUpdateConsultation7.getRawValue(),this.getPatientId(),idDosserPrenatal,this.addOrUpdateConsultation7.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateConsultation7";
          console.log("CONSULTATION DATA UPDATE :"+JSON.stringify(this.addOrUpdateConsultation7.value))
          console.log("CONSULTATION DATA UPDATE after :"+JSON.stringify(data))

           this.updateConsultation7 =false;

          this.ConsultationLoad();
        } else {
          this.rMessage = "bErrorAddOrUpdateConsultation7";
  
        }
      });
    }
  


 }


}

// ADD CONSULTATION 8
onSubmitConsultation8()
{    
  const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
             
  let rdvTerme  =new Date(this.addOrUpdateConsultation8.value.rdvTerme).getTime() / 1000;
  let dateConvertis =new Date(this.addOrUpdateConsultation8.value.date).getTime() / 1000;
  let prochEcho = new Date(this.addOrUpdateConsultation8.value.prochEcho).getTime() / 1000;
  
  let prochRDV= new Date(this.addOrUpdateConsultation8.value.prochRDV).getTime() / 1000;
 
  let staffDate =new Date(this.addOrUpdateConsultation8.value.staffDate).getTime() / 1000;

  this.addOrUpdateConsultation8.patchValue({
    date:dateConvertis,
    staffDate:staffDate,
    prochEcho:prochEcho,
    prochRDV:prochRDV,
    termeSA:this.inputValueTerme,
    rdvTerme:rdvTerme,
    type:this.consultation_8,
    troubleUrinaires: (this.addOrUpdateConsultation8.value.troubleUrinaires == 'oui')? true : false,
    urgence: (this.addOrUpdateConsultation8.value.urgence == 'oui')? true : false,
    pertes: (this.addOrUpdateConsultation8.value.pertes == 'oui')? true : false,
    maf: (this.addOrUpdateConsultation8.value.maf == 'oui')? true : false,
    metrorragies: (this.addOrUpdateConsultation8.value.metrorragies == 'oui')? true : false,
    echoDebutGrossesse: (this.addOrUpdateConsultation8.value.echoDebutGrossesse == 'oui')? true : false,
    contractionAnormale: (this.addOrUpdateConsultation8.value.contractionAnormale == 'oui')? true : false,
  });
 
 this.rMessage="";

 if (this.addOrUpdateConsultation8.invalid) {
   return;
 }else {

    if(!this.updateConsultation8){
       this.patientService.createConsultation(this.addOrUpdateConsultation8.getRawValue(),this.getPatientId(),idDosserPrenatal).subscribe((data) => {
         if (data.code === 201) {
          console.log("CONSULTATION 2 DATA CREATE :"+JSON.stringify(data['result']))
           this.submitted = false;
           this.rMessage = "bSaveConsultation8";
           this.ConsultationLoad();

         } else {
           this.rMessage = "bErrorAddOrUpdateConsultation8";
  
        }
       });
    }else {

      this.patientService.updateConsultation(this.addOrUpdateConsultation8.getRawValue(),this.getPatientId(),idDosserPrenatal,this.addOrUpdateConsultation8.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.loading=false;  
          this.rMessage = "bUpdateConsultation8";
              this.updateConsultation8 =false;

          this.ConsultationLoad();
        } else {
          this.rMessage = "bErrorAddOrUpdateConsultation8";
  
        }
      });
    }
  


 }


}
// FIN CONSULTATION


 onSubmitAntecedentObstetricaux(){
   
    let patientId =this.getPatientId();;
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
    this.addOrUpdateAntecedentObstetricals.patchValue({
      annee: +this.addOrUpdateAntecedentObstetricals.value.annee,
      poidsNne1: +this.addOrUpdateAntecedentObstetricals.value.poidsNne1,
      poidsNne2: +this.addOrUpdateAntecedentObstetricals.value.poidsNne2
    })
    this.rMessage="";

    if (this.addOrUpdateAntecedentObstetricals.invalid) {
      return;
    }

    if (this.addOrUpdateAntecedentObstetricals.value.id!=null){
      let grossesseId =this.addOrUpdateAntecedentObstetricals.value.id;
      this.patientService.updateForm(patientId,idDosserPrenatal,grossesseId,this.addOrUpdateAntecedentObstetricals.getRawValue(),9).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = " bUpdateAntecedentMereChirurgie";
          this.addOrUpdateAntecedentObstetricals.reset()
          $("#formObstetrical").modal('hide');
          this.AntecedentLoad();
        } else {
          this.rMessage = "bErrorAntecedentMereChirurgie";
        }
      });
    }
    else{
      this.patientService.createForm(patientId,idDosserPrenatal,this.addOrUpdateAntecedentObstetricals.getRawValue(),9).subscribe((data) => {
        if (data.code === 201) {
          this.submitted = false;
          this.rMessage = "bSaveAntecedentObstetricaux";
          this.addOrUpdateAntecedentObstetricals.reset()
          $("#formObstetrical").modal('hide');
          this.AntecedentLoad();
        } else {
          this.rMessage = "bErrorAntecedentObstetricaux";
        }
      });
    }   
   
  }

  supprimerAntecedentObstetricaux(i:String){
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.patientService.deleteAntecedentObstetricals(this.getPatientId(),i).subscribe(
      data =>{
        if(data.code==200){
          this.idSelected="-1";
          $("#formSuppression").modal("hide");
          this.AntecedentLoad()
        }
      }
    )
     
    }
 

  onSubmitAntecedentGynecologique(){
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.aMaladie= [];
    this.aMaladie.push((this.addOrUpdateAntecedentGynecologique.value.infertilite == 'oui')? 'infertilite' : '')
    this.aMaladie.push((this.addOrUpdateAntecedentGynecologique.value.contraception == 'oui')? 'contraception' : '')
    this.loading=true;  
    let body ={
     "maladies": this.aMaladie,
     "id":this.addOrUpdateAntecedentGynecologique.value.id,
     "gynecoAutres":this.addOrUpdateAntecedentGynecologique.value.gynecoAutres
    }

    let patientId =this.getPatientId();;
    let dossierId = this.dossier.id;

    this.rMessage="";

    this.addOrUpdateAntecedentGynecologique.patchValue({
      patientId:patientId
    });

    if (this.addOrUpdateAntecedentGynecologique.invalid) {
      return;
    }

    if (this.addOrUpdateAntecedentGynecologique.value.id!=null){
      let grossesseId =this.addOrUpdateAntecedentGynecologique.value.id;
      this.patientService.updateForm(patientId,idDosserPrenatal,grossesseId,body,8).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.loading=false;  
          this.aMaladie= [];
          this.rMessage = " bUpdateAntecedentGynécologiques";
          this.AntecedentLoad();
        } else {
          this.rMessage = "bErrorAntecedentGynécologiques";
        }
      });
    }
    else{
      this.patientService.createForm(patientId,idDosserPrenatal,body,8).subscribe((data) => {
        if (data.code === 201) {
          this.submitted = false;
          this.rMessage = "bSaveAntecedentGynécologiques";
          this.aMaladie= [];
          this.AntecedentLoad();
          this.addOrUpdateAntecedentGynecologique.disable();
        } else {
          this.rMessage = "bErrorAntecedentGynécologiques";
        }
      });
    }
    this.addOrUpdateAntecedentGynecologique.disable();
  }

  onSubmitAntecedentMereChirurgicaux(){
    let patientId =this.getPatientId();;
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
    let aMaladie =this.addOrUpdateAntecedentMereChirurgicauxForm.value.maladies ;
    this.loading=true;
    this.rMessage="";

    this.addOrUpdateAntecedentMereChirurgicauxForm.patchValue({
      patientId:patientId
    });

    if (this.addOrUpdateAntecedentMereChirurgicauxForm.invalid) {
      return;
    }

    if (this.addOrUpdateAntecedentMereChirurgicauxForm.value.id!=null){
      let grossesseId =this.addOrUpdateAntecedentMereChirurgicauxForm.value.id;
      this.patientService.updateForm(patientId,idDosserPrenatal,grossesseId,this.addOrUpdateAntecedentMereChirurgicauxForm.getRawValue(),7).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.loading=false;
          this.rMessage = " bUpdateAntecedentMereChirurgie";
          this.AntecedentLoad();

        } else {
          this.rMessage = "bErrorAntecedentMereChirurgie";
        }
      });
    }
    else{
      this.patientService.createForm(patientId,idDosserPrenatal,this.addOrUpdateAntecedentMereChirurgicauxForm.getRawValue(),7).subscribe((data) => {
        if (data.code === 201) {
          this.submitted = false;
          this.loading=false;
          this.rMessage = "bSaveAntecedentMereChirurgie";
          this.populateFormAntecedentChirurgicauxForm(this.addOrUpdateAntecedentMereChirurgicauxForm,data.result);
          this.addOrUpdateAntecedentMereChirurgicauxForm.disable();
          this.AntecedentLoad();
        } else {
          this.rMessage = "bErrorAntecedentMereChirurgie";
        }
      });
    }
    this.addOrUpdateAntecedentMereChirurgicauxForm.disable();
  }

  onFocusOutEvent(event: any){
   
    let poids= this.addOrUpdateAntecedentMedMereForm.value.poids>0?this.addOrUpdateAntecedentMedMereForm.value.poids:0;    
    let taille= event.target.value>0?event.target.value:0;   
    let bmi =  (poids / (taille * taille)).toFixed(1);

    this.addOrUpdateAntecedentMedMereForm.patchValue({
      imc:bmi
    });
  }


  onFocusOutEventAllergie(event: any){
    
    if(event.target.value == 'oui'){
      console.log("oui")

    }else {
      console.log("non :")

    }
   
  }

  onSubmitAntecedentMedicauxMere(){
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

     this.aMaladie= [];
     this.aMaladie.push((this.addOrUpdateAntecedentMedMereForm.value.hypertension == 'oui')? 'hypertension' : '')
     this.aMaladie.push((this.addOrUpdateAntecedentMedMereForm.value.cardiopathie == 'oui')? 'cardiopathie' : '')
     this.aMaladie.push((this.addOrUpdateAntecedentMedMereForm.value.insuffisanceRenale == 'oui')? 'insuffisanceRenale' : '')
     this.aMaladie.push((this.addOrUpdateAntecedentMedMereForm.value.asthme == 'oui')? 'asthme' : '')
     this.aMaladie.push((this.addOrUpdateAntecedentMedMereForm.value.tuberculose == 'oui')? 'tuberculose' : '')
     this.aMaladie.push((this.addOrUpdateAntecedentMedMereForm.value.hepatiteB == 'oui')? 'hepatiteB' : '')
     this.aMaladie.push((this.addOrUpdateAntecedentMedMereForm.value.diabete == 'oui')? 'diabete' : '')
     this.aMaladie.push((this.addOrUpdateAntecedentMedMereForm.value.drepanocytose == 'oui')? 'drepanocytose' : '')
     this.aMaladie.push((this.addOrUpdateAntecedentMedMereForm.value.arv == 'oui')? 'arv' : '')
     this.aMaladie.push((this.addOrUpdateAntecedentMedMereForm.value.anemie == 'oui')? 'anemie' : '')

     let body ={
      "allergies":this.addOrUpdateAntecedentMedMereForm.value.allergies,
      "autres": this.addOrUpdateAntecedentMedMereForm.value.autres,
      "imc": this.addOrUpdateAntecedentMedMereForm.getRawValue().imc,
      "id":this.addOrUpdateAntecedentMedMereForm.value.id,
      "maladies": this.aMaladie,
      "poids":this.addOrUpdateAntecedentMedMereForm.value.poids,
      "tabac": this.addOrUpdateAntecedentMedMereForm.value.tabac,
      "taille": this.addOrUpdateAntecedentMedMereForm.value.taille,
      "toxicomanie": this.addOrUpdateAntecedentMedMereForm.value.toxicomanie
    }


    let patientId =this.getPatientId();
    this.rMessage="";

    if (this.addOrUpdateAntecedentMedMereForm.invalid) {
      return;
    } else{


      if (this.addOrUpdateAntecedentMedMereForm.value.id!=null){

        let grossesseId =this.addOrUpdateAntecedentMedMereForm.value.id;
        this.patientService.updateForm(patientId,idDosserPrenatal,grossesseId,body,6).subscribe((data) => {
          if (data.code === 200) {
            this.submitted = false;
            this.loading=false;
            this.aMaladie= [];
            this.rMessage = " bUpdateAntecedentMedicauxMere";
            this.AntecedentLoad();
          } else {
            this.rMessage = "bErrorAntecedentMedicauxMere";
          }
        });
      }
      else{
      
        this.patientService.createForm(patientId,idDosserPrenatal,body,6).subscribe((data) => {
          if (data.code === 200) {
            this.submitted = false;
            this.loading=false;
            this.rMessage = "bSaveAntecedentMedicauxMere";
            this.aMaladie= [];
            this.AntecedentLoad();
  
          } else {
            this.rMessage = "bErrorAntecedentMedicauxMere";
          }
        });
        this.addOrUpdateAntecedentMedMereForm.disable();
      }

    }

  
   
  }

  onSubmitAntecedentFamiliaux()
  {

    let patientId =this.getPatientId();;
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
    this.loading=true;
    this.rMessage="";

    this.addOrUpdateAntecedentFamiliauxForm.patchValue({
      patientId:patientId
    });

    if (this.addOrUpdateAntecedentFamiliauxForm.invalid) {
      return;
    }

    if (this.addOrUpdateAntecedentFamiliauxForm.value.id!=null){
      let grossesseId =this.addOrUpdateAntecedentFamiliauxForm.value.id;
      this.patientService.updateForm(patientId,idDosserPrenatal,grossesseId,this.addOrUpdateAntecedentFamiliauxForm.getRawValue(),5).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.loading=false;
          this.rMessage = " bUpdateAntecedentFamiliaux";
          this.AntecedentLoad();

        } else {
          this.rMessage = "bErrorAntecedentFamiliaux";
        }
      });
    }
    else{
      this.patientService.createForm(patientId,idDosserPrenatal,this.addOrUpdateAntecedentFamiliauxForm.getRawValue(),5).subscribe((data) => {
        if (data.code === 201) {
          this.submitted = false;
          this.loading=false;
          this.rMessage = "bSaveAntecedentFamiliaux";
          this.populateFormAntecedentFamiliaux(this.addOrUpdateAntecedentFamiliauxForm,data.result);
          this.AntecedentLoad();
          this.addOrUpdateAntecedentFamiliauxForm.disable();
        } else {
          this.rMessage = "bErrorAntecedentFamiliaux";
        }
      });
    }
  }

  onSubmitAntecedentConjoint()
  {
    this.loading=true;
    let patientId =this.getPatientId();;
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");
    this.rMessage="";

    if (this.addOrUpdateAntecedentConjointForm.invalid) {
      return;
    }

    if (this.addOrUpdateAntecedentConjointForm.value.id!=null){
      let grossesseId =this.addOrUpdateAntecedentConjointForm.value.id;
      this.patientService.updateForm(patientId,idDosserPrenatal,grossesseId,this.addOrUpdateAntecedentConjointForm.getRawValue(),4).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.loading=false;
          this.AntecedentLoad();
          this.rMessage = " bUpdateAntecedent";

        } else {
          this.rMessage = "bErrorAntecedent";
        }
      });
    }
    else{
      this.patientService.createForm(patientId,idDosserPrenatal,this.addOrUpdateAntecedentConjointForm.getRawValue(),4).subscribe((data) => {
        if (data.code === 201) {
          this.submitted = false;
          this.loading=false;
          this.rMessage = "bSaveAntecedent";
          this.loadDataForm(4,this.addOrUpdateAntecedentConjointForm,data.result);
          this.AntecedentLoad();

        } else {
          this.rMessage = "bErrorAntecedent";
        }
      });
    }
  }

  onSubmitGrossesse()
  {
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

    this.loading=true;
    let doctor=Object.assign(new CareGivers(),this.dataCareGiversDetails?.find(x=>x.id===this.addOrUpdateGrossesseForm.value.medecin)); 
    this.rMessage="";
    let dateDerniereRegle=new Date(this.addOrUpdateGrossesseForm.value.dateDerniereRegle).getTime() / 1000;
    let le=new Date(this.addOrUpdateGrossesseForm.getRawValue().le).getTime() / 1000;
    let tp=new Date(this.addOrUpdateGrossesseForm.getRawValue().tp).getTime() / 1000;
    let datTp =new Date(this.addOrUpdateGrossesseForm.getRawValue().dateDerniereRegle);
          let dateTp =(datTp!=null)?datTp.setDate(datTp.getDate()+280): new Date().setDate(new Date().getDate()+280);
          let dpFInal =new Date(dateTp).toISOString().substring(0, 10);
    this.addOrUpdateGrossesseForm.patchValue({
      dateDerniereRegle:dateDerniereRegle,
      le:le,
      tp:dpFInal,
    });
 
    if (this.addOrUpdateGrossesseForm.invalid) {
      return;
    }
    if (this.addOrUpdateGrossesseForm.value.id!=null){
      let grossesseId =this.addOrUpdateGrossesseForm.value.id;

      this.patientService.updateGrossesse(this.getPatientId(),idDosserPrenatal,grossesseId,this.addOrUpdateGrossesseForm.getRawValue()).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.loading=false;
          this.GrossesseLoad();
          this.rMessage = "bUpdateGrossesse";

        } else {
          this.rMessage = "bErrorGrossesse";
        }
      });
    }
    else{
      this.patientService.createGrossesse(this.getPatientId(),idDosserPrenatal,this.addOrUpdateGrossesseForm.getRawValue()).subscribe((data) => {
        if (data.code === 201) {
          this.GrossesseLoad();
          this.loading=false;
          this.submitted = false;
          this.rMessage = "bSaveGrossesse";
          
        } else {
          this.rMessage = "bErrorGrossesse";
        }
      });
    }
  }

  private setFormGrossesse(data: any, dpFInal: string) {
    this.addOrUpdateGrossesseForm.setValue({
      id: data.id,
      typeGrossesse: data.typeGrossesse,
      precisionGrossesse: data.precisionGrossesse,
      caractereCicatriciel: data.caractereCicatriciel,
      medecin: data.medecin,
      le: (data.le > 0) ? new Date(data.le * 1000)
        .toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
      pronosticVoieAccouchement: data.pronosticVoieAccouchement,
      observations: data.observations,
      dateDerniereRegle: (data.dateDerniereRegle > 0) ? new Date(data.dateDerniereRegle * 1000)
        .toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
      g: this.dossier.g,
      p: this.dossier.p,
      tp: dpFInal,
      typeUterus: data.typeUterus
    });
  }

  onUpdatePrenatal(){
    this.submitted = true;
    this.loading = true;
    const idDosserPrenatal = (localStorage.getItem("dossierPrenatalAvoir") == null)? this.dossier.id :localStorage.getItem("dossierPrenatalAvoir");

        if (this.updateFormPrenatal.invalid) {
      return;
    } else{
      this.updateFormPrenatal.patchValue({
        ageConjoint:           this.updateFormPrenatal.getRawValue().ageConjoint,
        nombreEpousesConjoint: this.updateFormPrenatal.getRawValue().nombreEpousesConjoint, 
        id:                    idDosserPrenatal,
        praticien:             this.dossier.praticien,
        rhesus:                this.dossier.rhesus,
        g:this.dossier.g,
        p:this.dossier.p
      }); 

      this.patientService.updateDossierPrenatal(this.getPatientId(),idDosserPrenatal,this.updateFormPrenatal.getRawValue()).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.loading = false;
          this.dossier = Object.assign(new DossierPrenatal(), data.result);
          this.confirmationModification=-1;
          $("#formConfirmationModification").modal("hide");
          this.PrenatalLoad();
        } else {
          this.rMessage = "bErrorUpdate";
        }
      });
    }

  
  }

  onCheckboxChange(event: any) {
    const selectedCountries = (this.addOrUpdateAntecedentMedMereForm.controls['maladies'] as FormArray);
    if (event.target.checked) {
      selectedCountries.push(new FormControl(event.target.value));

    } else {
      const index = selectedCountries.controls
      .findIndex(x => x.value === event.target.value);
      selectedCountries.removeAt(index);
    }
  }

  onCheckboxChangeGyneco(event: any) {
    const selectedCountries = (this.addOrUpdateAntecedentGynecologique.controls['maladies'] as FormArray);
    if (event.target.checked) {
      selectedCountries.push(new FormControl(event.target.value));

    } else {
      const index = selectedCountries.controls
      .findIndex(x => x.value === event.target.value);
      selectedCountries.removeAt(index);
    }
  }
  confirmationModificationEvent(){
    switch(this.confirmationModification){
      case 1:  
      console.log("okkkkkkkkkkkkkkkkkkkkkkkk")
      let element = document.getElementById('pills-convention-tab-fill') as HTMLInputElement;
       $("#formConfirmationModification").modal("show");
        
   
        break;
      case 2:   
           
        break;
      case 3:       
        break;
      case 4:
        break;
      case 5:        
        break;
      case 6:         
        break;
      case 7:       
        break;
      case 8:         
        break;
      case 9:     
        break;
      case 10:
        break;
      case 11:           
        break;
      case 12:          
        break;
      case 13:             
        break;
      case 14:        
        break;
      case 15:           
        break;
      case 16:                
        break;
      case 17:               
        break;
      case 18:
        break;
      case 19:
        break;
      case 20:
        break;
      case 21:
        break;
      case 22:
        break;
      case 23:                             
        break;                    
    }

  }

  activateForm(id){
    this.click =false;
    this.disabled='';
    this.submitted =true;
    this.rMessage = "";
    switch(id){
      case 1:
        this.updateFormPrenatal.enable();
        this.updateFormPrenatal.controls['age'].disable();
        this.confirmationModification=1;
        break;
      case 2:
        this.addorUpdateSuiviMedical.enable();
        this.confirmationModification=2;

        break;
      case 3:
        this.addOrUpdateGrossesseForm.enable();
        this.addOrUpdateGrossesseForm.controls['dateDerniereRegle'].disable();
        this.addOrUpdateGrossesseForm.controls['g'].disable();
        this.addOrUpdateGrossesseForm.controls['p'].disable();
        this.addOrUpdateGrossesseForm.controls['tp'].disable();
        this.confirmationModification=3;

       
        break;
      case 4:
        this.addOrUpdateAntecedentConjointForm.enable();
        this.confirmationModification=4;

        break;
      case 5:
        this.disabled='';
        this.addOrUpdateAntecedentFamiliauxForm.enable();
        this.confirmationModification=5;

        break;
      case 6:
          this.disabled='';
          this.checkbox=false;
          this.addOrUpdateAntecedentMedMereForm.enable();
          this.addOrUpdateAntecedentMedMereForm.controls['imc'].disable();
          this.confirmationModification=6;

          break;
      case 7:
        this.disabled='';
        this.addOrUpdateAntecedentMereChirurgicauxForm.enable();
        this.confirmationModification=7;

        break;
      case 8:
          this.disabled='';
          this.checkbox=false;
          this.addOrUpdateAntecedentGynecologique.enable();
          this.confirmationModification=8;

        break;

        case 9:
          this.disabled='';
          this.addOrUpdateEchographie1.enable();
          this.addOrUpdateEchographie1.controls['terme'].disable();
          this.addOrUpdateEchographie1.controls['ddr'].disable();
          this.confirmationModification=9;



          break;

          case 10:
            this.disabled='';
            this.addOrUpdateEchographie2.enable();
            this.addOrUpdateEchographie2.controls['terme'].disable();
            this.addOrUpdateEchographie2.controls['ddr'].disable();
            this.confirmationModification=10;


            break;

          case 11:
            this.disabled='';
            this.addOrUpdateEchographie3.enable();
            this.addOrUpdateEchographie3.controls['terme'].disable();
            this.addOrUpdateEchographie3.controls['ddr'].disable();
            this.confirmationModification=11;

              break;

          case 12:
            this.disabled='';
            this.addOrUpdateEchographie.enable();
            this.addOrUpdateEchographie.controls['terme'].disable();
            this.addOrUpdateEchographie.controls['ddr'].disable();
            this.confirmationModification=12;


                break;
          case 13:
               this.disabled='';
                this.addOrUpdateBilan.enable(); 
                this.addOrUpdateBilan.controls['gp'].disable();
                this.addOrUpdateBilan.controls['rh'].disable();  
                this.confirmationModification=13;

                break;
         case 14:
                this.disabled='';
                this.addOrUpdateConsultation1.enable();
                this.addOrUpdateConsultation1.controls['termeSA'].disable();
                this.confirmationModification=14;




                break;
         case 15:
                  this.disabled='';
                  this.addOrUpdateConsultation2.enable();
                  this.addOrUpdateConsultation2.controls['termeSA'].disable();
                  this.confirmationModification=15;


                  break;
        case 16:
                  this.disabled='';
                  this.addOrUpdateConsultation3.enable();
                  this.addOrUpdateConsultation3.controls['termeSA'].disable();
                  this.confirmationModification=16;


                  break;
        case 17:
                    this.disabled='';
                    this.addOrUpdateConsultation4.enable();
                    this.addOrUpdateConsultation4.controls['termeSA'].disable();
                    this.confirmationModification=17;


                    break;
        case 18:
                      this.disabled='';
                      this.addOrUpdateConsultation5.enable();
                      this.addOrUpdateConsultation5.controls['termeSA'].disable();
                      this.confirmationModification=18;
                      break;
        case 19:
                        this.disabled='';
                        this.addOrUpdateConsultation6.enable();
                        this.addOrUpdateConsultation6.controls['termeSA'].disable();
                        this.confirmationModification=19;
                        break;
         case 20:
                          this.disabled='';
                          this.addOrUpdateConsultation7.enable();
                          this.addOrUpdateConsultation7.controls['termeSA'].disable();
                          this.confirmationModification=20;
                          break;
         case 21:
                            this.disabled='';
                            this.addOrUpdateConsultation8.enable();
                            this.addOrUpdateConsultation8.controls['termeSA'].disable();
                            this.confirmationModification=21;
                            break;

                           case 22:
                              this.disabled='';
                              this.addOrUpdateStaff.enable();
                              this.confirmationModification=22;
                              break;
                              case 23:
                                this.disabled='';
                                this.addOrUpdateEchographieAutre.enable();
                                this.addOrUpdateEchographieAutre.controls['terme'].disable();
                                this.addOrUpdateEchographieAutre.controls['ddr'].disable();
                                this.confirmationModification=23;

                                break;                    
    }

  }

  supprimerVaccination(){

   switch(this.typeVaccinationChoisi){
      case 1:
          this.supprimerTetanos(this.idSelected)
      break;
      case 2:
        this.supprimerRhophylac(this.idSelected)

      break;
      case 3:
        this.supprimerTpi(this.idSelected)
        break;
      case 5:
        this.supprimerAntecedentObstetricaux(this.idSelected)  
        
        break;
                         
    }

  }


  annulerSaveTetanos(){
  this.myLines=[];
  this.myLinesTempo=[];
  this.validerTetanos=false;
  this.VaccinationLoad()
  }
  annulerSaveRhophylac(){
    this.myRhophylacTempo=[];
    this.myRhophylacs=[];
    this.validerRhophylac=false;
    this.RhophylacLoad()
  }
  annulerSaveTpi(){
    this.myTpis=[];
    this.myTpisTempo=[];
    this.validerTpi=false;
    this.TpiLoad()
   }
  
  resetMessage(){
    this.rMessage = "";
  }
 initDateVaccination(){
  let X = Math.trunc((new Date(new Date().toISOString().substring(0, 10)).getTime()/1000 - this.ddr)/86400/7)  ;
  let Y =((new Date(new Date().toISOString().substring(0, 10)).getTime()/1000 - this.ddr)/86400) % 7 ;
  let terme = X +' SA + ' + Y + ' jours' ;

  this.createTetanos.patchValue( {
    date: new Date().toISOString().substring(0, 10)
  } )
  this.createTpi.patchValue( {
    date: new Date().toISOString().substring(0, 10),
    terme:terme
  } )
  this.createRhophylac.patchValue( {
    date: new Date().toISOString().substring(0, 10),
    terme:terme
  } )
 }

  resetAntecedentObstetricals(){
    this.addOrUpdateAntecedentObstetricals.reset();
  }

  openNewObstetrical(){

  }

}


