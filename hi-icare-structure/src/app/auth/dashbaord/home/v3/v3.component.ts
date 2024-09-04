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
  selector: 'app-v3',
  templateUrl: './v3.component.html',
  styleUrls: ['./v3.component.scss']
})

export class V3Component implements OnInit {

  constructor(public dialogRef: MatDialogRef<V3Component>, @Inject(MAT_DIALOG_DATA) public  data: {
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
  arr: any
  dataSource: any


  ngOnInit() {
    this.getUniquePersnlValues(this.data.dataKey);
    this.arr = [
      { ID: "ID", Name: "223", isChecked: "true" },
      { ID: "NOM", Name: "Ramatoulaye", isChecked: "true" },
      { ID: "PRENOM", Name: "Mboup", isChecked: "true" },
      { ID: "NOM COMPLET", Name: "Ramatoulaye Mboup", isChecked: "true" },
      { ID: "PROFESSION", Name: "Infirmière", isChecked: "true" },
      { ID: "NATIONALITE", Name: "Senegal", isChecked: "true" },
      { ID: "DATE DE DEBUT", Name: "15/03/22", isChecked: "true" },
      { ID: "SEXE", Name: "Feminin", isChecked: "true" },
      { ID: "GENRE", Name: "Masculin", isChecked: "true" },
      { ID: "PHONE 1", Name: "702514892", isChecked: "true" },
      { ID: "PHONE 2", Name: "332147546", isChecked: "true" },
      { ID: "ADRESSE 1", Name: "sacre Coeur", isChecked: "true" },
      { ID: "ADRESSE 2", Name: "Thies, Ferraille", isChecked: "true" },
      { ID: "VILLE", Name: 'Dakar', isChecked: "true" },
      { ID: "RUE", Name: 'Dakar', isChecked: "true" },
      { ID: "PAYS", Name: 'Senegal', isChecked: "true" },
      { ID: "UTILISATEUR", Name: 'Oui', isChecked: "true" },
    ];
    this.dataSource = this.arr;
  }
  
  getUniquePersnlValues(ids:string){
    this.zone.run(() => {
    this.store
      .pipe(select(selectAllPrsnls), map((prsnlList) => prsnlList))
      .subscribe(value => {
        this.prsnl = value;
        for (const prsnl of this.prsnl) {
          if(prsnl.id == ids) {
            console.log('la valeur est :', prsnl);
            this.ar = {
              id : prsnl.id,
              firstname: prsnl.firstName,
              lastname : prsnl.lastName,
              fullname: prsnl.fullName,
              profession: prsnl.function,
              dob: prsnl.dob,
              nationality: prsnl.nationality,
              createdDate: prsnl.createdDate,
              sex: prsnl.sex,
              gender: prsnl.gender,
              phones: prsnl.phones.phone,
              adresses: prsnl.adresses,
              prsnlRoleIds: prsnl.prsnlRoleIds,
              is_User: prsnl.is_User
            };
    
            
          };
        }
      
    }
    );
  });
  };
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
