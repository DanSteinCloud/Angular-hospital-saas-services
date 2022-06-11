import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { CurrrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { AuthService } from "../../services/auth.service";
import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register.actions";
@Injectable()
export  class registerEffect {
    register$ = createEffect(() => this.actions$.pipe(
        ofType(registerAction), 
        switchMap(({request}) => {
            return this.authService.register(request).pipe(
                map((currentUser: CurrrentUserInterface) => {
                    return registerSuccessAction({currentUser})
               }),
        catchError(() => {
            return of(registerFailureAction())
        })
            )
        })
    ))
    constructor(private actions$: Actions, private authService: AuthService){}   
}