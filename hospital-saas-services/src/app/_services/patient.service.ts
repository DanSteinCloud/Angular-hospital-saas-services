import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { PATIENTS } from '../data/patient.data';
import { CrudService } from './crud.service';
import { patient } from '../_models/patient';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Reponse } from '../_models/reponse';
import { retry, catchError, map } from 'rxjs/operators';
import { DossierPrenatal } from '../_models/dossierprenatal';
const cudOptions = { headers: new HttpHeaders({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PatientService extends  CrudService<patient, number>{

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
    'Access-Control-Allow-Origin': 'http://localhost:4200'
  });

  constructor(protected _http: HttpClient) {
    super(_http, 'http://localhost:8080/nid-api/v1/patients');
 }

 updateForm(patientId, dossierId, id, p,typeId) {
  let url ="";

  switch(typeId){
    case 1:
      url="";
      break;
    case 2:
      url="";
      break;
    case 3:
      url="";
      break;
    case 4:
      url=`${environment.baseUrl}/patients/${patientId}/dossierPrenatal/${dossierId}/antecedentConjoint/${id}`;
      break;
    case 5:
      url =`${environment.baseUrl}/patients/${patientId}/dossierPrenatal/${dossierId}/antecedentFamille/${id}`;
      break;
    case 6:
      url=`${environment.baseUrl}/patients/${patientId}/dossierPrenatal/${dossierId}/antecedentsMedicaux/${id}`;
      break;
    case 7:
      url=`${environment.baseUrl}/patients/${patientId}/dossierPrenatal/${dossierId}/antecedentChirurgie/${id}`;
      break;
    case 8:
      url =`${environment.baseUrl}/patients/${patientId}/dossierPrenatal/${dossierId}/antecedentGyneco/${id}`;
      break;
    case 9:
      url =`${environment.baseUrl}/patients/${patientId}/antecedentObstetrical/${id}`;
      break;

  }
  return this._http.put<any>(url, JSON.stringify(p),cudOptions)
  .pipe(
   retry(2),
   catchError(this.handleError)
 );
}

createForm (patientId, dossierId, p,typeId){
  let url ="";

  switch(typeId){
    case 1:
      url="";
      break;
    case 2:
      url="";
      break;
    case 3:
      url="";
      break;
    case 4:
      url=environment.baseUrl+"/patients/"+patientId+"/dossierPrenatal/"+dossierId+"/antecedentConjoint";
      break;
    case 5:
      url =`${environment.baseUrl}/patients/${patientId}/dossierPrenatal/${dossierId}/antecedentFamille`;
      break;
    case 6:
      url=`${environment.baseUrl}/patients/${patientId}/dossierPrenatal/${dossierId}/antecedentsMedicaux`;
      break;
    case 7:
      url=`${environment.baseUrl}/patients/${patientId}/dossierPrenatal/${dossierId}/antecedentChirurgie`;
      break;
    case 8:
      url =`${environment.baseUrl}/patients/${patientId}/dossierPrenatal/${dossierId}/antecedentGyneco`;
      break;
    case 9:
      url =`${environment.baseUrl}/patients/${patientId}/antecedentObstetrical`;
      break;
  }

  return this._http.post<any>(url, JSON.stringify(p),cudOptions)
  .pipe(
   retry(2),
   catchError(this.handleError)
 );
}
 createGrossesse(patientId,dossierId,p){
  return this._http.post<any>(environment.baseUrl+"/patients/"+patientId+ '/dossierPrenatal/'+dossierId+"/grossesse", JSON.stringify(p),cudOptions)
  .pipe(
   retry(2),
   catchError(this.handleError)
 );
 }

 updateGrossesse(patientId,dossierId,grossesseId,p){
  return this._http.put<any>(environment.baseUrl+"/patients/"+patientId+ '/dossierPrenatal/'+dossierId+"/grossesse/"+grossesseId, JSON.stringify(p),cudOptions)
  .pipe(
   retry(2),
   catchError(this.handleError)
 );
 }
 createSuiviMedical(patientId,dossierId,p){
  return this._http.post<any>(environment.baseUrl+"/patients/"+patientId+ '/dossierPrenatal/'+dossierId+"/suiviMedical", JSON.stringify(p),cudOptions)
   .pipe(
    retry(2),
    catchError(this.handleError)
  );
 }

 updateSuiviMedical(patientId,dossierId,suiviId,p){
  return this._http.put<any>(environment.baseUrl+"/patients/"+patientId+ '/dossierPrenatal/'+dossierId+"/suiviMedical/"+suiviId, JSON.stringify(p),cudOptions)
  .pipe(
   retry(2),
   catchError(this.handleError)
 );
 }
 // PARTIE TETANOS
 createTetanos (patientId,dossierPrenatalId,p): Observable<any> {
  return this._http.post<any>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/vaccinTetan', JSON.stringify(p),cudOptions)
     .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getAllTetanos(patientId,dossierPrenatalId): Observable<any[]> {
    return this._http.get<any[]>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/vaccinTetans',cudOptions)
    .pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }
  updateTetanos(patientId,dossierPrenatalId,vaccinTetanId,p): Observable<any> {
  return this._http.put<any>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/vaccinTetan/'+vaccinTetanId, JSON.stringify(p),cudOptions)
    .pipe(
        retry(2),
        catchError(this.handleError)
      );
}

deleteTetanos(patientId,dossierPrenatalId,vaccinTetanId): Observable<any> {
  return this._http.delete<any>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/vaccinTetan/'+vaccinTetanId)
    .pipe(
        retry(2),
        catchError(this.handleError)
      );
}
// PARTIE Rhophylac
createRhophylac (patientId,dossierPrenatalId,p): Observable<any> {
  return this._http.post<any>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/rhophylac', JSON.stringify(p),cudOptions)
     .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getAllRhophylac(patientId,dossierPrenatalId): Observable<any[]> {
    return this._http.get<any[]>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/rhophylacs',cudOptions)
    .pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }
  updateRhophylac(patientId,dossierPrenatalId,rhophylacId,p): Observable<any> {
  return this._http.put<any>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/rhophylac/'+rhophylacId, JSON.stringify(p),cudOptions)
    .pipe(
        retry(2),
        catchError(this.handleError)
      );
}

deleteRhophylac(patientId,dossierPrenatalId,rhophylacId): Observable<any> {
  return this._http.delete<any>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/rhophylac/'+rhophylacId)
    .pipe(
        retry(2),
        catchError(this.handleError)
      );
}


// PARTIE Tpi
createTpi (patientId,dossierPrenatalId,p): Observable<any> {
  return this._http.post<any>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/tpi', JSON.stringify(p),cudOptions)
     .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getAllTpi(patientId,dossierPrenatalId): Observable<any[]> {
    return this._http.get<any[]>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/tpis',cudOptions)
    .pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }
  updateTpi(patientId,dossierPrenatalId,tpiId,p): Observable<any> {
  return this._http.put<any>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/tpi/'+tpiId, JSON.stringify(p),cudOptions)
    .pipe(
        retry(2),
        catchError(this.handleError)
      );
}
deleteTpi(patientId,dossierPrenatalId,tpiId): Observable<any> {
  return this._http.delete<any>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/tpi/'+tpiId)
    .pipe(
        retry(2),
        catchError(this.handleError)
      );
}

// PARTIE Bilan
createBilan (patientId,dossierPrenatalId,p): Observable<any> {
  return this._http.post<any>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/bilanPrenatal', JSON.stringify(p),cudOptions)
     .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getAllBilan(patientId,dossierPrenatalId): Observable<any[]> {
    return this._http.get<any[]>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/bilanPrenatals',cudOptions)
    .pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }
  updateBilan(patientId,dossierPrenatalId,bilanPrenatalId,p): Observable<any> {
  return this._http.put<any>(environment.baseUrl + "/patients/" +patientId + '/dossierPrenatal/'+dossierPrenatalId+'/bilanPrenatal/'+bilanPrenatalId, JSON.stringify(p),cudOptions)
    .pipe(
        retry(2),
        catchError(this.handleError)
      );
}




//CREATE ECHOGRAPHIE
createEchographie(p,idPatient,idDossierPrenatal): Observable<any> {
  return this._http.post<any>(environment.baseUrl+"/patients/"+idPatient+ '/dossierPrenatal/'+idDossierPrenatal+'/echographie', JSON.stringify(p),cudOptions)
     .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

updateEchographie(p,idPatient,idDossierPrenatal,echographieId): Observable<any> {
    return this._http.put<any>(environment.baseUrl+"/patients/"+idPatient+ '/dossierPrenatal/'+idDossierPrenatal+'/echographie/'+echographieId, JSON.stringify(p),cudOptions)
       .pipe(
        retry(2),
        catchError(this.handleError)
      );
}

//CREATE CONSULTATION
createConsultation(p,idPatient,idDossierPrenatal): Observable<any> {
  return this._http.post<any>(environment.baseUrl+"/patients/"+idPatient+ '/dossierPrenatal/'+idDossierPrenatal+'/consultation', JSON.stringify(p),cudOptions)
     .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

updateConsultation(p,idPatient,idDossierPrenatal,consultationId): Observable<any> {
    return this._http.put<any>(environment.baseUrl+"/patients/"+idPatient+ '/dossierPrenatal/'+idDossierPrenatal+'/consultation/'+consultationId, JSON.stringify(p),cudOptions)
       .pipe(
        retry(2),
        catchError(this.handleError)
      );
}
getAllConsultationsByIdPatientAndIdDossierPrenatal(idPatient,idDossierPrenatal): Observable<any> {
  return this._http.get<any[]>(environment.baseUrl+"/patients/"+idPatient+ '/dossierPrenatal/'+idDossierPrenatal+'/consultations')
     .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getAllEchographiesByIdPatientAndIdDossierPrenatal(idPatient,idDossierPrenatal): Observable<any> {
    return this._http.get<any[]>(environment.baseUrl+"/patients/"+idPatient+ '/dossierPrenatal/'+idDossierPrenatal+'/echographies')
       .pipe(
        retry(2),
        catchError(this.handleError)
      );
    }



createPrenatalFolder (p,id):Observable<any>{
  return this._http.post<any>(environment.baseUrl+"/patients/"+id+ '/dossierPrenatal', JSON.stringify(p),cudOptions);
  //  .pipe(
  //   retry(2),
  //   catchError(this.handleError)
  // );
}
createPatient(p): Observable<any> {
return this._http.post<any>(environment.baseUrl + '/patients', JSON.stringify(p), cudOptions)
   .pipe(
    retry(2),
    catchError(this.handleError)
  );
}
getAll(): Observable<any[]> {
  return this._http.get<any[]>(environment.baseUrl + '/patients?withAddresses=true&withCircle=true&withInsurance=true&withPhones=true')
  .pipe(
    catchError(this.errorHandler)
  );
}

getPatients():Observable<patient[]>{
    return this._http.get<patient[]>(environment.baseUrl + '/patients?withAddresses=true&withCircle=true&withInsurance=true&withPhones=true')
    .pipe(map(refdatas => refdatas["result"]
            .map(refdata => Object.assign(new patient(), refdata))));
}


findGeneric(idPatient,dossierId,typeId){
  let url ="";

  switch(typeId){
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      url =`${environment.baseUrl}/patients/${idPatient}/dossierPrenatal/${dossierId}/antecedentConjoints`;
      break;
    case 5:
      url =`${environment.baseUrl}/patients/${idPatient}/dossierPrenatal/${dossierId}/antecedentFamilles`;
      break;
    case 6:
      url =`${environment.baseUrl}/patients/${idPatient}/dossierPrenatal/${dossierId}/antecedentsMedicaux`;
      break;
    case 7:
      url =`${environment.baseUrl}/patients/${idPatient}/dossierPrenatal/${dossierId}/antecedentChirurgies`;
      break;
    case 8:
      url =`${environment.baseUrl}/patients/${idPatient}/dossierPrenatal/${dossierId}/antecedentGynecos`;
      break;
    case 9:
      url =`${environment.baseUrl}/patients/${idPatient}/antecedentObstetricals`;
      break;
  }
  return this._http.get<any>(url);
}
find(id): Observable<any> {
  return this._http.get<any>(`${environment.baseUrl}/patients/${id}?withPhones=true&withAddresses=true&withCircle=true`);
}

findDossierPrenatal(patientId): Observable<any> {
  return this._http.get<any>(`${environment.baseUrl}/patients/${patientId}/dossierPrenatals`);
}

getAllDossierPrenatals(patientId): Observable<DossierPrenatal> {
  return this._http.get<DossierPrenatal>(`${environment.baseUrl}/patients/${patientId}/dossierPrenatals?withAll=true`);
}

findSuiviMedicial(patientId,dossierId): Observable<any> {
  return this._http.get<any>(`${environment.baseUrl}/patients/${patientId}/dossierPrenatal/${dossierId}/suiviMedicals`);
}

findAntecedentConjoints(patientId,dossierId): Observable<any> {
  return this._http.get<any>(`${environment.baseUrl}/patients/${patientId}/dossierPrenatal/${dossierId}/antecedentConjoints`);
}

findGrossesse(patientId,dossierId): Observable<any> {
  return this._http.get<any>(`${environment.baseUrl}/patients/${patientId}/dossierPrenatal/${dossierId}/grossesses`);
}


findPriseOne(idPatient,idPrise): Observable<any> {
  return this._http.get<any>(`${environment.baseUrl}/patients/${idPatient}/insurance/${idPrise}`);
}


update(id, post): Observable<any> {
  return this._http.put<any>(environment.baseUrl + '/patients/' + id, JSON.stringify(post), cudOptions)
  .pipe(
    retry(2),
    catchError(this.errorHandler)
  );
}

updateDossierPrenatal(patientId, dossierId,p): Observable<any> {
  return this._http.put<any>(environment.baseUrl + '/patients/' +patientId+"/dossierPrenatal/"+dossierId, JSON.stringify(p), cudOptions)
  .pipe(
    retry(2),
    catchError(this.errorHandler)
  );
}

doArchivage(patientId, dossierId,p): Observable<any> {
  return this._http.put<any>(environment.baseUrl + '/patients/' +patientId+"/dossierPrenatal/"+dossierId+"/archive", JSON.stringify(p), cudOptions)
  .pipe(
    retry(2),
    catchError(this.errorHandler)
  );
}

search(p): Observable<any>{
  return this._http.post<any[]>(environment.baseUrl + '/patients/search?withPhones=true&withAddresses=true&withInsurance=true', JSON.stringify(p), cudOptions);
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
  }

  //Personne à contacter
  CreateCircle(idPatient,p){
    return this._http.post<any>(environment.baseUrl + '/patients/' + idPatient + '/circle', JSON.stringify(p), cudOptions)
   .pipe(
    retry(2),
    catchError(this.handleError)
  );
  }

  UpdateCircle(idPatient,idCircle,post){
    return this._http.put<any>(environment.baseUrl + '/patients/' + idPatient + '/circle/' + idCircle, JSON.stringify(post), cudOptions)
    .pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  DeleteCircle(idPatient,idCircle){
    return this._http.delete<any>(environment.baseUrl + '/patients/' + idPatient + '/circle/' + idCircle, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  deletePriseEnCharge(idPrisencharge,idPatient){
    return this._http.delete<any>(environment.baseUrl + '/patients/' + idPatient + '/insurance/'+idPrisencharge, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  deleteDossierPrenatal(idPatient,idDossierPrenatal){
    return this._http.delete<any>(environment.baseUrl + '/patients/' + idPatient + '/dossierPrenatal/'+idDossierPrenatal, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  deleteAntecedentObstetricals(patientId,antecedentObstetricalId): Observable<any> {
    return this._http.delete<any>(environment.baseUrl + "/patients/" +patientId + '/antecedentObstetrical/'+antecedentObstetricalId)
      .pipe(
          retry(2),
          catchError(this.handleError)
        );
  }

}
