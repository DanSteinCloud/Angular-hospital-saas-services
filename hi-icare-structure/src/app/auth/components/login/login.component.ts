import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { CurrrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { registerAction } from "src/app/auth/store/actions/register.actions";
import { isSubmittingSelector } from "../../store/selectors";
import { RegisterRequesrInterface } from "../../types/registerRequest.Interface";
import { LoginRequestInterface } from "../../types/loginRequest.Interface";
import { loginAction, loginSuccessAction } from "../../store/actions/login.actions";

@Component({
    selector: 'mc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form!: FormGroup
    isSubmitting$!: Observable<boolean>
    token!: Observable<string>
    X_HI_CODE!: Observable<string>
    roleId!: Observable<number>
    userId!: Observable<number>
    
    constructor(private fb: FormBuilder, private store: Store){}
    ngOnInit(): void {
      this.initializeForm()
      this.initializeValues()
    }
    initializeValues(): void {
      this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))

      console.log('isSubmitting$', this.isSubmitting$)
    }
    initializeForm(): void{
      console.log('initializeForm')
      this.form = this.fb.group({
          username:['', Validators.required],
          X_HI_CODE:['', Validators.required],
          password:['', Validators.required]
      })
    }
    onSubmit(): void {
      console.log('Submit', this.form.value, this.form.valid)
      const request: LoginRequestInterface = {
        user: this.form.value,

      }
      this.store.dispatch(loginAction({request}))
    }
}