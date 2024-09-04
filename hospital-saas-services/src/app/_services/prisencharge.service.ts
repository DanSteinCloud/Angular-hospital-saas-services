import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const cudOptions = { headers: new HttpHeaders({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',"X-HI-CODE":"001"})};

@Injectable({
  providedIn: 'root'
})
export class PrisenchargeService {

 // constructor() { }

//   constructor(protected _http: HttpClient) {
//     super(_http, 'http://localhost:8080/nid-api/v1/patients');
//  }
constructor(protected _http: HttpClient) {
  //super(_http, 'http://localhost:8080/nid-api/v1/patients');
}

 create(p): Observable<any> {
  return this._http.post<any>(environment.baseUrl + '/patients/' +p.patientId + '/insurance', JSON.stringify(p))
     .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  getAll(): Observable<any[]> {
    return this._http.get<any[]>(environment.baseUrlAssurance + '/insurances')
    .pipe(
      catchError(this.errorHandler)
    );
  }
  find(id): Observable<any> {
    return this._http.get<any[]>(environment.baseUrl + '/patients/' + id + '/insurance');
    // .pipe(
    //   catchError(this.errorHandler)
    // );
  }
  update(id, post): Observable<any> {
    return this._http.put<any>(environment.baseUrl + '/patients/' + id + '/insurance/'+post.id, JSON.stringify(post))
    .pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  delete(id){
    return this._http.delete<any>(environment.baseUrl + '/patients/' + id + '/insurance', cudOptions)
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
