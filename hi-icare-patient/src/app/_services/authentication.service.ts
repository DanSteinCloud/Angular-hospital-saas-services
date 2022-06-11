import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { Router } from '@angular/router';
import { UserInfos } from '../_models/userInfos';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
  cudOptions: { headers: HttpHeaders; };



    constructor(private http: HttpClient,private router:Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    user(id){
      const cudOption ={ headers: new HttpHeaders({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',"X_HI_CODE":'001','Authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImV4cCI6MTYxODE3NjI1MywiaWF0IjoxNjE4MTczNTUzfQ.gPqk2Jr2roeSerdg9W0jcSk5jFCcdm3JOmV47P0MrvYQWx8VwF-Nhdqni25dnQyj-6z1hQ4hmJyK7Ffftg3j2w'})};
      return this.http.get(`${environment.baseUrlPrsnl}/prsnls?userId=${id}`,cudOption).pipe(
        retry(2),
        catchError(this.errorHandler)
      );
    }



    login(data) {
      const cudOption ={ headers: new HttpHeaders({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',"X_HI_CODE":data.X_HI_CODE})};
        return this.http.post<any>(`${environment.baseUrlUserSecurity}/users/login`, data,cudOption) .pipe(map(user => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }),
          catchError(this.errorHandler)
        )
            // .pipe(map(user => {
            //     localStorage.setItem('currentUser', JSON.stringify(user));
            //     this.currentUserSubject.next(user);
            //     return user;
            // }),retry(2),
            // catchError(this.errorHandler));
    }



    logout() {
        return this.http.get(`${environment.baseUrlUserSecurity}/users/logout`);
    }

    updatePassword(data){
      return this.http.put(`${environment.baseUrlUserSecurity}/users/password`,data);
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
