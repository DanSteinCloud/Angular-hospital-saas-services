import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { createFeatureSelector, createSelector, select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectAllPrsnls } from 'src/app/auth/store/selectors';
import { persnlStateInterface } from 'src/app/shared/types/appState.interface';
import { prsnlStateInterface } from 'src/app/shared/types/prsnl.interface';
import { prsnlsStateInterface } from 'src/app/shared/types/prsnls.interface';




export interface DialogData {
  ID: String, 
  Name: String, 
  isChecked: String 
}
@Component({
  selector: 'app-v33',
  templateUrl: './v33.component.html',
  styleUrls: ['./v33.component.scss']
})

export class V33Component implements OnInit {

  constructor(public dialogRef: MatDialogRef<V33Component>, @Inject(MAT_DIALOG_DATA) public  data: {
    dataKey: string
  }, private store: Store, private zone: NgZone) { }
  prsnl: any
  public versions: any[] = [];
  public versionIndex: number = 0;
  displayedColumns: string[] = ['fields', 'values'];
  public fields: String[] = [ 
  'id',
  'firstname',
  'lastname',
  'fullname',
  'profession',
  'dob',
  'nationality',
  'createdDate',
  'sex',
  'gender',
  'phones',
  'adresses',
  'address',
  'street',
  'city',
  'state',
  'country',
  'addressType',
  'prsnlRoleIds'];

  uniquePrsnl: any

  newArr : DialogData[] = [{ ID: "001", Name: "a00", isChecked: "true" }];
  size = 4;
  ar: prsnlStateInterface = {
    id: '',
    firstname: '',
    lastname: '',
    fullname: '',
    profession: '',
    dob: '',
    nationality: 0,
    createdDate: '',
    sex: '',
    gender: 0,
    phones: [{}],
    adresses: [{}],
    prsnlRoleIds: [],
    is_User: false
  };
  arr = [
    { ID: "ID", Name: "223", isChecked: "true" },
    { ID: "NOM", Name: "Ramatoulaye", isChecked: "true" },
    { ID: "PRENOM", Name: "Mboup", isChecked: "true" },
    { ID: "NOM COMPLET", Name: "Ramatoulaye Mboup", isChecked: "true" },
    { ID: "PROFESSION", Name: "Infirmière", isChecked: "true" },
    { ID: "NATIONALITE", Name: "Senegal", isChecked: "true" },
    { ID: "DATE DE DEBUT", Name: "15/03/22", isChecked: "true" },
    { ID: "SEXE", Name: "Feminin", isChecked: "true" },
    { ID: "GENRE", Name: "Femme", isChecked: "true" },
    { ID: "PHONE 1", Name: "772145423", isChecked: "true" },
    { ID: "PHONE 2", Name: "3312451", isChecked: "true" },
    { ID: "ADRESSE 1", Name: "Baobab", isChecked: "true" },
    { ID: "ADRESSE 2", Name: "Thies", isChecked: "true" },
    { ID: "VILLE", Name: 'Dakar', isChecked: "true" },
    { ID: "RUE", Name: 'Rue 26', isChecked: "true" },
    { ID: "PAYS", Name: 'Senegal', isChecked: "true" },
    { ID: "Utilisateur", Name: 'Oui', isChecked: "true" },
    { ID: "Status", Name: 'Activé', isChecked: "true" },
    { ID: "Rôle", Name: 'Secretaire', isChecked: "true" },
  ];
  dataSource = this.arr;


  ngOnInit() {
    this.getUniquePersnlValues();
  
  }
  getUniquePersnlValues() {
    throw new Error('Method not implemented.');
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
