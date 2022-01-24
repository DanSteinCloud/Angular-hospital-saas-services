import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(protected _http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this._http.get<any[]>(environment.baseUrlAssurance + '/insurances/sponsors', cudOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getOneSponsor(id): Observable<any[]> {
    return this._http.get<any[]>(environment.baseUrlAssurance + '/insurances/sponsors/'+id, cudOptions)
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
