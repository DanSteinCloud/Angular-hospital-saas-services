import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";

import { AuthStateInterface } from "src/app/auth/types/authState.interface";
import { registerAction } from "src/app/auth/store/actions/register.actions";
import { loginAction, loginSuccessAction } from "src/app/auth/store/actions/login.actions";
import { CurrrentUserInterface } from "src/app/shared/types/currentUser.interface";

const initialState: AuthStateInterface = {
    isSubmitting: false,
    X_HI_CODE: 'NEST',
    token: '',
    userId : '',
    roleIds: [60],
}
const authReducer = createReducer(
    initialState, 
    on(registerAction, 
    (state: AuthStateInterface): AuthStateInterface => ({
    ...state,
    isSubmitting: true
})))
const logReducer = createReducer(
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
})))

export function loginReducer( state: AuthStateInterface, action: Action): AuthStateInterface{
    return logReducer(state, action)
}