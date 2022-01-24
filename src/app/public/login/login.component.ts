import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';
import { of } from 'rxjs';
import { delay, first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','./../public.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  rMessage: string;
  public isLoading = false;

  constructor(private formBuilder:FormBuilder,
    public authService:AuthenticationService,private router: Router) { }

  ngOnInit() {
    this.removeAllLocalStorage();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      X_HI_CODE: ['',Validators.required],
      password: ['', Validators.required]
  });
  }
  get f() { return this.loginForm.controls; }

  onSubmit(){
    const data =this.loginForm.getRawValue();
    this.submitted = true;
    localStorage.setItem('X_HI_CODE',data.X_HI_CODE);
    this.loading = true;
    this.isLoading = true;
    of(null)
      .pipe(
        delay(2000),
        first()
      )
      .subscribe(() => {

        this.isLoading = false;
        this.authService.login(data).subscribe(
            (res:any)=>{
              if (res.code==200){
                  localStorage.setItem('token',res.result.token);
                  localStorage.setItem("infos", JSON.stringify(res.result.roleIds));
                  localStorage.setItem("prsl", res.result.userId);
                  //this.getUserInfos(res.result.userId);
                  this.router.navigate(['/dashboard']);

              }

              this.rMessage = '';

            },
              error => {
                  this.rMessage = 'bError';
                  this.loading = false;
              }
          );
      });


  }


  logout(){

    this.removeAllLocalStorage();
    this.authService.logout();
    this.router.navigate(['/']);
  }

  private removeAllLocalStorage() {
    return Object.keys(localStorage)
        .reduce((obj, k) => {
              return { ...obj, [k]: localStorage.removeItem(k)}}, {});
  }



}
