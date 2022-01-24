import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { SecureComponent } from './secure/secure.component';
import { RegisterComponent } from './public/register/register.component';
import { PublicComponent } from './public/public.component';
import { UsersComponent } from './secure/users/users.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { UserCreateComponent } from './secure/users/user-create/user-create.component';
import { UserEditComponent } from './secure/users/user-edit/user-edit.component';
import { RolesComponent } from './secure/roles/roles.component';
import { RoleCreateComponent } from './secure/roles/role-create/role-create.component';
import { RoleEditComponent } from './secure/roles/role-edit/role-edit.component';
import { PatientComponent } from './secure/patients/patient/patient.component';
import { HonorairesComponent } from './secure/honoraires/honoraires.component';
import { PaiementComponent } from './secure/paiement/paiement.component';
import { HospitalisationComponent } from './secure/hospitalisation/hospitalisation.component';
import { EtatEncaissementComponent } from './secure/etat-encaissement/etat-encaissement.component';
import { EtatbancaireComponent } from './secure/etatbancaire/etatbancaire.component';
import { FacturationsComponent } from './secure/facturations/facturations.component';
import { RelevesFacturesComponent } from './secure/releves-factures/releves-factures.component';
import { StatementDetailComponent } from './secure/releves-factures/statement-detail/statement-detail.component';
import { VersementComponent } from './secure/versement/versement.component';
import { Medecins } from './_models/medecins';
import { MedecinsPartenaireComponent } from './secure/medecins/medecins-partenaire/medecins-partenaire.component';
import { MedecinsPartenaireDetailComponent } from './secure/medecins/medecins-partenaire-detail/medecins-partenaire-detail.component';
import { PatientDetailComponent } from './secure/patients/patient-detail/patient-detail.component';
import { PrenatalComponent } from './secure/prenatal/prenatal.component';
import { ListComponent } from './secure/prenatal/list/list.component';
import { SearchComponent } from './secure/prenatal/search/search.component';
import { CreateComponent } from './secure/prenatal/create/create.component';
import { SuiviComponent } from './secure/prenatal/suivi/suivi.component';
import { GrossesseComponent } from './secure/prenatal/grossesse/grossesse.component';
import { AntecedentComponent } from './secure/prenatal/antecedent/antecedent.component';
import { BilanComponent } from './secure/prenatal/bilan/bilan.component';
import { VaccinationComponent } from './secure/prenatal/vaccination/vaccination.component';
import { EchographieComponent } from './secure/prenatal/echographie/echographie.component';
import { ConsultationComponent } from './secure/prenatal/consultation/consultation.component';
import { PrenataldetailsComponent } from './secure/prenataldetails/prenataldetails.component';


const routes: Routes = [
  {path:'',
  component:SecureComponent,
  children:[
    {path:'', redirectTo:'/dashboard', pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent},
    {path:'users', component:UsersComponent},
    {path:'users/create', component:UserCreateComponent},
    {path:'users/:id/edit', component:UserEditComponent},
    {path:'profile', component:ProfileComponent},
    {path:'roles', component:RolesComponent},
    {path:'roles/create', component:RoleCreateComponent},
    {path:'roles/edit', component:RoleEditComponent},

    {path:'patients', component:PatientComponent},
    {path:'detailPatient/:id', component:PatientDetailComponent},
    {path:'roles', component:RolesComponent},
    {path:'roles/create', component:RoleCreateComponent},
    {path:'roles/edit', component:RoleEditComponent},
    {path:'honoraires', component:HonorairesComponent},
    {path:'ambulatoires', component:PaiementComponent},
    {path:'hospitalisations',component:HospitalisationComponent},
    {path:'etatEncaissement', component:EtatEncaissementComponent},
    {path:'etatBancaire', component:EtatbancaireComponent},
    {path:'factures', component:FacturationsComponent},
    {path:'releves', component:RelevesFacturesComponent},
    {path:'statementlist', component:StatementDetailComponent},
    {path:'histoversement', component:VersementComponent},
    {path:'medecins', component:Medecins},
    {path:'medecin', component:MedecinsPartenaireComponent},
    {path:'medecinDetails', component:MedecinsPartenaireDetailComponent},
    {path:'myprofil',component:ProfileComponent},
    {path:'prenataldetails/:id',component:PrenataldetailsComponent},
    {path:'prenatalsgrossesse',component:PrenatalComponent,
    children:[
    {path:'create',component:CreateComponent},
    {path:'list',component:ListComponent},
    {path:'suivi',component:SuiviComponent},
    {path:'grossesse',component:GrossesseComponent},
    {path:'antecedent',component:AntecedentComponent},
    {path:'bilan',component:BilanComponent},
    {path:'vaccination',component:VaccinationComponent},
    {path:'echographie',component:EchographieComponent},
    {path:'consultation',component:ConsultationComponent},
    ]},


  ]
  },
  {path:'',component:PublicComponent,
    children:[
      {path:'register', component:RegisterComponent},
      {path:'login',component:LoginComponent},
      {path:'logout',component:LoginComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
