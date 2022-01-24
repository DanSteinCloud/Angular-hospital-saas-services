import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { UserInfos } from '../_models/userInfos';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    private _loggedInUser?: UserInfos;

  get loggedInUser(): UserInfos {
      return this._loggedInUser;
  }
  set loggedInUser(user: UserInfos) {
      this._loggedInUser = user;
  }
    getAll() {
        //return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getUserInfos(id){
      return this.http.get(`${environment.baseUrlPrsnl}/prsnls?userId=`+id);
    }
}
