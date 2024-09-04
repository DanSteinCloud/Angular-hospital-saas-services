import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  cudOptions: any;
  constructor(private http: HttpClient) {

  }

  //Liste tous les modules
  getAllModule(roleId) {
     return this.http.get(`${environment.baseUrlModule}/modules?`+roleId)
      .pipe(
        retry(2),
        catchError(this.errorHandler)
      );

  }

  //Recupère un role depuis l'identifiant
  getRolesByRoleId(roleId){
    return this.http.get(`${environment.baseUrlRolePrivilege}/roles/`+roleId)
    .pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  getPrivilegeFromRole(privilegesId){
    return this.http.get(`${environment.baseUrlRolePrivilege}/privileges?`+privilegesId)
    .pipe(
      retry(2),
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
