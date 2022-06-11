import { createFeatureSelector, createSelector } from "@ngrx/store";
import { appStateInterface } from "src/app/shared/types/appState.interface";
import { AuthStateInterface } from "src/app/auth/types/authState.interface"
import { AuthModuleState, reducer } from "./reducers";
import { prsnlsStateInterface } from "src/app/shared/types/prsnls.interface";
import { prsnlReducer } from "./reducers/prsnlReducer";

export const authModuleState = createFeatureSelector<AuthModuleState>('auth');


export const isSubmittingSelector = createSelector(
    authModuleState, (state: AuthModuleState) => state.login.isSubmitting
);
export const roleIdSelector = createSelector(
     authModuleState, (state: AuthModuleState) => state.login.roleId
 );
 export const userIdSelector = createSelector(
     authModuleState, (state: AuthModuleState) => state.login.userId
 );
 export const xhicodeSelector = createSelector(
     authModuleState, (state: AuthModuleState) => state.login.X_HI_CODE
 );
 export const tokenSelector = createSelector(
     authModuleState, (state: AuthModuleState) => state.login.token
 );
 
export const selectPrsnlState = createSelector(
    authModuleState, (state: AuthModuleState) => state.prsnl
);

export const selectAllPrsnls = createSelector(
    selectPrsnlState,
    prsnlsState => {
        const allPrsnls = Object.values(prsnlsState.entities)
        return allPrsnls;
    }
);

export const selectUserState = createSelector(
    authModuleState, (state: AuthModuleState) => state.user
);


