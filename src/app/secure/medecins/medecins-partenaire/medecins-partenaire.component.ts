import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-medecins-partenaire',
  templateUrl: './medecins-partenaire.component.html',
  styleUrls: ['./medecins-partenaire.component.css']
})
export class MedecinsPartenaireComponent implements OnInit {

  obj: any = new Array(
    { id: 'MED001', nom: 'Dr A', statut: 'Interne', telephone: '50', specialite: 'Chirugien'},
    { id: 'MED002', nom: 'Jojo', statut: 'Interne', telephone: '15', specialite: 'Generaliste' },
    { id: 'MED003', nom: 'Andre', statut: 'Interne', telephone: '85', specialite: 'Chirugien' },
    { id: 'MED004', nom: 'Simpson', statut: 'Interne', telephone: '45', specialite: 'Chirugien' },
    { id: 'MED005', nom: 'Doly', statut: 'Interne', telephone: '40', specialite: 'Pediatre' },
    { id: 'MED006', nom: 'Bintang', statut: 'Externe', telephone: '36', specialite: 'Generaliste' },
    { id: 'MED007', nom: 'Aria', statut: 'Externe', telephone: '74', specialite: 'Chirugien' },
    { id: 'MED008', nom: 'Sams', statut: 'Externe', telephone: '8' , specialite: 'Chirugien'},
    { id: 'MED009', nom: 'Oly', statut: 'Externe', telephone: '12', specialite: 'Generaliste' });
  userlist: any;
  title: string;
  id: string;
  searchFormMpart: FormGroup;
  loaddetails = false;
  partenaire = false;

  constructor( private router: Router,
               private formBuilder: FormBuilder) { }

  ngOnInit(): void {
   this.title = 'merciiii';
   this.userlist = this.obj;
   this.partenaire = true;
   this.loaddetails = false;
   this.searchFormMpart = this.formBuilder.group({
    id: ['', Validators.required],
    nom: ['', Validators.required],
    statut: ['', Validators.required]
});
  }

  onSubmit() {
  }

  mPartenaireDetails(id: number){
    //console.log('here icicicc' + id);
    this.loaddetails = true;
    this.partenaire = false;
    //this.router.navigate(['mpartenaire-details', {queryParams: { id : id }}]);
  }

}
