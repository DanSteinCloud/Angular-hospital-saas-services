import {Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { roleIdSelector, tokenSelector, userIdSelector, xhicodeSelector } from "src/app/auth/store/selectors";
import { select, Store } from "@ngrx/store";
import { LoginRequestInterface } from "../types/loginRequest.Interface";
import {CurrrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import { AuthStateInterface } from "../types/authState.interface";

@Injectable()
export class PersnlService implements OnInit {
  constructor(private http: HttpClient, private store: Store){
  }
  ngOnInit(): void {

  }

    getPersnl(data: AuthStateInterface){
      const params = new HttpParams()
        .set('params', data.userId);
        const url = 'https://icare-nestlabs-test.net:8181/nid-api/v1/prsnls'
        const Option ={ headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*', 
          'Content-Type': 'application/json',
          'Authorization': data.token,
          'X_HI_CODE': data.X_HI_CODE
        })
        };
        return this.http.get(url, Option).pipe(map((response) => response))
      }

      getUniquePersnl(data: AuthStateInterface){
        const params = new HttpParams()
          .set('params', data.userId);
          const url = 'https://icare-nestlabs-test.net:8181/nid-api/v1/prsnls'
          const Option ={ headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json',
            'Authorization': data.token,
            'X_HI_CODE': data.X_HI_CODE
          })
          };
          return this.http.get(url, Option).pipe(map((response) => response))
        }
}