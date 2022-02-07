import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/_services/patient.service';
import { PrisenchargeService } from 'src/app/_services/prisencharge.service';
import { AssuranceService } from 'src/app/_services/assurance.service';
import { SponsorService } from 'src/app/_services/sponsor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RefdataService } from 'src/app/_services/refdata.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { NgbModal, ModalDismissReasons, NgbAccordion, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { DossierPrenatal } from 'src/app/_models/dossierprenatal';
import { SuiviMedical } from 'src/app/_models/suivimedical';
import { Grossesse } from 'src/app/_models/grossesse';
import { Medecins } from 'src/app/_models/medecins';
import { Constant, Maladies } from 'src/app/_models/Constant';
import { aRefData } from 'src/app/_models/refdata';
import { antecedentFamiliaux, antecedentConjoint, antecedentMedicauxMere, antecedentChirurgieMere, antecedentGynecologique, antecedentObstetricaux } from 'src/app/_models/antecedent';
import { patient } from 'src/app/_models/patient';
declare var $: any;

@Component({
  selector: 'app-prenataldetails',
  templateUrl: './prenataldetails.component.html',
  styleUrls: ['./prenataldetails.component.css']
})
export class PrenataldetailsComponent implements OnInit {
  submitted: boolean;
  patient: boolean;
  loading = false;
  loaddetailprenatal: boolean;
  closeResult: string;
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
  rMessage: string;
  click : boolean = false;
  disabled: string;
  is_edit : boolean = true;
  _isDisabled: boolean;
  AllNationalite: any[] = [];
  AllNationalites: any[];
  lstObstetricaux:any[];

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

  constructor( private patientService: PatientService,
    private prisencharge: PrisenchargeService,
    private assurance: AssuranceService,
    private sponsor: SponsorService,
    private router: Router,
    private refdata: RefdataService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private config: NgSelectConfig,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.checkbox =true;
    this.disabled ="disabled";
    this.submitted = false;
    this.loaddetailprenatal = true;
    this.patient = false;

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

    if (localStorage.getItem("token") == null) {
      localStorage.removeItem("token");
      localStorage.removeItem("X_HI_CODE");
      localStorage.removeItem("currentUser");
      this.router.navigate(["/login"]);
    }
    this.updateFormPrenatal = new FormGroup({
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
    let idPatient=0;
    this.updateFormPrenatal.disable();
    idPatient = this.getPatientId();
    localStorage.setItem('patientId',idPatient.toString());
    const detailsDossierPrenatal =this.patientService.findDossierPrenatal(idPatient);
    const nationalityPromise = this.refdata.get(Constant.constNationality);
    this.patientService.find(idPatient).subscribe(response => {
       if (response["code"]==200){
        this.patientInfos =Object.assign(new patient(), response["result"]);
       }
      
    });
    forkJoin([detailsDossierPrenatal,nationalityPromise]).subscribe(responses => {
      if (responses[0]['code']==200){
          this.dossier = Object.assign(new DossierPrenatal(), responses[0]["result"][0]);
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
      
      this.AllNationalites = Object.assign(new aRefData(), responses[1][0]).refDatas;

      
    });


  }


  AntecedentLoad(){
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
    this.patientService.findGrossesse(this.getPatientId(), this.dossier.id).subscribe(responses => {
         if (responses['code'] == 200) {
          let data = Object.assign(new Grossesse(), responses["result"][0]);
          let datTp =new Date(data.dateDerniereRegle * 1000);
          let dateTp =(data.dateDerniereRegle>0)?datTp.setDate(datTp.getDate()+280): new Date().setDate(new Date().getDate()+280);
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
            dateDerniereRegle:(data.dateDerniereRegle>0)?new Date(data.dateDerniereRegle * 1000)
              .toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),
            g:this.dossier.g,
            p: this.dossier.p,
            tp: dpFInal,
            typeUterus: data.typeUterus
          });
      }
    });



  }


  private reloadTabsData() {
    if (this.dossierId != null && this.patientId != null) {

    }
  }

  private getPatientId() {
    let idPatient=0;
    this.route.params.subscribe((params) => {
      idPatient = params.id;
    });
    return idPatient;
  }

  loadData(){
    this.AllNationalites =this.AllNationalite;
  }
  set isDisabled(value: boolean) {
    // this._isDisabled = value;
    // if(value) {
    //  this.addOrUpdateGrossesseForm.controls['precisionGrossesse'].disable();
    // } else {
    //    this.addOrUpdateGrossesseForm.controls['precisionGrossesse'].enable();
    //  }
   }

  onChange(type)
  {
    // if (type=="Autres"){
    //   this.addOrUpdateGrossesseForm.controls['precisionGrossesse'].enable();
    // }
    // else {
    //   this.addOrUpdateGrossesseForm.controls['precisionGrossesse'].disable();
    // }
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
    let bmi =  (poids / (taille * taille)).toFixed(2);

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

        } else {
          this.rMessage = "bErrorAntecedent";
        }
      });
      this.addOrUpdateAntecedentConjointForm.disable();
    }
  }

  onSubmitGrossesse()
  {
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
      tp:dpFInal
    });
    
    this.dossier.g=this.addOrUpdateGrossesseForm.value.g;
    this.dossier.p=this.addOrUpdateGrossesseForm.value.p;
    
    if (this.addOrUpdateGrossesseForm.invalid) {
      return;
    }
    if (this.addOrUpdateGrossesseForm.value.id!=null){
      let grossesseId =this.addOrUpdateGrossesseForm.value.id;

      this.patientService.updateGrossesse(this.getPatientId(),this.dossier.id,grossesseId,this.addOrUpdateGrossesseForm.getRawValue()).subscribe((data) => {
        if (data.code === 200) {
          this.submitted = false;
          this.setFormGrossesse(data, dpFInal);
          this.rMessage = "bUpdateGrossesse";

        } else {
          this.rMessage = "bErrorGrossesse";
        }
      });
    }
    else{
      this.patientService.createGrossesse(this.getPatientId(),this.dossier.id,this.addOrUpdateGrossesseForm.getRawValue()).subscribe((data) => {
        if (data.code === 201) {
          this.setFormGrossesse(data, dpFInal);
          
          this.submitted = false;
          this.rMessage = "bSaveGrossesse";
          
        } else {
          this.rMessage = "bErrorGrossesse";
        }
      });
    }
    //this.GrossesseLoad();
    this.addOrUpdateGrossesseForm.disable();
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

    if (this.updateFormPrenatal.invalid) {
      return;
    }

    this.patientService.updateDossierPrenatal(this.updateFormPrenatal.value.patientId,this.updateFormPrenatal.value.id,this.updateFormPrenatal.getRawValue()).subscribe((data) => {
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
       // this.addOrUpdateGrossesseForm.controls['precisionGrossesse'].disable();
        break;
      case 4:
        this.disabled='';
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
    }

  }

  openNewObstetrical(){

  }

}
