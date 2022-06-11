import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { refData } from '../_models/refdata';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class RefdataService
{

  constructor(protected _http: HttpClient) {

 }

  getAll(): Observable<any[]> {
    return this._http.get<any[]>(environment.baseUrl + '/refdata/domain',cudOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public get(domain): Observable <refData[]>
  {
      return this._http.get <refData[]>(environment.baseUrlRefData + '/refdata/domain?domain=' + domain, cudOptions)
      .pipe(map(refdatas => refdatas["result"]
            .map(refdata => Object.assign(new refData(), refdata))));
  }

  getRefData(domain): Observable<any[]> {
    return this._http.get<any[]>(environment.baseUrlRefData + '/refdata/domain?domain=' + domain, cudOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getRefData2(domain): Observable<any[]> {
    return this._http.get<any[]>(environment.baseUrlRefData + '/refdata/domain?domain=' + domain, cudOptions)
    .pipe(
      catchError(this.errorHandler)
    );
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
