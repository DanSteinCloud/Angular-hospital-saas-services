import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService<T, ID> {

  abstract get(): Observable<T[]>;
  abstract getById(id: number): Observable<T>;
  abstract add(t: T): Observable<T>;
  abstract delete(t: T | number): Observable<T>;
  abstract search(term: string): Observable<T[]>;
  abstract update(id: ID, t: T): Observable<T>;
}
