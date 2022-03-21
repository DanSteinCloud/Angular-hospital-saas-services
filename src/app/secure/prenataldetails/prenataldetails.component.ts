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
    { id: 26, labelle: 'dépistage Diabète gestionnel' },
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
  inputValue:String=""
  inputValueTerme:String=""
 placeholder :String="";
  praticienName:String=""
  getValue(event: Event): String {  
    let terme=new Date((event.target as HTMLInputElement).value).getTime()/1000 - this.ddr;
    this.placeholder=this.inputValue =Math.ceil((terme/86400)/7).toString();
   console.log("date inputValue :"+ this.inputValue)
   console.log("data consultation :"+ new Date((event.target as HTMLInputElement).value).getTime()/1000)
    return Math.ceil((terme/86400)/7).toString();
  }

  getValueTerme(event: Event): String {  
    let terme=new Date((event.target as HTMLInputElement).value).getTime()/1000 - this.ddr;
    this.placeholder=this.inputValueTerme =Math.ceil((terme/86400)/7).toString();
    return Math.ceil((terme/86400)/7).toString();
  }


  constructor( private patientService: PatientService,
    private router: Router,
    private refdata: RefdataService,
    private route: ActivatedRoute,
    private caregivers: CareGiversService,
    private fb: FormBuilder) { 
    }

  
    
  ngOnInit(): void {

    
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
    const detailsDossierPrenatal =this.patientService.findDossierPrenatal(idPatient);
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
            uid: this.dossier?.id,
            udateDerniereRegle: new Date(this.dossier?.dateDerniereRegle * 1000).toISOString().substring(0, 10),
            ugroupSanguin: this.dossier?.groupSanguin,
            urhesus: this.dossier?.rhesus,
            upraticien: this.dossier?.praticien,
            ug:this.dossier?.g,
            up: this.dossier?.p,
            upatientId: this.getPatientId()
          });
          this.patientService.findGrossesse(this.getPatientId(), this.dossier.id).subscribe(responses => {
            if (responses['code'] == 200) {
              
             let data = Object.assign(new Grossesse(), responses["result"][0]);
             let datTp =new Date(data.dateDerniereRegle * 1000);
             let dateTp =(data.dateDerniereRegle>0)?datTp.setDate(datTp.getDate()+280): new Date().setDate(new Date().getDate()+280);
             this.termePrevu =new Date(dateTp).toISOString().substring(0, 10);
            
         }
       });
   

          this.updateFormPrenatal.patchValue({
            age:                   this.dossier.age,
            ageConjoint:           this.dossier.ageConjoint,
            groupSanguin:          this.dossier.groupSanguin,
            id:                    this.dossier.id,
            nationaliteConjoint:   this.dossier.nationaliteConjoint,
            nombreEpousesConjoint: this.dossier.nombreEpousesConjoint,
            praticien:             this.dossier.praticien,
            profession:            this.dossier.profession,
            professionConjoint:    this.dossier.professionConjoint,
            rhesus:                this.dossier.rhesus,
            situationMatrimoniale: this.dossier.situationMatrimoniale,
            patientId: this.getPatientId(),
            g:this.dossier.g,
            p:this.dossier.p
          });
      }

      if (responses[7]['code']==200){
        this.dataCareGiversDetails=responses[7]["result"];
        this.careGiver=Object.assign(new CareGivers(),this.dataCareGiversDetails?.find(x=>x.id===this.dossier.praticien)); 
      }

      if (responses[8]['code']==200){
        this.patientInfos =Object.assign(new patient(), responses[8]["result"]);
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
  bip:  new FormControl(),
  ca:  new FormControl(),
  lf:  new FormControl(),
  opn:  new FormControl(),
  cn:  new FormControl(),
  col: new FormControl(),
  conclusion:  new FormControl(),
  date:  new FormControl(),
  ddr:  new FormControl(),
  epf:  new FormControl(),
  id:  new FormControl(),
  la: new FormControl(),
  lcc:  new FormControl(),
  medecin : new FormControl(),
  morphologie:  new FormControl(),
  nombreEmbryon: new FormControl(),
  placenta:  new FormControl(),
  precisionSuivi:  new FormControl(),
  presentation:  new FormControl(),
  suiviCsSF: new FormControl("", Validators.required),
  t:  new FormControl(),
  terme:  new FormControl(),
  type: new FormControl(),
  voieAccouchement: new FormControl()
});
  this.addOrUpdateEchographie1 = new FormGroup( {
    bip:  new FormControl(),
    ca:  new FormControl(),
    lf:  new FormControl(),
    opn:  new FormControl(),
    cn:  new FormControl(),
    col: new FormControl(),
    conclusion:  new FormControl(),
    date:  new FormControl(new Date().toISOString().substring(0, 10)),
    ddr:  new FormControl(),
    epf:  new FormControl(),
    id:  new FormControl(),
    la: new FormControl(),
    lcc:  new FormControl(),
    medecin : new FormControl(),
    morphologie:  new FormControl(),
    nombreEmbryon: new FormControl(),
    placenta:  new FormControl(),
    precisionSuivi:  new FormControl(),
    presentation:  new FormControl(),
    suiviCsSF: new FormControl("", Validators.required),
    t:  new FormControl(),
    terme:  new FormControl(),
    type: new FormControl(),
    voieAccouchement: new FormControl()
  });
  

  this.addOrUpdateEchographie2 = new FormGroup( {
    bip:  new FormControl(),
    ca:  new FormControl(),
    lf:  new FormControl(),
    opn:  new FormControl(), 
    cn:  new FormControl(),
    col: new FormControl(),
    conclusion:  new FormControl(),
    date:  new FormControl(),
    ddr:  new FormControl(),
    epf:  new FormControl(),
    id:  new FormControl(),
    la: new FormControl(),
    lcc:  new FormControl(),
    medecin : new FormControl(),
    morphologie:  new FormControl(),
    nombreEmbryon: new FormControl(),
    placenta:  new FormControl(),
    precisionSuivi:  new FormControl(),
    presentation:  new FormControl(),
    suiviCsSF:new FormControl("", Validators.required),
    t:  new FormControl(),
    terme:  new FormControl(),
    type: new FormControl(),
    voieAccouchement: new FormControl()
  });

  this.addOrUpdateEchographie3 = new FormGroup( {
    bip:  new FormControl(),
    ca:  new FormControl(),
    lf:  new FormControl(),
    opn:  new FormControl(),
    cn:  new FormControl(),
    col: new FormControl(),
    conclusion:  new FormControl(),
    date:  new FormControl(),
    ddr:  new FormControl(),
    epf:  new FormControl(),
    id:  new FormControl(),
    la: new FormControl(),
    lcc:  new FormControl(),
    medecin : new FormControl(),
    morphologie:  new FormControl(),
    nombreEmbryon: new FormControl(),
    placenta:  new FormControl(),
    precisionSuivi:  new FormControl(),
    presentation:  new FormControl(),
    suiviCsSF: new FormControl("", Validators.required),
    t:  new FormControl(),
    terme:  new FormControl(),
    type: new FormControl(),
    voieAccouchement: new FormControl()
  });

  this.addOrUpdateEchographie = new FormGroup( {
    bip:  new FormControl(),
    ca:  new FormControl(),
    lf:  new FormControl(),
    opn:  new FormControl(),
    cn:  new FormControl(),
    col: new FormControl(),
    conclusion:  new FormControl(),
    date:  new FormControl(),
    ddr:  new FormControl(),
    epf:  new FormControl(),
    id:  new FormControl(),
    la: new FormControl(),
    lcc:  new FormControl(),
    medecin : new FormControl(),
    morphologie:  new FormControl(),
    nombreEmbryon: new FormControl(),
    placenta:  new FormControl(),
    precisionSuivi:  new FormControl(),
    presentation:  new FormControl(),
    suiviCsSF: new FormControl("", Validators.required),
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
    maladies: new FormArray([]),
  });

  this.addOrUpdateAntecedentMereChirurgicauxForm = new FormGroup({
    id: new FormControl(),
    chirurAutres: new FormControl(),
    chirurGyneco: new FormControl()
  });

  this.addOrUpdateAntecedentMedMereForm = this.fb.group({
    autres: new FormControl(),
    allergies: new FormControl(),
    id: new FormControl(),
    imc: new FormControl(),
    maladies: new FormArray([]),
    poids: new FormControl(),
    tabac: new FormControl(),
    taille: new FormControl(),
    toxicomanie: new FormControl()
  });

  
  this.updateFormPrenatal = new FormGroup({
    age: new FormControl("", Validators.required),
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

  this.modifierFormPrenatal = new FormGroup({
    uid: new FormControl(""),
    udateDerniereRegle: new FormControl("", Validators.required),
    ugroupSanguin: new FormControl("", Validators.required),
    urhesus: new FormControl("", Validators.required),
    upraticien: new FormControl("", Validators.required),
    ug: new FormControl(""),
    up: new FormControl(""),
    upatientId: new FormControl()
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
    this.loading = true;
    this.submitted = true;


    if (this.modifierFormPrenatal.invalid) {
      this.loading =false;
      return;
    }

    let dateDerniereRegle=new Date(this.modifierFormPrenatal.value.dateDerniereRegle).getTime() / 1000;
    this.modifierFormPrenatal.patchValue({
      dateDerniereRegle:dateDerniereRegle
    });

    this.patientService.createPrenatalFolder(this.modifierFormPrenatal.getRawValue(),this.modifierFormPrenatal.value.patientId).subscribe((res) => {
      if (res.code === 201) {
        this.rMessage = "bSave";
        $("#formFormPrenatal").modal("hide");
        this.loaddetailprenatal = true;
        this.patient = false;
        //let url ="/prenataldetails/"+this.addFormPrenatal.value.patientId;
        //this.router.navigateByUrl(url);
       // this.addFormPrenatal.reset();
      } else {
        this.rMessage = "bError";
        this.loading =false;
      }
    });
  }

  VaccinationLoad(){
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
    this.patientService.getAllTetanos(this.getPatientId(),this.dossier.id)
    .subscribe(data =>{
      this.myLines= data['result']
      console.log(" myLines au chargement :"+JSON.stringify(this.myLines))
      console.log(" id :"+JSON.stringify(data['result'][0]['id']))
      data['result'].forEach(teta => {
           teta.date=(teta.date>0) ?new Date(teta.date * 1000).toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
             this.myLinesTempo.push(teta)
    })
    console.log(" myLines au chargement tablo :"+JSON.stringify(this.myLinesTempo))

  }
    );
  }

  RhophylacLoad(){
    this.patientService.getAllRhophylac(this.getPatientId(),this.dossier.id)
    .subscribe(data =>{
      this.myRhophylacs= data['result']
      data['result'].forEach(teta => {
           teta.date=(teta.date>0) ?new Date(teta.date * 1000).toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
             this.myRhophylacTempo.push(teta)
    })
  }
    );
  }


   TpiLoad(){
    this.patientService.getAllTpi(this.getPatientId(),this.dossier.id)
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

    let item :number=0
    this.patientService.getAllBilan(this.getPatientId(),this.dossier.id)
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
                gpdate:(echographie1["date"]>0) ?new Date(echographie1["date"] * 1000)
                .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
              })
          case this.items[1].labelle:
            this.addOrUpdateBilan.patchValue( {
              rh:data["result"][0].dataTab[item].resultat,
              rhdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
            break;
        
          case this.items[2].labelle:
            this.addOrUpdateBilan.patchValue( {
              ra:data["result"][0].dataTab[item].resultat,
              radate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
            break;
          case this.items[3].labelle:
            this.addOrUpdateBilan.patchValue( {
              sra:data["result"][0].dataTab[item].resultat,
              sradate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
            break;
          
          case this.items[4].labelle:
            this.addOrUpdateBilan.patchValue( {
              to:data["result"][0].dataTab[item].resultat,
              todate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
            break;
          case this.items[5].labelle:
            this.addOrUpdateBilan.patchValue( {
              toigm:data["result"][0].dataTab[item].resultat,
              toigmdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
            break;

          case this.items[6].labelle:
            this.addOrUpdateBilan.patchValue( {
              toigg:data["result"][0].dataTab[item].resultat,
              toiggdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
            break;
          case this.items[7].labelle:
            this.addOrUpdateBilan.patchValue( {
              ru:data["result"][0].dataTab[item].resultat,
              rudate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
            break;

          case this.items[8].labelle:
            this.addOrUpdateBilan.patchValue( {
              ruigm:data["result"][0].dataTab[item].resultat,
              ruigmdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
            break;
          case this.items[9].labelle:
            this.addOrUpdateBilan.patchValue( {
              ruigg:data["result"][0].dataTab[item].resultat,
              ruiggdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
            break;
          case this.items[10].labelle:
            this.addOrUpdateBilan.patchValue( {
              tv:data["result"][0].dataTab[item].resultat,
              tvdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
             break;
          
          case this.items[11].labelle:
            this.addOrUpdateBilan.patchValue( {
              tp:data["result"][0].dataTab[item].resultat,
              tpdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
            break;
          case this.items[12].labelle:
            this.addOrUpdateBilan.patchValue( {
              vd:data["result"][0].dataTab[item].resultat,
              vddate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
              break;
          case this.items[13].labelle:
            this.addOrUpdateBilan.patchValue( {
              hi:data["result"][0].dataTab[item].resultat,
              hidate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
              break;
              case this.items[14].labelle:
                this.addOrUpdateBilan.patchValue( {
                  hc:data["result"][0].dataTab[item].resultat,
                  hcdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                })
                  break;
          case this.items[15].labelle:
            this.addOrUpdateBilan.patchValue( {
              hb:data["result"][0].dataTab[item].resultat,
              hbdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
              break;
          case this.items[16].labelle:
            this.addOrUpdateBilan.patchValue( {
              te:data["result"][0].dataTab[item].resultat,
              tedate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
              break;
          case this.items[17].labelle:
            this.addOrUpdateBilan.patchValue( {
              el:data["result"][0].dataTab[item].resultat,
              eldate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
              break;
          case this.items[18].labelle:
            this.addOrUpdateBilan.patchValue( {
              hba:data["result"][0].dataTab[item].resultat,
              hbadate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
              break;
          case this.items[19].labelle:
            this.addOrUpdateBilan.patchValue( {
              hbf:data["result"][0].dataTab[item].resultat,
              hbfdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
              break;
          case this.items[20].labelle:
            this.addOrUpdateBilan.patchValue( {
              hbb:data["result"][0].dataTab[item].resultat,
              hbbdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
              break;
          case this.items[21].labelle:
            this.addOrUpdateBilan.patchValue( {
              nfs:data["result"][0].dataTab[item].resultat,
              nfsdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
              break;
          case this.items[22].labelle:
            this.addOrUpdateBilan.patchValue( {
              HB:data["result"][0].dataTab[item].resultat,
              HBdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
              break;
          case this.items[23].labelle:
            this.addOrUpdateBilan.patchValue( {
              pl:data["result"][0].dataTab[item].resultat,
              pldate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
               break;
          case this.items[24].labelle:
            this.addOrUpdateBilan.patchValue( {
              tpTcaFi:data["result"][0].dataTab[item].resultat,
              tpTcaFidate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
            break;
            case this.items[25].labelle:
              this.addOrUpdateBilan.patchValue( {
                gly:data["result"][0].dataTab[item].resultat,
                glydate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
              })
              break;
          case this.items[26].labelle:
            this.addOrUpdateBilan.patchValue( {
              ddg:data["result"][0].dataTab[item].resultat,
              ddgdate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
              break;
          case this.items[27].labelle:
            this.addOrUpdateBilan.patchValue( {
              osuli:data["result"][0].dataTab[item].resultat,
              osulidate:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
              break;
          case this.items[28].labelle:
            this.addOrUpdateBilan.patchValue( {
              t1:data["result"][0].dataTab[item].resultat,
              t1date:(echographie1.date>0) ?new Date(echographie1.date * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            })
              break;
              case this.items[29].labelle:
                this.addOrUpdateBilan.patchValue( {
                  t2:data["result"][0].dataTab[item].resultat,
                  t2date:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
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
    this.addOrUpdateEchographie1.disable();
    this.addOrUpdateEchographie2.disable();
    this.addOrUpdateEchographie3.disable();
    this.addOrUpdateEchographie.disable();
    this.addOrUpdateEchographieAutre.disable();
    
    this.addOrUpdateEchographie1.patchValue( {
      ddr:new Date(this.dossier?.dateDerniereRegle * 1000).toISOString().substring(0, 10)
       });
 console.log("echographieLoad :"+JSON.stringify( this.addOrUpdateEchographie1.value))
      this.addOrUpdateEchographieAutre.patchValue( {
        ddr:new Date(this.dossier?.dateDerniereRegle * 1000).toISOString().substring(0, 10)
       
        });
   
    this.loadingEchographieAutre =false,
    this.loadingEchographie1 =false,
    this.loadingEchographie2 =false,
    this.loadingEchographie3 =false
    this.loadingEchographie =false
    let item :number=0
    this.patientService.getAllEchographiesByIdPatientAndIdDossierPrenatal(this.getPatientId(),this.dossier.id)
    .subscribe(
      data =>{
            
           console.log(" LISTE :"+JSON.stringify(data))
           while(data["result"][item] !=null){
            let echographie1 =data["result"][item];
            let suiviCsSF :String=""
            if(echographie1.suiviCsSF){
                suiviCsSF= "Oui"
            }else  {
              suiviCsSF= "Non"
            }
       switch(data["result"][item].type){
        case this.echographie_autre:
          this.loadingEchographieAutre =true
          this.addOrUpdateEchographieAutre.disable();
          this.addOrUpdateEchographieAutre.setValue( {
            bip_ca_lf_opn: echographie1.bip_ca_lf_opn,
            cn:  echographie1.cn,
            col: echographie1.col,
            conclusion:  echographie1.conclusion,
            date:(echographie1.date>0) ?new Date(echographie1.date * 1000)
            .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            ddr:  echographie1.ddr,
            epf:  echographie1.epf,
            id:  echographie1.id,
            la: echographie1.la,
            lcc:  echographie1.lcc,
            medecin : echographie1.medecin,
            morphologie:  echographie1.morphologie,
            nombreEmbryon: echographie1.nombreEmbryon,
            placenta: echographie1.placenta,
            precisionSuivi:  echographie1.precisionSuivi,
            presentation:  echographie1.presentation,
            suiviCsSF: suiviCsSF,
            t:  echographie1.t,
            terme:  echographie1.terme,
            type: echographie1.type,
            voieAccouchement: echographie1.voieAccouchement
          });
           

          break;
              case this.echographie_1:
                this.loadingEchographie1 =true
                this.addOrUpdateEchographie1.disable();
                this.addOrUpdateEchographie1.setValue( {
                  bip_ca_lf_opn: echographie1.bip_ca_lf_opn,
                  cn:  echographie1.cn,
                  col: echographie1.col,
                  conclusion:  echographie1.conclusion,
                  date:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  ddr:  echographie1.ddr,
                  epf:  echographie1.epf,
                  id:  echographie1.id,
                  la: echographie1.la,
                  lcc:  echographie1.lcc,
                  medecin : echographie1.medecin,
                  morphologie:  echographie1.morphologie,
                  nombreEmbryon: echographie1.nombreEmbryon,
                  placenta: echographie1.placenta,
                  precisionSuivi:  echographie1.precisionSuivi,
                  presentation:  echographie1.presentation,
                  suiviCsSF: suiviCsSF,
                  t:  echographie1.t,
                  terme:  echographie1.terme,
                  type: echographie1.type,
                  voieAccouchement: echographie1.voieAccouchement
                });
                 
      
                break;
              case this.echographie_2:
                this.loadingEchographie2 =true
                this.addOrUpdateEchographie2.disable();
                this.addOrUpdateEchographie2.setValue( {
                  bip_ca_lf_opn: echographie1.bip_ca_lf_opn,
                  cn:  echographie1.cn,
                  col: echographie1.col,
                  conclusion:  echographie1.conclusion,
                  date:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  ddr:  echographie1.ddr,
                  epf:  echographie1.epf,
                  id:  echographie1.id,
                  la: echographie1.la,
                  lcc:  echographie1.lcc,
                  medecin : echographie1.medecin,
                  morphologie:  echographie1.morphologie,
                  nombreEmbryon: echographie1.nombreEmbryon,
                  placenta: echographie1.placenta,
                  precisionSuivi:  echographie1.precisionSuivi,
                  presentation:  echographie1.presentation,
                  suiviCsSF: suiviCsSF,
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
                  bip_ca_lf_opn: echographie1.bip_ca_lf_opn,
                  cn:  echographie1.cn,
                  col: echographie1.col,
                  conclusion:  echographie1.conclusion,
                  date:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  ddr:  echographie1.ddr,
                  epf:  echographie1.epf,
                  id:  echographie1.id,
                  la: echographie1.la,
                  lcc:  echographie1.lcc,
                  medecin : echographie1.medecin,
                  morphologie:  echographie1.morphologie,
                  nombreEmbryon: echographie1.nombreEmbryon,
                  placenta: echographie1.placenta,
                  precisionSuivi:  echographie1.precisionSuivi,
                  presentation:  echographie1.presentation,
                  suiviCsSF: suiviCsSF,
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
                  bip_ca_lf_opn: echographie1.bip_ca_lf_opn,
                  cn:  echographie1.cn,
                  col: echographie1.col,
                  conclusion:  echographie1.conclusion,
                  date:(echographie1.date>0) ?new Date(echographie1.date * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  ddr:  echographie1.ddr,
                  epf:  echographie1.epf,
                  id:  echographie1.id,
                  la: echographie1.la,
                  lcc:  echographie1.lcc,
                  medecin : echographie1.medecin,
                  morphologie:  echographie1.morphologie,
                  nombreEmbryon: echographie1.nombreEmbryon,
                  placenta: echographie1.placenta,
                  precisionSuivi:  echographie1.precisionSuivi,
                  presentation:  echographie1.presentation,
                  suiviCsSF: suiviCsSF,
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
    this.patientService.getAllConsultationsByIdPatientAndIdDossierPrenatal(this.getPatientId(),this.dossier.id)
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
                  date: (consultation.date>0) ?new Date(consultation.date * 1000)
                  .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
                  echoDebutGrossesse: (consultation.echoDebutGrossesse  == true)? 'oui' : 'non',
                  etatGeneral: consultation.etatGeneral,
                  examenAbdomen: consultation.examenAbdomen,
                  examenBassin:consultation.examenBassin,
                  examenBiologique: consultation.examenBiologique,
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
                      .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),                      resulatEchographie1: consultation.resulatEchographie1,
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
    this.dossierId=this.dossier.id.toString();
    const detailsAntecedentConjoint = this.patientService.findGeneric(this.getPatientId(), this.dossierId, 4);
    const detailsAntecedentFamiliaux = this.patientService.findGeneric(this.getPatientId(), this.dossierId, 5);
    const detailsAntecedentsMedicauxMere = this.patientService.findGeneric(this.getPatientId(),this.dossierId,6);
    const detailsAntecedentsChirurgicauxMere = this.patientService.findGeneric(this.getPatientId(),this.dossierId,7);
    const detailsAntecedentsGyneco = this.patientService.findGeneric(this.getPatientId(),this.dossierId,8);
    const detailsAntecedentsObstetricaux = this.patientService.findGeneric(this.getPatientId(),this.dossierId,9);
  

forkJoin([detailsAntecedentFamiliaux, detailsAntecedentConjoint,detailsAntecedentsMedicauxMere,detailsAntecedentsChirurgicauxMere,detailsAntecedentsGyneco,detailsAntecedentsObstetricaux]).subscribe(responses => {



      if (responses[0]['code'] == 200) {
        let data = Object.assign(new antecedentFamiliaux(), responses[0]["result"][0]);
        this.populateFormAntecedentFamiliaux(this.addOrUpdateAntecedentFamiliauxForm, data);
      }
      if (responses[1]['code'] == 200) {
        let data = Object.assign(new antecedentConjoint(), responses[1]["result"][0]);
        this.addOrUpdateAntecedentConjointForm.patchValue({
          age: data.age>0?data.age:this.dossier.ageConjoint,
          dossierPrenatalId: data.dossierPrenatalId,
          groupeSanguin: data.groupeSanguin!=null?data.groupeSanguin:this.dossier.groupSanguin,
          id: data.id,
          nationalite: data.nationalite>0?data.nationalite:this.dossier.nationaliteConjoint,
          nombreEpouses: data.nombreEpouses>0?data.nombreEpouses:this.dossier.nombreEpousesConjoint,
          pathologie: data.pathologie,
          patientId: data.patientId,
          poids: data.poids,
          profession: data.profession!=null?data.profession:this.dossier.professionConjoint,
          rhesus: this.dossier.rhesus,
          taille: data.taille
        });
      }

      if (responses[2]['code'] == 200){
        let data = Object.assign(new antecedentMedicauxMere(), responses[2]["result"][0]);

        this.allergies =data.maladies?.includes(Maladies.allergies)==true;
        this.hyperTension =data.maladies?.includes(Maladies.hyperTension)==true;
        this.cardiopathie =data.maladies?.includes(Maladies.cardiopathie)==true;
        this.insuffisanceRenale =data.maladies?.includes(Maladies.insuffisanceRenale)==true;
        this.asthme =data.maladies?.includes(Maladies.asthme)==true;
        this.tuberculose =data.maladies?.includes(Maladies.tuberculose)==true;
        this.hepatite =data.maladies?.includes(Maladies.hepatite)==true;
        this.diabete =data.maladies?.includes(Maladies.diabete)==true;
        this.drepanocytose =data.maladies?.includes(Maladies.drepanocytose)==true;
        this.arv =data.maladies?.includes(Maladies.arv)==true;
        this.anemie =data.maladies?.includes(Maladies.anemie)==true;
        this.autres =data.maladies?.includes(Maladies.autres)==true;

        this.addOrUpdateAntecedentMedMereForm.patchValue({
          autres: data.autres,
          allergies: data.allergies,
          id: data.id,
          imc: data.imc,
          maladies: data.maladies,
          poids: data.poids,
          tabac: data.tabac,
          taille: data.taille,
          toxicomanie: data.toxicomanie
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
        this.autreGyneco =(data.gynecoAutres!="")?true:false;
        this.infertilite =data.maladies?.includes(Maladies.infertilite)==true;
        this.contraception =data.maladies?.includes(Maladies.contraception)==true;
        this.populateAntecedentGynecologique(data);
      }

      if (responses[5]['code'] == 200) {
        this.lstObstetricaux =responses[5]["result"];

      }

    }, err => {
      alert(err);
    });
  }

  seeObstetricals(id){
    let patientId =this.getPatientId();;
    let dossierId = this.dossier.id;
    this.patientService.findGeneric(this.patientId,this.dossierId,9).subscribe(responses => {
      if (responses["code"]==200){
        this.populateFormAntecedentObstetricaux(this.addOrUpdateAntecedentObstetricals,responses["result"][0]);
      }
    });
    $("#formObstetrical").modal('show');
  }
  private populateAntecedentGynecologique(data: any) {
    this.addOrUpdateAntecedentGynecologique.patchValue({
      gynecoAutres: data.gynecoAutres,
      gynecoPrecision: "",
      id: data.id,
      maladies: data.maladies
    });
  }

  GrossesseLoad(){
     this.addOrUpdateGrossesseForm.disable();
     this.disabled ="disabled";

    this.patientService.findGrossesse(this.getPatientId(), this.dossier.id).subscribe(responses => {
         if (responses['code'] == 200) {
          let data = Object.assign(new Grossesse(), responses["result"][0]);
          
          let datTp =new Date(data.dateDerniereRegle * 1000);
          let dateTp =(data.dateDerniereRegle>0)?datTp.setDate(datTp.getDate()+280): new Date().setDate(new Date().getDate()+280);
          let dpFInal =new Date(dateTp).toISOString().substring(0, 10);
          console.log(" dpFInal :"+dpFInal)
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
            g:this.dossier.g,
            p: this.dossier.p,
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
    let dossierId =  this.dossier.id;

    this.rMessage="";

    if (f.invalid){
      return;
    }

    if (f.value.id!=null){
      let Id =f.value.id;
      this.patientService.updateForm(patientId,dossierId,Id,f.getRawValue(),typeId).subscribe((data) => {
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
      this.patientService.createForm(patientId,dossierId,f.getRawValue(),typeId).subscribe((data) => {
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

  private populateFormAntecedentObstetricaux(f: FormGroup, data: any){
    f.patchValue({
      accouchement: data.accouchement,
      allaitement: data.allaitement,
      annee: data.annee,
      deroulementGrossesse: data.deroulementGrossesse,
      evolution: data.evolution,
      id: data.id,
      issue: data.issue,
      poidsNne: data.poidsNne,
      sexeNne: data.sexeNne,
      terme: data.terme
    });
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
  let dataTab = [
    {
      labelle: 'groupe sanguin',
      resultat:(this.addOrUpdateBilan.value.gp !=null) ? this.addOrUpdateBilan.value.gp : this.dossier?.groupSanguin,
      date: new Date(this.addOrUpdateBilan.value.gpdate).getTime() / 1000
    },
    {
      labelle: 'Rhésus',
      resultat:(this.addOrUpdateBilan.value.rh !=null) ? this.addOrUpdateBilan.value.rh : this.dossier?.rhesus,
      date: new Date(this.addOrUpdateBilan.value.rhdate).getTime() / 1000
     },
    { 
      labelle: 'RAI(si rhésus négatif)',
      resultat:this.addOrUpdateBilan.value.ra,
      date: new Date(this.addOrUpdateBilan.value.radate).getTime() / 1000 
    },
    {  
      labelle: 'si RAI+titration',
      resultat:this.addOrUpdateBilan.value.sra,
      date: new Date(this.addOrUpdateBilan.value.sradate).getTime() / 1000
     },
    { 
       labelle: 'TOXO',
       resultat:this.addOrUpdateBilan.value.to,
      date: new Date(this.addOrUpdateBilan.value.todate).getTime() / 1000
       },
    {  
      labelle: 'ToIgM' ,
      resultat:this.addOrUpdateBilan.value.toigm,
      date: new Date(this.addOrUpdateBilan.value.toigmdate).getTime() / 1000
    },
    { 
       labelle: 'ToIgG' ,
       resultat:this.addOrUpdateBilan.value.toigg,
      date: new Date(this.addOrUpdateBilan.value.toiggdate).getTime() / 1000
      },
    {  
      labelle: 'RUBEOLE',
      resultat:this.addOrUpdateBilan.value.ru,
      date: new Date(this.addOrUpdateBilan.value.rudate).getTime() / 1000
     },
     {  
      labelle: 'IgM' ,
      resultat:this.addOrUpdateBilan.value.ruigm,
      date: new Date(this.addOrUpdateBilan.value.ruigmdate).getTime() / 1000
    },
    { 
       labelle: 'IgG' ,
       resultat:this.addOrUpdateBilan.value.ruigg,
      date: new Date(this.addOrUpdateBilan.value.ruiggdate).getTime() / 1000
      },
    { 
       labelle: 'TPHA/VDRL' ,
       resultat:this.addOrUpdateBilan.value.tv,
      date: new Date(this.addOrUpdateBilan.value.tvdate).getTime() / 1000
      },
    { 
      labelle: 'TPHA',
      resultat:this.addOrUpdateBilan.value.tp,
      date: new Date(this.addOrUpdateBilan.value.tpdate).getTime() / 1000
     },
    {  
      labelle: 'VDRL' ,
      resultat:this.addOrUpdateBilan.value.vd,
      date: new Date(this.addOrUpdateBilan.value.vddate).getTime() / 1000
    },
    { 
      labelle: 'HIV',
      resultat:this.addOrUpdateBilan.value.hi,
      date: new Date(this.addOrUpdateBilan.value.hidate).getTime() / 1000
     },
    { 
      labelle: 'Hépatite C (Ac HCV)' ,
      resultat:this.addOrUpdateBilan.value.hc,
      date: new Date(this.addOrUpdateBilan.value.hcdate).getTime() / 1000
    },
    { 
      labelle: 'Hépatite B (Ag HbS)',
      resultat:this.addOrUpdateBilan.value.hb,
      date: new Date(this.addOrUpdateBilan.value.hbdate).getTime() / 1000
    
     },
    { 
      labelle: 'Test Emmel',
      resultat:this.addOrUpdateBilan.value.te,
      date: new Date(this.addOrUpdateBilan.value.tedate).getTime() / 1000
     },
    {  
      labelle: 'Electrophorèse Hg',
      resultat:this.addOrUpdateBilan.value.el,
      date: new Date(this.addOrUpdateBilan.value.eldate).getTime() / 1000
     },
    { 
      labelle: 'HbA',
      resultat:this.addOrUpdateBilan.value.hba,
      date: new Date(this.addOrUpdateBilan.value.hbadate).getTime() / 1000
     },
    { 
       labelle: 'HbF',
       resultat:this.addOrUpdateBilan.value.hbf,
      date: new Date(this.addOrUpdateBilan.value.hbfdate).getTime() / 1000
       },
    { 
      labelle: 'HbB' ,
      resultat:this.addOrUpdateBilan.value.hbb,
      date: new Date(this.addOrUpdateBilan.value.hbbdate).getTime() / 1000
    },
    { 
      labelle: 'NFS',
      resultat:this.addOrUpdateBilan.value.nfs,
      date: new Date(this.addOrUpdateBilan.value.nfsdate).getTime() / 1000
     },
    { 
      labelle: 'HB',
      resultat:this.addOrUpdateBilan.value.HB,
      date: new Date(this.addOrUpdateBilan.value.HBdate).getTime() / 1000
     },
    { 
      labelle: 'plaquettes',
      resultat:this.addOrUpdateBilan.value.pl,
      date: new Date(this.addOrUpdateBilan.value.pldate).getTime() / 1000
     },
    { 
       labelle: 'TP/TCA/Fibrinogène',
       resultat:this.addOrUpdateBilan.value.tpTcaFi,
      date: new Date(this.addOrUpdateBilan.value.tpTcaFidate).getTime() / 1000
       },
    {  
      labelle: 'Glycémie à jeun' ,
      resultat:this.addOrUpdateBilan.value.gly,
      date: new Date(this.addOrUpdateBilan.value.glydate).getTime() / 1000
    },
    {  
      labelle: 'dépistage Diabète gestionnel',
      resultat:this.addOrUpdateBilan.value.ddg,
      date: new Date(this.addOrUpdateBilan.value.ddgdate).getTime() / 1000
     },
    { 
      labelle: 'osulivan',
      resultat:this.addOrUpdateBilan.value.osuli,
      date: new Date(this.addOrUpdateBilan.value.osulidate).getTime() / 1000
     },
    { 
      labelle: 'T1',
      resultat:this.addOrUpdateBilan.value.t1,
      date: new Date(this.addOrUpdateBilan.value.t1date).getTime() / 1000
     },
    {  
      labelle: 'T2' ,
      resultat:this.addOrUpdateBilan.value.t2,
      date: new Date(this.addOrUpdateBilan.value.t2date).getTime() / 1000
    },
    {  
      labelle: 'hbs' ,
      resultat:this.addOrUpdateBilan.value.hbs
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
      
        this.patientService.createBilan(this.getPatientId(),this.dossier.id,bilan).subscribe((data) => {
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
      
       this.patientService.updateBilan(this.getPatientId(),this.dossier.id, this.idBilan,bilan).subscribe((data) => {
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
 
    let dateConvertis =new Date(this.createTpi.value.date).getTime() / 1000;
    this.createTpi.patchValue({
     date:dateConvertis
       });
   console.log(" DATA Rhophylac BEFORE CREATE :"+JSON.stringify(this.createTpi.value))

    this.patientService.createTpi(patientId,dossierId,this.createTpi.value).subscribe((data) => {
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
    let dossierId = this.dossier.id;

   //recuperation pour creer tetanos
   let dateConvertis =new Date(this.updateTpi.value.date).getTime() / 1000;
    this.updateTpi.patchValue({
     date:dateConvertis
       }); 
   console.log("updateTpi : "+JSON.stringify(this.updateTpi.value))

  this.patientService.updateTpi(patientId,dossierId,this.myTpiIdTempo,this.updateTpi.value).subscribe((data) => {
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
this.patientService.deleteTpi(this.getPatientId(),this.dossier.id,i).subscribe(
  data =>{
    if(data.code==200){
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
  let dossierId = this.dossier.id;
 
    let dateConvertis =new Date(this.createRhophylac.value.date).getTime() / 1000;
    this.createRhophylac.patchValue({
     date:dateConvertis
   });
   console.log(" DATA Rhophylac BEFORE CREATE :"+JSON.stringify(this.createRhophylac.value))

    this.patientService.createRhophylac(patientId,dossierId,this.createRhophylac.value).subscribe((data) => {
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
    let dossierId = this.dossier.id;
   //recuperation pour creer tetanos
   let dateConvertis =new Date(this.updateRhophylac.value.date).getTime() / 1000;
    this.updateRhophylac.patchValue({
     date:dateConvertis
   });
     this.patientService.updateRhophylac(patientId,dossierId,this.myRhophylacIdTempo,this.updateRhophylac.value).subscribe((data) => {
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
  this.patientService.deleteRhophylac(this.getPatientId(),this.dossier.id,i).subscribe(
    data =>{
      if(data.code==200){
        this.VaccinationLoad()
      }
    }
  )
   }

//FIN Rhophylac



// PARTIE Tetano 
onSubmitTetanos(){
  if( this.myLinesTempo.length <3){
if((this.createTetanos.value.lot == null)
&&(this.createTetanos.value.vat == null)
&&(this.createTetanos.value.date == null)){
 this.submittedTetanos=false
 this.rMessage = "bErrorSaisiTetanos";
}else{
  this.submittedTetanos=true
  this.loading=true
  let patientId =this.getPatientId();;
  let dossierId = this.dossier.id;
 
    let dateConvertis =new Date(this.createTetanos.value.date).getTime() / 1000;
    this.createTetanos.patchValue({
     date:dateConvertis
   });
   console.log("TETANOS DATA BEFROE CREATE :"+JSON.stringify(this.createTetanos.value))

    this.patientService.createTetanos(patientId,dossierId,this.createTetanos.value).subscribe((data) => {
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
  this.patientService.getAllTetanos(this.getPatientId(),this.dossier.id)
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
  let dossierId = this.dossier.id;
 //recuperation pour creer tetanos
 let dateConvertis =new Date(this.updateTetanos.value.date).getTime() / 1000;
  this.updateTetanos.patchValue({
   date:dateConvertis
 });
 // recuperation temporaire
const lineTempo =this.updateTetanos.value 
this.myLines[this.tetanosIndex]=lineTempo,
console.log("listes apres : "+JSON.stringify(this.myLines))

this.patientService.updateTetanos(patientId,dossierId,this.myTetanosIdTempo,this.updateTetanos.value).subscribe((data) => {
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
  this.patientService.deleteTetanos(this.getPatientId(),this.dossier.id,i).subscribe(
    data =>{
      if(data.code==200){
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
  let suiviCsSF=this.addOrUpdateEchographieAutre.value.suiviCsSF;
  let ddr=new Date(this.addOrUpdateEchographieAutre.value.ddr).getTime() / 1000;
  if(suiviCsSF == 'Oui'){
    this.addOrUpdateEchographieAutre.patchValue({
      date:dateConvertis,
      ddr:ddr,
      type:this.echographie_autre,
      suiviCsSF: true
    });
  }else if(suiviCsSF == 'Non') {
    this.addOrUpdateEchographie1.patchValue({
      date:dateConvertis,
      type:this.echographie_autre,
      suiviCsSF: false
    });
  }
 this.rMessage="";

 if (this.addOrUpdateEchographieAutre.invalid) {
   return;
 }else {

    if(!this.loadingEchographieAutre){
     
       this.patientService.createEchographie(this.addOrUpdateEchographieAutre.value,this.getPatientId(),this.dossier.id).subscribe((data) => {
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
     
      this.patientService.updateEchographie(this.addOrUpdateEchographieAutre.value,this.getPatientId(),this.dossier.id,this.addOrUpdateEchographieAutre.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateEchographieAutre";
          this.updateEchographieAutre =false;
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
   let dateConvertis =new Date(this.addOrUpdateEchographie.value.date).getTime() / 1000;
   let suiviCsSF=this.addOrUpdateEchographie.value.suiviCsSF;
   if(suiviCsSF == 'Oui'){
     this.addOrUpdateEchographie2.patchValue({
       date:dateConvertis,
       type:this.echographie,
       suiviCsSF: true
     });
   }else  {
     this.addOrUpdateEchographie.patchValue({
       date:dateConvertis,
       type:this.echographie,
       suiviCsSF: false
     });
   }
  
    
  this.rMessage="";
 
  if (this.addOrUpdateEchographie.invalid) {
    return;
  }else {
 
     if(!this.loadingEchographie){
      
        this.patientService.createEchographie(this.addOrUpdateEchographie.value,this.getPatientId(),this.dossier.id).subscribe((data) => {
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
      
       this.patientService.updateEchographie(this.addOrUpdateEchographie.value,this.getPatientId(),this.dossier.id,this.addOrUpdateEchographie.value.id).subscribe((data) => {
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
  let suiviCsSF=this.addOrUpdateEchographie1.value.suiviCsSF;
  let ddr=new Date(this.addOrUpdateEchographie1.value.ddr).getTime() / 1000;
  if(suiviCsSF == 'Oui'){
    this.addOrUpdateEchographie1.patchValue({
      date:dateConvertis,
      ddr:ddr,
      terme:this.inputValueTerme,
      type:this.echographie_1,
      suiviCsSF: true
    });
  }else if(suiviCsSF == 'Non') {
    this.addOrUpdateEchographie1.patchValue({
      date:dateConvertis,
      terme:this.inputValueTerme,
      type:this.echographie_1,
      suiviCsSF: false
    });
  }
 this.rMessage="";

 if (this.addOrUpdateEchographie1.invalid) {
   return;
 }else {

    if(!this.loadingEchographie1){
     
       this.patientService.createEchographie(this.addOrUpdateEchographie1.value,this.getPatientId(),this.dossier.id).subscribe((data) => {
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
     
      this.patientService.updateEchographie(this.addOrUpdateEchographie1.value,this.getPatientId(),this.dossier.id,this.addOrUpdateEchographie1.value.id).subscribe((data) => {
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
  let dateConvertis =new Date(this.addOrUpdateEchographie2.value.date).getTime() / 1000;
  let suiviCsSF=this.addOrUpdateEchographie2.value.suiviCsSF;
  if(suiviCsSF == 'Oui'){
    this.addOrUpdateEchographie2.patchValue({
      date:dateConvertis,
      type:this.echographie_2,
      suiviCsSF: true
    });
  }else if(suiviCsSF == 'Non') {
    this.addOrUpdateEchographie2.patchValue({
      date:dateConvertis,
      type:this.echographie_2,
      suiviCsSF: false
    });
  }
 
   
 this.rMessage="";

 if (this.addOrUpdateEchographie2.invalid) {
   return;
 }else {

    if(!this.loadingEchographie2){
     
       this.patientService.createEchographie(this.addOrUpdateEchographie2.value,this.getPatientId(),this.dossier.id).subscribe((data) => {
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
     
      this.patientService.updateEchographie(this.addOrUpdateEchographie2.value,this.getPatientId(),this.dossier.id,this.addOrUpdateEchographie2.value.id).subscribe((data) => {
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
  let dateConvertis =new Date(this.addOrUpdateEchographie3.value.date).getTime() / 1000;
  let suiviCsSF:Boolean;
  if(this.addOrUpdateEchographie3.value.suiviCsSF == 'Oui'){
      suiviCsSF: true
  }else if(this.addOrUpdateEchographie3.value.suiviCsSF == 'Non') {
      suiviCsSF: false
    }

    this.addOrUpdateEchographie3.patchValue({
      date:dateConvertis,
      type:this.echographie_3,
      suiviCsSF:suiviCsSF
    });
 
 this.rMessage="";

 if (this.addOrUpdateEchographie3.invalid) {
   return;
 }else {

    if(!this.loadingEchographie3){
       this.patientService.createEchographie(this.addOrUpdateEchographie3.value,this.getPatientId(),this.dossier.id).subscribe((data) => {
         if (data.code === 201) {
           this.submitted = false;
           this.rMessage = "bSaveEchographie3";
           this.echographieLoad();
         } else {
           this.rMessage = "bErrorAddOrUpdateEchographie3";
  
        }
       });
    }else {
     
      this.patientService.updateEchographie(this.addOrUpdateEchographie3.value,this.getPatientId(),this.dossier.id,this.addOrUpdateEchographie3.value.id).subscribe((data) => {
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
       this.patientService.createConsultation(this.addOrUpdateStaff.value,this.getPatientId(),this.dossier.id).subscribe((data) => {
         if (data.code === 201) {
           this.submitted = false;
           this.rMessage = "bSaveStaff";
           this.ConsultationLoad();

         } else {
           this.rMessage = "bErrorAddOrUpdateStaff";
  
        }
       });
    }else {

      this.patientService.updateConsultation(this.addOrUpdateStaff.value,this.getPatientId(),this.dossier.id,this.addOrUpdateStaff.value.id).subscribe((data) => {
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
       this.patientService.createConsultation(this.addOrUpdateConsultation1.value,this.getPatientId(),this.dossier.id).subscribe((data) => {
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
     
      this.patientService.updateConsultation(this.addOrUpdateConsultation1.value,this.getPatientId(),this.dossier.id,this.addOrUpdateConsultation1.value.id).subscribe((data) => {
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
       this.patientService.createConsultation(this.addOrUpdateConsultation2.value,this.getPatientId(),this.dossier.id).subscribe((data) => {
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
      this.patientService.updateConsultation(this.addOrUpdateConsultation2.value,this.getPatientId(),this.dossier.id,this.addOrUpdateConsultation2.value.id).subscribe((data) => {
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
       this.patientService.createConsultation(this.addOrUpdateConsultation3.value,this.getPatientId(),this.dossier.id).subscribe((data) => {
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
      this.patientService.updateConsultation(this.addOrUpdateConsultation3.value,this.getPatientId(),this.dossier.id,this.addOrUpdateConsultation3.value.id).subscribe((data) => {
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
  let rdvTerme  =new Date(this.addOrUpdateConsultation3.value.rdvTerme).getTime() / 1000;
  let dateConvertis =new Date(this.addOrUpdateConsultation3.value.date).getTime() / 1000;
  let prochEcho = new Date(this.addOrUpdateConsultation3.value.prochEcho).getTime() / 1000;
  
  let prochRDV= new Date(this.addOrUpdateConsultation3.value.prochRDV).getTime() / 1000;
 

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
       this.patientService.createConsultation(this.addOrUpdateConsultation4.value,this.getPatientId(),this.dossier.id).subscribe((data) => {
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
      this.patientService.updateConsultation(this.addOrUpdateConsultation4.value,this.getPatientId(),this.dossier.id,this.addOrUpdateConsultation4.value.id).subscribe((data) => {
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

  let rdvTerme  =new Date(this.addOrUpdateConsultation3.value.rdvTerme).getTime() / 1000;
  let dateConvertis =new Date(this.addOrUpdateConsultation3.value.date).getTime() / 1000;
  let prochEcho = new Date(this.addOrUpdateConsultation3.value.prochEcho).getTime() / 1000;
  
  let prochRDV= new Date(this.addOrUpdateConsultation3.value.prochRDV).getTime() / 1000;
 
  let staffDate =new Date(this.addOrUpdateConsultation4.value.staffDate).getTime() / 1000;

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
       this.patientService.createConsultation(this.addOrUpdateConsultation5.value,this.getPatientId(),this.dossier.id).subscribe((data) => {
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

      this.patientService.updateConsultation(this.addOrUpdateConsultation5.value,this.getPatientId(),this.dossier.id,this.addOrUpdateConsultation5.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateConsultation5";
          console.log("CONSULTATION DATA UPDATE :"+JSON.stringify(this.addOrUpdateConsultation5.value))
          console.log("CONSULTATION DATA UPDATE after :"+JSON.stringify(data))

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
  let rdvTerme  =new Date(this.addOrUpdateConsultation3.value.rdvTerme).getTime() / 1000;
  let dateConvertis =new Date(this.addOrUpdateConsultation3.value.date).getTime() / 1000;
  let prochEcho = new Date(this.addOrUpdateConsultation3.value.prochEcho).getTime() / 1000;
  
  let prochRDV= new Date(this.addOrUpdateConsultation3.value.prochRDV).getTime() / 1000;
 
  let staffDate =new Date(this.addOrUpdateConsultation3.value.staffDate).getTime() / 1000;
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
       this.patientService.createConsultation(this.addOrUpdateConsultation6.value,this.getPatientId(),this.dossier.id).subscribe((data) => {
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

      this.patientService.updateConsultation(this.addOrUpdateConsultation6.value,this.getPatientId(),this.dossier.id,this.addOrUpdateConsultation6.value.id).subscribe((data) => {
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

  let rdvTerme  =new Date(this.addOrUpdateConsultation3.value.rdvTerme).getTime() / 1000;
  let dateConvertis =new Date(this.addOrUpdateConsultation3.value.date).getTime() / 1000;
  let prochEcho = new Date(this.addOrUpdateConsultation3.value.prochEcho).getTime() / 1000;
  
  let prochRDV= new Date(this.addOrUpdateConsultation3.value.prochRDV).getTime() / 1000;
 
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
       this.patientService.createConsultation(this.addOrUpdateConsultation7.value,this.getPatientId(),this.dossier.id).subscribe((data) => {
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

      this.patientService.updateConsultation(this.addOrUpdateConsultation7.value,this.getPatientId(),this.dossier.id,this.addOrUpdateConsultation7.value.id).subscribe((data) => {
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
       this.patientService.createConsultation(this.addOrUpdateConsultation8.value,this.getPatientId(),this.dossier.id).subscribe((data) => {
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

      this.patientService.updateConsultation(this.addOrUpdateConsultation8.value,this.getPatientId(),this.dossier.id,this.addOrUpdateConsultation8.value.id).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdateConsultation8";
          console.log("CONSULTATION DATA UPDATE :"+JSON.stringify(this.addOrUpdateConsultation8.value))
          console.log("CONSULTATION DATA UPDATE after :"+JSON.stringify(data))

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
    let dossierId = this.dossier.id;

    this.rMessage="";

    if (this.addOrUpdateAntecedentObstetricals.invalid) {
      return;
    }

    if (this.addOrUpdateAntecedentObstetricals.value.id!=null){
      let grossesseId =this.addOrUpdateAntecedentObstetricals.value.id;
      this.patientService.updateForm(patientId,this.dossier.id,grossesseId,this.addOrUpdateAntecedentObstetricals.getRawValue(),9).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = " bUpdateAntecedentMereChirurgie";
          this.loadObstetricalsData(patientId, dossierId);
          this.AntecedentLoad();
          this.populateFormAntecedentObstetricaux(this.addOrUpdateAntecedentObstetricals,data.result);
        } else {
          this.rMessage = "bErrorAntecedentMereChirurgie";
        }
      });
    }
    else{
      this.patientService.createForm(patientId,dossierId,this.addOrUpdateAntecedentObstetricals.getRawValue(),9).subscribe((data) => {
        if (data.code === 201) {
          this.submitted = false;
          this.rMessage = "bSaveAntecedentObstetricaux";
          $("#formObstetrical").modal('hide');
          this.loadObstetricalsData(patientId, dossierId);
          this.AntecedentLoad();
        } else {
          this.rMessage = "bErrorAntecedentObstetricaux";
        }
      });

    }
    
   
    //this.addOrUpdateAntecedentObstetricals.disable();
  }

  private loadObstetricalsData(patientId: number, dossierId: number) {
    this.patientService.findGeneric(patientId, dossierId, 9).subscribe((data) => {
      if (data.code == 200) {
        this.lstObstetricaux = data.result;
      }
    });
  }

  onSubmitAntecedentGynecologique(){
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
      this.patientService.updateForm(patientId,this.dossier.id,grossesseId,this.addOrUpdateAntecedentGynecologique.getRawValue(),8).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = " bUpdateAntecedentGynécologiques";
          this.AntecedentLoad();
        } else {
          this.rMessage = "bErrorAntecedentGynécologiques";
        }
      });
    }
    else{
      this.patientService.createForm(patientId,dossierId,this.addOrUpdateAntecedentGynecologique.getRawValue(),8).subscribe((data) => {
        if (data.code === 201) {
          this.submitted = false;
          this.rMessage = "bSaveAntecedentGynécologiques";
          this.populateAntecedentGynecologique(data.result);
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
    let dossierId = this.dossier.id;
    let aMaladie =this.addOrUpdateAntecedentMereChirurgicauxForm.value.maladies ;

    this.rMessage="";

    this.addOrUpdateAntecedentMereChirurgicauxForm.patchValue({
      patientId:patientId
    });

    if (this.addOrUpdateAntecedentMereChirurgicauxForm.invalid) {
      return;
    }

    if (this.addOrUpdateAntecedentMereChirurgicauxForm.value.id!=null){
      let grossesseId =this.addOrUpdateAntecedentMereChirurgicauxForm.value.id;
      this.patientService.updateForm(patientId,this.dossier.id,grossesseId,this.addOrUpdateAntecedentMereChirurgicauxForm.getRawValue(),7).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = " bUpdateAntecedentMereChirurgie";
          this.AntecedentLoad();

        } else {
          this.rMessage = "bErrorAntecedentMereChirurgie";
        }
      });
    }
    else{
      this.patientService.createForm(patientId,dossierId,this.addOrUpdateAntecedentMereChirurgicauxForm.getRawValue(),7).subscribe((data) => {
        if (data.code === 201) {
          this.submitted = false;
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

  onSubmitAntecedentMedicauxMere(){
    let aMaladie =this.addOrUpdateAntecedentMedMereForm.value.maladies ;
    let patientId =this.getPatientId();
    let dossierId = this.dossier.id;
    this.rMessage="";

    if (this.addOrUpdateAntecedentMedMereForm.invalid) {
      return;
    }


    if (this.addOrUpdateAntecedentMedMereForm.value.allergies!="")
    {
      let indexValue=aMaladie.indexOf("Allergies");
      if (indexValue!=-1)
        aMaladie[indexValue]=this.addOrUpdateAntecedentMedMereForm.value.allergies

    }

    if (this.addOrUpdateAntecedentMedMereForm.value.autres!="")
    {
      let indexValue=aMaladie.indexOf("Autres");
      if (indexValue!=-1)
        aMaladie[indexValue]=this.addOrUpdateAntecedentMedMereForm.value.autres
    }


    
    if (this.addOrUpdateAntecedentMedMereForm.value.id!=null){
      let grossesseId =this.addOrUpdateAntecedentMedMereForm.value.id;
      this.patientService.updateForm(patientId,this.dossier.id,grossesseId,this.addOrUpdateAntecedentMedMereForm.getRawValue(),6).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = " bUpdateAntecedentMedicauxMere";
          this.AntecedentLoad();
        } else {
          this.rMessage = "bErrorAntecedentMedicauxMere";
        }
      });
    }
    else{
      this.addOrUpdateAntecedentMedMereForm.patchValue({
        maladies:aMaladie
      });
      this.patientService.createForm(patientId,this.dossier.id,this.addOrUpdateAntecedentMedMereForm.getRawValue(),6).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bSaveAntecedentMedicauxMere";
          this.loadDataForm(4,this.addOrUpdateAntecedentMedMereForm,data.result);
          this.AntecedentLoad();

        } else {
          this.rMessage = "bErrorAntecedentMedicauxMere";
        }
      });
      this.addOrUpdateAntecedentMedMereForm.disable();
    }
  }

  onSubmitAntecedentFamiliaux()
  {

    let patientId =this.getPatientId();;
    let dossierId = this.dossier.id;

    this.rMessage="";

    this.addOrUpdateAntecedentFamiliauxForm.patchValue({
      patientId:patientId
    });

    if (this.addOrUpdateAntecedentFamiliauxForm.invalid) {
      return;
    }

    if (this.addOrUpdateAntecedentFamiliauxForm.value.id!=null){
      let grossesseId =this.addOrUpdateAntecedentFamiliauxForm.value.id;
      this.patientService.updateForm(patientId,this.dossier.id,grossesseId,this.addOrUpdateAntecedentFamiliauxForm.getRawValue(),5).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = " bUpdateAntecedentFamiliaux";
          this.AntecedentLoad();

        } else {
          this.rMessage = "bErrorAntecedentFamiliaux";
        }
      });
    }
    else{
      this.patientService.createForm(patientId,dossierId,this.addOrUpdateAntecedentFamiliauxForm.getRawValue(),5).subscribe((data) => {
        if (data.code === 201) {
          this.submitted = false;
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
    let patientId =this.getPatientId();;
    let dossierId = this.dossier.id;
    this.rMessage="";

    if (this.addOrUpdateAntecedentConjointForm.invalid) {
      return;
    }

    if (this.addOrUpdateAntecedentConjointForm.value.id!=null){
      let grossesseId =this.addOrUpdateAntecedentConjointForm.value.id;
      this.patientService.updateForm(patientId,this.dossier.id,grossesseId,this.addOrUpdateAntecedentConjointForm.getRawValue(),4).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;

          this.AntecedentLoad();
          this.rMessage = " bUpdateAntecedent";

        } else {
          this.rMessage = "bErrorAntecedent";
        }
      });
    }
    else{
      this.patientService.createForm(patientId,this.dossier.id,this.addOrUpdateAntecedentConjointForm.getRawValue(),4).subscribe((data) => {
        if (data.code === 201) {
          this.submitted = false;
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

    let doctor=Object.assign(new CareGivers(),this.dataCareGiversDetails?.find(x=>x.id===this.addOrUpdateGrossesseForm.value.medecin)); 
    this.rMessage="";
    let dateDerniereRegle=new Date(this.addOrUpdateGrossesseForm.value.dateDerniereRegle).getTime() / 1000;
    let le=new Date(this.addOrUpdateGrossesseForm.value.le).getTime() / 1000;
    let tp=new Date(this.addOrUpdateGrossesseForm.value.tp).getTime() / 1000;
    let datTp =new Date(this.addOrUpdateGrossesseForm.value.dateDerniereRegle);
          let dateTp =(datTp!=null)?datTp.setDate(datTp.getDate()+280): new Date().setDate(new Date().getDate()+280);
          let dpFInal =new Date(dateTp).toISOString().substring(0, 10);
    this.addOrUpdateGrossesseForm.patchValue({
      dateDerniereRegle:dateDerniereRegle,
      le:le,
      tp:dpFInal,
      medecin:doctor.lastName
    });
    console.log("GROSSESSE data :"+JSON.stringify(this.addOrUpdateGrossesseForm.value))

    this.dossier.g=this.addOrUpdateGrossesseForm.value.g;
    this.dossier.p=this.addOrUpdateGrossesseForm.value.p;
    
    if (this.addOrUpdateGrossesseForm.invalid) {
      return;
    }
    if (this.addOrUpdateGrossesseForm.value.id!=null){
      let grossesseId =this.addOrUpdateGrossesseForm.value.id;

      this.patientService.updateGrossesse(this.getPatientId(),this.dossier.id,grossesseId,this.addOrUpdateGrossesseForm.value).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.GrossesseLoad();
          this.rMessage = "bUpdateGrossesse";

        } else {
          this.rMessage = "bErrorGrossesse";
        }
      });
    }
    else{
      this.patientService.createGrossesse(this.getPatientId(),this.dossier.id,this.addOrUpdateGrossesseForm.getRawValue()).subscribe((data) => {
        if (data.code === 201) {
         // this.setFormGrossesse(data, dpFInal);
          this.GrossesseLoad();

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
    if (this.updateFormPrenatal.invalid) {
      return;
    } else{
      this.patientService.updateDossierPrenatal(this.updateFormPrenatal.value.patientId,this.updateFormPrenatal.value.id,this.updateFormPrenatal.value).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.rMessage = "bUpdate";
          this.dossier = Object.assign(new DossierPrenatal(), data.result);
          this.updateFormPrenatal.patchValue({
            age:                   this.dossier.age,
            ageConjoint:           this.dossier.ageConjoint,
            id:                    this.dossier.id,
            nationaliteConjoint:   this.dossier.nationaliteConjoint,
            nombreEpousesConjoint: this.dossier.nombreEpousesConjoint,
            profession:            this.dossier.profession,
            professionConjoint:    this.dossier.professionConjoint,
            situationMatrimoniale: this.dossier.situationMatrimoniale
          });
          this.updateFormPrenatal.disable();
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

  activateForm(id){
    this.click =false;
    this.disabled ="";
    this.submitted =true;
    this.rMessage = "";
    switch(id){
      case 1:
        this.updateFormPrenatal.enable();
        break;
      case 2:
        this.addorUpdateSuiviMedical.enable();
        break;
      case 3:
        this.addOrUpdateGrossesseForm.enable();
        this.addOrUpdateGrossesseForm.controls['tp'].disable();
        break;
      case 4:
        this.addOrUpdateAntecedentConjointForm.enable();
        break;
      case 5:
        this.disabled='';
        this.addOrUpdateAntecedentFamiliauxForm.enable();
        break;
      case 6:
          this.disabled='';
          this.checkbox=false;
          this.addOrUpdateAntecedentMedMereForm.enable();
          break;
      case 7:
        this.disabled='';
        this.addOrUpdateAntecedentMereChirurgicauxForm.enable();
        break;
      case 8:
          this.disabled='';
          this.checkbox=false;
          this.addOrUpdateAntecedentGynecologique.enable();
        break;

        case 9:
          this.disabled='';
          this.addOrUpdateEchographie1.enable();

          break;

          case 10:
            this.disabled='';
            this.addOrUpdateEchographie2.enable();

            break;

          case 11:
            this.disabled='';
            this.addOrUpdateEchographie3.enable();
              break;

          case 12:
            this.disabled='';
            this.addOrUpdateEchographie.enable();
                break;
          case 13:
               this.disabled='';
                this.addOrUpdateBilan.enable();
                break;
         case 14:
                this.disabled='';
                this.addOrUpdateConsultation1.enable();
               // this.addOrUpdateConsultation1.controls['termeSA'].disable();

                break;
         case 15:
                  this.disabled='';
                  this.addOrUpdateConsultation2.enable();
                  break;
        case 16:
                  this.disabled='';
                  this.addOrUpdateConsultation3.enable();
                  break;
        case 17:
                    this.disabled='';
                    this.addOrUpdateConsultation4.enable();
                    break;
        case 18:
                      this.disabled='';
                      this.addOrUpdateConsultation5.enable();
                      break;
        case 19:
                        this.disabled='';
                        this.addOrUpdateConsultation6.enable();
                        break;
         case 20:
                          this.disabled='';
                          this.addOrUpdateConsultation7.enable();
                          break;
         case 21:
                            this.disabled='';
                            this.addOrUpdateConsultation8.enable();
                            break;
                           case 22:
                              this.disabled='';
                              this.addOrUpdateStaff.enable();
                              break;
                              case 23:
                                this.disabled='';
                                this.addOrUpdateEchographieAutre.enable();
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

  openNewObstetrical(){

  }

}


