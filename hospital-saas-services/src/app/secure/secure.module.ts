import { NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RolesComponent } from './roles/roles.component';
import { RoleCreateComponent } from './roles/role-create/role-create.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { HonorairesComponent } from './honoraires/honoraires.component';
import { PaiementComponent } from './paiement/paiement.component';
import { PaiementSearchComponent } from './paiement/paiement-search/paiement-search.component';
import { PaiementListePrestationComponent } from './paiement/paiement-liste-prestation/paiement-liste-prestation.component';
import { PrestationAmbulatoireComponent } from './paiement/prestation-ambulatoire/prestation-ambulatoire.component';
import { NouvellePrestationAmbulatoireComponent } from './paiement/nouvelle-prestation-ambulatoire/nouvelle-prestation-ambulatoire.component';
import { FacturerComponent } from './paiement/facturer/facturer.component';
import { PatientSearchComponent } from './patients/patient-search/patient-search.component';
import { PatientComponent } from './patients/patient/patient.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { PatientDetailComponent } from './patients/patient-detail/patient-detail.component';
import { FacturesComponent } from './hospitalisation/factures/factures.component';
import { HospitalisationComponent } from './hospitalisation/hospitalisation.component';
import { NouvelleHospitalisationComponent } from './hospitalisation/nouvelle-hospitalisation/nouvelle-hospitalisation.component';
import { PrestationHospitalisationComponent } from './hospitalisation/prestation-hospitalisation/prestation-hospitalisation.component';
import { SearchHospitalisationComponent } from './hospitalisation/search-hospitalisation/search-hospitalisation.component';
import { PaiementHospitalisationComponent } from './hospitalisation/paiement-hospitalisation/paiement-hospitalisation.component';
import { EtatEncaissementComponent } from './etat-encaissement/etat-encaissement.component';
import { FacturationsComponent } from './facturations/facturations.component';
import { RelevesFacturesComponent } from './releves-factures/releves-factures.component';
import { InvoiceSearchComponent } from './facturations/invoice-search/invoice-search.component';
import { InvoiceListComponent } from './facturations/invoice-list/invoice-list.component';
import { StatementSearchComponent } from './releves-factures/statement-search/statement-search.component';
import { StatementListComponent } from './releves-factures/statement-list/statement-list.component';
import { StatementDetailComponent } from './releves-factures/statement-detail/statement-detail.component';
import { SearchEncaissementComponent } from './etat-encaissement/search-encaissement/search-encaissement.component';
import { ListEncaissementComponent } from './etat-encaissement/list-encaissement/list-encaissement.component';
import { CaisseComponent } from './etat-encaissement/caisse/caisse.component';
import { VersementComponent } from './versement/versement.component';
import { SearchVersementComponent } from './versement/search-versement/search-versement.component';
import { ListVersementComponent } from './versement/list-versement/list-versement.component';
import { DetailVersementComponent } from './versement/detail-versement/detail-versement.component';
import { EtatbancaireComponent } from './etatbancaire/etatbancaire.component';
import { ListeComponent } from './etatbancaire/liste/liste.component';
import { SearchBancaireComponent } from './etatbancaire/search-bancaire/search-bancaire.component';
import { MedecinsComponent } from './medecins/medecins.component';
import { MedecinsPartenaireComponent } from './medecins/medecins-partenaire/medecins-partenaire.component';
import { MedecinsPartenaireDetailComponent } from './medecins/medecins-partenaire-detail/medecins-partenaire-detail.component';
import { MedecinsPartenaireAddComponent } from './medecins/medecins-partenaire-add/medecins-partenaire-add.component';
import { MedecinsPartenaireEditComponent } from './medecins/medecins-partenaire-edit/medecins-partenaire-edit.component';
import { MedecinsSearchComponent } from './medecins/medecins-search/medecins-search.component';
import { ConventionsComponent } from './conventions/conventions.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { PrenatalComponent } from './prenatal/prenatal.component';
import { ListComponent } from './prenatal/list/list.component';
import { SearchComponent } from './prenatal/search/search.component';
import { CreateComponent } from './prenatal/create/create.component';
import { SuiviComponent } from './prenatal/suivi/suivi.component';
import { GrossesseComponent } from './prenatal/grossesse/grossesse.component';
import { AntecedentComponent } from './prenatal/antecedent/antecedent.component';
import { BilanComponent } from './prenatal/bilan/bilan.component';
import { VaccinationComponent } from './prenatal/vaccination/vaccination.component';
import { EchographieComponent } from './prenatal/echographie/echographie.component';
import { ConsultationComponent } from './prenatal/consultation/consultation.component';
import { DetailsComponent } from './prenatal/details/details.component';
import { PrenataldetailsComponent } from './prenataldetails/prenataldetails.component';
import { ModalComponent } from '../components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SecureComponent,
    NavComponent,
    MenuComponent,
    DashboardComponent,
    UsersComponent,
    ProfileComponent,
    UserCreateComponent,
    UserEditComponent,
    RolesComponent,
    RoleCreateComponent,
    RoleEditComponent,
    HonorairesComponent,
    PaiementComponent,
    PaiementSearchComponent,
    PaiementListePrestationComponent,
    PrestationAmbulatoireComponent,
    NouvellePrestationAmbulatoireComponent,
    FacturerComponent,
    PatientSearchComponent,
    PatientComponent,
    PatientListComponent,
    PatientDetailComponent,
    FacturesComponent,
    HospitalisationComponent,
    NouvelleHospitalisationComponent,
    PrestationHospitalisationComponent,
    SearchHospitalisationComponent,
    PaiementHospitalisationComponent,
    EtatEncaissementComponent,
    FacturationsComponent,
    RelevesFacturesComponent,
    InvoiceSearchComponent,
    InvoiceListComponent,
    StatementSearchComponent,
    StatementListComponent,
    StatementDetailComponent,
    SearchEncaissementComponent,
    ListEncaissementComponent,
    CaisseComponent,
    VersementComponent,
    SearchVersementComponent,
    ListVersementComponent,
    DetailVersementComponent,
    EtatbancaireComponent,
    ListeComponent,
    SearchBancaireComponent,
    MedecinsComponent,
    MedecinsPartenaireComponent,
    MedecinsPartenaireDetailComponent,
    MedecinsPartenaireAddComponent,
    MedecinsPartenaireEditComponent,
    MedecinsSearchComponent,
    ConventionsComponent,
    PrenatalComponent,
    ListComponent,
    SearchComponent,
    CreateComponent,
    SuiviComponent,
    GrossesseComponent,
    AntecedentComponent,
    BilanComponent,
    VaccinationComponent,
    EchographieComponent,
    ConsultationComponent,
    DetailsComponent,
    PrenataldetailsComponent

],

  exports:[
    SecureComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgbModule
  ],

})
export class SecureModule {
  tester: any;
  constructor(){
     this.tester='merci de voir si ca marche';
  }


}
