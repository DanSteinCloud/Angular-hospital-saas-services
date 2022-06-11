import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { prsnlStateInterface } from "src/app/shared/types/prsnl.interface"
import { AuthStateInterface } from "src/app/auth/types/authState.interface";
import { registerAction } from "src/app/auth/store/actions/register.actions";
import { loginAction, loginSuccessAction } from "./actions/login.actions";
import { CurrrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { ActionTypes, PrsnlActions } from "./actions/prsnl.actions";

interface loginState extends EntityState<AuthStateInterface> {
    total: number;
  }
  
interface prsnlState extends EntityState<prsnlStateInterface> {
    id: String,
    firstname: String,
    lastname: String,
    fullname: String,
    profession: String,
    dob: String,
    nationality: String,
    createdDate: String,
    sex: String,
    gender: String,
    phone: number,
    adresse: String,
    prsnlRoleIds: number,
  }

export interface State {
    login: AuthStateInterface;
    prsnl: prsnlStateInterface;
  }

const adapterLogin = createEntityAdapter<AuthStateInterface>();
const adapterPrsnl = createEntityAdapter<prsnlStateInterface>();

const loginInitialState: loginState = adapterLogin.getInitialState({ 
    isSubmitting: false,
    X_HI_CODE: 'NEST',
    token: '',
    userId : '',
    roleIds: [60],
    total:0 });

const prsnlInitialState: prsnlState = adapterPrsnl.getInitialState({ 
    id: '',
    firstname: '',
    lastname: '',
    fullname: '',
    profession: '',
    dob: '',
    nationality: '',
    createdDate: '',
    sex: '',
    gender: '',
    phone: 0,
    adresse: '',
    prsnlRoleIds: 0,
    total: 0 });

const initialState = {
   login: loginInitialState,
   prsnl: prsnlInitialState
}

export function prsnlsReducer(
    state = prsnlInitialState, action: PrsnlActions ): prsnlStateInterface {
    switch (action.type) {
        case ActionTypes.GetPersnlList:
             return adapterPrsnl.addOne(action.payload.course, state);
        default: 
            return state;
    }
}
const authReducer = createReducer(
    initialState, 
    on(registerAction, 
    (state: AuthStateInterface): AuthStateInterface => ({
    ...state,
    isSubmitting: true
})))
const loginReducer = createReducer(
    initialState, 
    on(loginAction, 
    (state: AuthStateInterface): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
})),
    on(loginSuccessAction, 
    (state: AuthStateInterface, {currentUser}): AuthStateInterface => ({
    ...state,
    token: currentUser.result.token,
    userId : currentUser.result.userId,
    roleIds : currentUser.result.roleIds,
})),
on(getAllPersnlAction, 
    (state: AuthStateInterface, {currentUser}): AuthStateInterface => ({}))

export function reducers( state: AuthStateInterface, action: Action){
    return loginReducer(state, action)
}