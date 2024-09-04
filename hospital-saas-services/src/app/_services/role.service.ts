import { Injectable } from '@angular/core';
import { RestService } from './rest.service';


@Injectable({
  providedIn: 'root'
})
export class RoleService extends RestService{

  endpoint(): string {
    return "roles";
  }

  // url :string;

  // constructor(private http:HttpClient) {
  //   this.url =`${environment.api}/roles`

  // }
  // all(){
  //    return this.http.get(`${this.url}`);
  // }

  // delete(id:number){
  //   return this.http.delete(`${this.url}/${id}`)
  // }
}
