import { createAction, props } from "@ngrx/store"
import { actionTypes } from "src/app/auth/store/actionTypes"
import { CurrrentUserInterface } from "src/app/shared/types/currentUser.interface"
import { RegisterRequesrInterface } from "../../types/registerRequest.Interface"
export const registerAction = createAction(
    actionTypes.REGISTER,
    props<{request: RegisterRequesrInterface}>()
)
export const registerSuccessAction = createAction(
    actionTypes.REGISTER_SUCCES,
    props<{currentUser: CurrrentUserInterface}>()
)
export const registerFailureAction = createAction(
    actionTypes.REGISTER_FAILURE
)