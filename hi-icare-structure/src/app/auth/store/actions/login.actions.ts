import { createAction, props } from "@ngrx/store"
import { actionTypes } from "src/app/auth/store/actionTypes"
import { CurrrentUserInterface } from "src/app/shared/types/currentUser.interface"
import { LoginRequestInterface } from "../../types/loginRequest.Interface"
export const loginAction = createAction(
    actionTypes.LOGIN,
    props<{request: LoginRequestInterface}>()
)
export const loginSuccessAction = createAction(
    actionTypes.LOGIN_SUCCES,
    props<{currentUser: CurrrentUserInterface}>()
)
export const loginFailureAction = createAction(
    actionTypes.LOGIN_FAILURE
)