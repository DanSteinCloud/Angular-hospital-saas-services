import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, combineLatest, map, Observable, pipe, switchMap, tap } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import { AuthStateInterface } from '../../types/authState.interface';
import { select, Store } from '@ngrx/store';
import { isSubmittingSelector, roleIdSelector, tokenSelector, userIdSelector, xhicodeSelector } from '../../store/selectors';
import { environment } from 'src/environments/environment';
import { PersnlService } from '../../services/persnl.service';
import { prsnlStateInterface } from 'src/app/shared/types/prsnl.interface';
import { loadPrsnls } from '../../store/actions/prsnl.actions';
import { prsnlsStateInterface } from 'src/app/shared/types/prsnls.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  isSubmitting!: boolean
  token!: string
  HI_CODE!: string
  roleId!: [number]
  userId!: string
  prsnl: any
  personels? : prsnlsStateInterface[]

  id!: String
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
  selectedUserId!:number
  ids!:[] 
  entities!:{}

  constructor(private http: HttpClient, private store: Store, private persnlService: PersnlService){}
  
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
        console.log('ids', prsnl.id);
        this.personels[] = {
          id : prsnl.id,
          firstname: prsnl.id,
          lastname : prsnl.firstname,
          fullname: prsnl.fullname,
          profession: prsnl.function,
          dob: prsnl.dob,
          nationality: prsnl.nationality,
          createdDate: prsnl.createdDate,
          sex: prsnl.sex,
          gender: prsnl.gender,
          phone: prsnl.phone,
          adresse: prsnl.adresse,
          prsnlRoleIds: prsnl.prsnlRoleIds,
          total: 10,
          selectedUserId:0,
          ids:[] ,
          entities:{},
        }];
      }; this.store.dispatch(loadPrsnls({this.personels}))})}
    }


