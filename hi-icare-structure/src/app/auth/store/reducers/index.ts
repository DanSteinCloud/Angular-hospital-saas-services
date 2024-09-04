import { from } from 'rxjs';
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import { prsnlStateInterface } from 'src/app/shared/types/prsnl.interface';
import { AuthStateInterface } from '../../types/authState.interface';
import { userStateInterface } from 'src/app/shared/types/user.interface';

import * as fromLogin from 'src/app/auth/store/reducers/loginReducers';
import * as fromPrsnl from 'src/app/auth/store/reducers/prsnlReducer';
import * as fromUser from 'src/app/auth/store/reducers/userReducer';


export interface AuthModuleState {
    login: any
    prsnl: any
    user: any
}

export const mainReducer:AuthModuleState = {    
    login: fromLogin.loginReducer,
    prsnl: fromPrsnl.prsnlReducer,
    user: fromUser.userReducer
};

const combineReducer = combineReducers(mainReducer);

export function reducer(state:any, action:any){
    return combineReducer(state, action);
}


