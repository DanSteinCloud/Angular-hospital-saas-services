import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {


  constructor(private http:HttpClient) {
  }
  abstract endpoint():string;

  get url(){
    return `${environment.baseUrlPrsnl}/${this.endpoint()}`
  }

  all(page?:number){
    let url = this.url;
    if (page){
      url +=`?page=${page}`;
    }
    return this.http.get(url);
 }


 create(data){
   return this.http.post(this.url,data);
 }

 get(id){
   return this.http.get(`${this.url}/${id}`);
 }
 update(id:number,data)
 {
   return this.http.put(`${this.url}/${id}`,data);
 }

 delete(id){
   return this.http.delete(`${this.url}/${id}`)
 }
}
