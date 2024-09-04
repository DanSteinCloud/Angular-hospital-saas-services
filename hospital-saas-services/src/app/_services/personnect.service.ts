import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { PATIENTS } from '../data/patient.data';
import { CrudService } from './crud.service';
import { patient } from '../_models/patient';
import { GenericService } from './generic.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Reponse } from '../_models/reponse';
const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
//extends  CrudService<patient, number>
export class PersonnectService {
  setGroupFilter$ = new Subject<any>();
	getGroupFilter = this.setGroupFilter$.asObservable();
  _base = environment.baseUrl;
  s: string;
  results:Reponse;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

   headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(protected _http: HttpClient) {
   // super(_http, 'http://localhost:8080/nid-api/v1/patients');
 }



createPatient(p): Observable<any> {
return this._http.post<any>(environment.baseUrlAssurance + '/patients', JSON.stringify(p), cudOptions)
   .pipe(
    retry(2),
    catchError(this.handleError)
  );
}
getAll(): Observable<any[]> {
  return this._http.get<any[]>(environment.baseUrlAssurance + '/patients/all?withPhones=true&withAddresses=true&withInsurance=true ',cudOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}
find(id): Observable<any> {
  return this._http.get<any>(environment.baseUrl + '/patients/' + id + '?withPhones=true&withAddresses=true', cudOptions);
}

update(id, post): Observable<any> {
  return this._http.put<any>(environment.baseUrl + '/patients/' + id, JSON.stringify(post), cudOptions)
  .pipe(
    retry(2),
    catchError(this.errorHandler)
  );
}


search(p):Observable<any>{
  return this._http.post<any>(environment.baseUrl + '/patients/search', JSON.stringify(p), cudOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

delete(id){
  return this._http.delete<any>(environment.baseUrl + '/patients/' + id, this.httpOptions)
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
//GenericService<patient, number>{


  // constructor(private http: HttpClient) {
  // }
  // get(): Observable<patient[]> {
  //   return this.http.get<patient[]>(this.patientsUrl).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  // getById(id: number): Observable<patient> {
  //   const url = `${this.patientsUrl}/${id}`;
  //   return this.http.get<patient>(url).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  // add(t: patient): Observable<patient> {
  //   return this.http.post<patient>(this.patientsUrl, t, cudOptions).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  // delete(patient_id: number | patient ): Observable<any> {
  //   //const id = typeof patient_id === 'number' ? patient_id : patient.;
  //   const url = `${this.patientsUrl}/${patient_id}`;

  //   return this.http.delete<patient>(url, cudOptions).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  // search(term: string): Observable<patient[]> {
  //   term = term.trim();
  //   // add safe, encoded search parameter if term is present
  //   const options = term ?
  //   { params: new HttpParams().set('name', term)} : {};

  //   return this.http.get<patient[]>(this.patientsUrl, options).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  // update(id: number, t: patient): Observable<patient> {
  //   return this.http.put<patient>(this.patientsUrl, id, cudOptions).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  public fetchPatients(): Observable<any> {
    return of(PATIENTS);
  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,

      if (error.status==302) {
        this.results.code =error.status;
        this.results.message =error.message;
        this.results.result =error.error.result;
        return error.error.result;
      }
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
