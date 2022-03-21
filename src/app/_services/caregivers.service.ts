import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { UserInfos } from '../_models/userInfos';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CareGivers } from '../_models/caregivers';
import { RestService } from './rest.service';

@Injectable({ providedIn: 'root' })
export class CareGiversService
{
    constructor(private _http: HttpClient) { }
    getCareGivers(): Observable<CareGivers[]> {
        return this._http.get<CareGivers[]>(environment.baseUrlPrsnl + '/prsnls/caregivers');
      }
  
      errorHandler(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
      }
   
}