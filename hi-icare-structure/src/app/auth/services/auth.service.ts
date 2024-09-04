import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import { map } from "rxjs/operators";
import { select, Store } from "@ngrx/store";

import {RegisterRequesrInterface} from "../types/registerRequest.Interface";
import {LoginRequestInterface} from "../types/loginRequest.Interface";
import {CurrrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import { environment } from "src/environments/environment";
import { authResponseInterface } from "../types/authResponse.interface";

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, private store: Store){}
    register(data: RegisterRequesrInterface): Observable<CurrrentUserInterface>{
      const url = environment.apiUrl + '/users'
      return this.http
      .post<authResponseInterface>(url, data)
      .pipe(map((response: authResponseInterface) => response.user))
    }

    login(data: LoginRequestInterface): Observable<CurrrentUserInterface>{
      const url = environment.apiUrl + '/users/login'
      const Option ={ headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json',
        'X_HI_CODE': data.user.X_HI_CODE})
      };
      return this.http
      .post<CurrrentUserInterface>(url, { username: data.user.username, password: data.user.password }, Option)
      .pipe(map((response: CurrrentUserInterface) => response))
    }
}