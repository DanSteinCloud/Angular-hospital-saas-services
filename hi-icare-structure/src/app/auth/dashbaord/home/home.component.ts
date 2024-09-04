import { Component, OnInit, TemplateRef, Inject, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, combineLatest, map, Observable, pipe, switchMap, tap } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgZone } from '@angular/core';

import { merge } from 'rxjs';
import { AuthStateInterface } from '../../types/authState.interface';
import { select, Store } from '@ngrx/store';
import { isSubmittingSelector, roleIdSelector, selectAllPrsnls, selectPrsnlState, tokenSelector, userIdSelector, xhicodeSelector } from '../../store/selectors';
import { environment } from 'src/environments/environment';
import { PersnlService } from '../../services/persnl.service';
import { prsnlStateInterface } from 'src/app/shared/types/prsnl.interface';
import { loadPrsnls } from '../../store/actions/prsnl.actions';
import { V1Component } from 'src/app/auth/dashbaord/home/v1/v1.component'
import { V2Component } from 'src/app/auth/dashbaord/home/v2/v2.component'
import { V3Component } from 'src/app/auth/dashbaord/home/v3/v3.component'
import { V4Component } from './v4/v4.component';
import { V44Component } from './v44/v44.component';
import { V33Component } from './v33/v33.component';
import { V22Component } from './v22/v22.component';

export interface DialogData {
  animal: string;
  name: string;
}
export interface DialogData2 {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  prsl: boolean = true
  usr: boolean = false
  rol: boolean = false
  privilege: boolean = false
  other: boolean = false
  activated: boolean = true
  
  closeResult: string | undefined;

  animal: string | undefined;
  name: string | undefined;

  isSubmitting!: boolean
  token!: string
  HI_CODE!: string
  roleId!: [number]
  userId!: string
  prsnl: any
  arr: prsnlStateInterface = {
    id :'',
    firstname:'',
    lastname : '',
    fullname :'',
    profession : '',
    dob : '',
    nationality: 0,
    createdDate: '',
    sex: '',
    gender :0,
    phones :[{id:1, phone:'7758', phoneType:1}],
    adresses : [{id: 83,
    address: "Parcelle",
    street: "Rue 12",
    city: 21,
    state: 221,
    country: 0,
    addressType: 3}],
    prsnlRoleIds : [0],
    is_User: false
  }
  personels : prsnlStateInterface[] = []

  prsnlId!: String
  firstname!: String
  lastname!: String
  fullname!: String
  profession!: String
  dob!: String
  nationality!: String
  createdDate!: String
  sex!: String
  gender!: String
  phone!: number
  adresse!: String
  prsnlRoleIds!: []
  total!: number
  is_User!: boolean

  
  constructor(private http: HttpClient, private store: Store, private persnlService: PersnlService, public dialog: MatDialog, private zone: NgZone){}
  
  ngOnInit(): void {
    this.initializeValues()
    this.getAllPersnlValues()
  }
  
  initializeValues(): void {
    this.store
    .pipe(select(isSubmittingSelector), map((isSubmitting) => isSubmitting))
    .subscribe(value => this.isSubmitting = value);
    this.store
    .pipe(select(tokenSelector), map((token) => token))
    .subscribe(value => this.token = value);

    this.store
    .pipe(select(xhicodeSelector), map((xhicode) => xhicode))
    .subscribe(value => this.HI_CODE = value);

    this.store
    .pipe(select(roleIdSelector), map((roleId) => roleId))
    .subscribe(value => this.roleId = value);

    this.store
    .pipe(select(userIdSelector), map((userId) => userId))
    .subscribe(value => this.userId = value);
    
  }

  getAllPersnlValues() {
    const data: AuthStateInterface = {
      isSubmitting: this.isSubmitting,
      X_HI_CODE: this.HI_CODE,
      token: this.token,
      userId : this.userId,
      roleIds: this.roleId,
    }
   
    return this.persnlService.getPersnl(data)
    .pipe(
      map((response) => response)
    ).subscribe((obj) => {
      for (const prsnl of Object.values(obj)[2]) {
        (prsnl.prsnlRoleIds != 0) ? this.is_User = true : this.is_User = false
        this.arr = {
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
          is_User: this.is_User
        };
        this.personels.push(this.arr); 
        
      };  
      this.store.dispatch(loadPrsnls({prsnls : this.personels}));
      this.store
      .pipe(select(selectAllPrsnls), map((prsnlList) => prsnlList))
      .subscribe(value => this.prsnl = value);}
      )}

  /**
    * Methods to swith between tabs, persnl, user, roles, privileges
  */

      displayPersonnel(){
        this.prsl = true
        this.usr = false
        this.rol = false
        this.privilege = false
        this.other = false
      }
      displayUsr(){
        this.prsl = false
        this.usr = true
        this.rol = false
        this.privilege = false
        this.other = false
      }
      displayRole(){
        this.prsl = false
        this.usr = false
        this.rol = true
        this.privilege = false
        this.other = false
      }
      displayPrivilege(){
        this.prsl = false
        this.usr = false
        this.rol = false
        this.privilege = true
        this.other = false
      }
      displayOther(){
        this.prsl = false
        this.usr = false
        this.rol = false
        this.privilege = false
        this.other = true
      }
    
  /**
    * Methods for v1, delete a personel
  */
      openDialog(): void {
        const dialogRef = this.dialog.open(V1Component, {
          width: '250px',
          data: {name: this.name, animal: this.animal},
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.animal = result;
        });
      }

   /**
    * Methods for v2, edit a personel
  */
    openDialog2() {
      const dialogRef = this.dialog.open(V2Component);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  
    }

  /**
    * Methods for v3, view personels' details
  */

   openDialog3() {
    this.zone.run(() => {
    const dialogRef = this.dialog.open(V3Component, {
      data: {

      }
     
     });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  });
  }

   /**
    * Methods for v4, add a new personel
  */

  openDialog4() {
    this.zone.run(() => {
    const dialogRef = this.dialog.open(V4Component);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  });
  }

/**
    * Methods for v44, add a new user
  */
  
 openDialog44() {
  this.zone.run(() => {
  const dialogRef = this.dialog.open(V44Component);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
});

}

/**
    * Methods for v33, add a new user
  */
  
 openDialog33() {
  this.zone.run(() => {
  const dialogRef = this.dialog.open(V33Component);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
});

}

/**
    * Methods for v22, add a new user
  */
  
 openDialog22() {
  this.zone.run(() => {
  const dialogRef = this.dialog.open(V22Component);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
});

}
 
}

   
