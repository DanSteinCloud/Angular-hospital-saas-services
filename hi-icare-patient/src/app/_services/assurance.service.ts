import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Insurance } from '../_models/insurance';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};


@Injectable({
  providedIn: 'root'
})
export class AssuranceService {

  constructor(protected _http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this._http.get<any[]>(environment.baseUrlAssurance + '/insurances')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public get():Observable<Insurance[]>
  {
      return this._http.get <Insurance[]>(environment.baseUrlAssurance + '/insurances')
      .pipe(map(refdatas => refdatas["result"]
            .map(refdata => Object.assign(new Insurance(), refdata))));
  }

  getOneAssurance(id){
    return this._http.get<any[]>(environment.baseUrlAssurance + '/insurances/' +id)
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

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,

      if (error.error.code==302) {
       return error.error.result;
      }
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
