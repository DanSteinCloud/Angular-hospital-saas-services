import { Observable } from 'rxjs';

export interface CrudOperations<T, ID> {
save(t: T): Observable<Response>;
update(id: ID, t: T): Observable<T>;
findOne(id: ID): Observable<T>;
findAll(): Observable<T[]>;
delete(id: ID): Observable<any>;
}
