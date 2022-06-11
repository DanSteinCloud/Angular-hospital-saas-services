import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CurrrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { AuthService } from "../../services/auth.service";
import { loginAction, loginFailureAction, loginSuccessAction } from "../actions/login.actions";
import { roleIdSelector } from 'src/app/auth/store/selectors';

@Injectable()
export  class loginEffect implements OnInit {
    roleIds!: [number];

    constructor(private actions$: Actions, private authService: AuthService, private router: Router, private store: Store){}
    ngOnInit(): void {
        this.initializeValues()
    }
    initializeValues() {
        this.store
        .pipe(select(roleIdSelector), map((roleId) => roleId))
        .subscribe(value => this.roleIds = value);
    }

    login$ = createEffect(() => this.actions$.pipe(
        ofType(loginAction), 
        switchMap(({request}) => {
            console.log(request); return this.authService.login(request)
         .pipe(
                map((currentUser: CurrrentUserInterface) => {
                   console.log(currentUser); 
                   this.roleIds == currentUser.result.roleIds; 
                   return loginSuccessAction({currentUser}) 
               }),
               tap(() => (request.user.username == 'hi-admin') ? this.router.navigate(['dashboard']) : this.router.navigate(['login']) ),
        catchError(() => {
            return of(loginFailureAction())
        })
            )
        })

    ))

    
}