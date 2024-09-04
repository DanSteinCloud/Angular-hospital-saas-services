import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';
import { of } from 'rxjs';
import { delay, first } from 'rxjs/operators';
import { ModulesService } from 'src/app/_services/modules.service';
import { ResponseModule, ResponseAll } from 'src/app/interfaces/ResponseModule';

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

  token:any;
  data:any;
  res: any = [ ];
  roles: any = [ ];
  role_id:number;
  roleConcat:any;
  privilegeConcat:any;
  idPrivileges:any=[];

  constructor(
    private moduleService: ModulesService,
    private formBuilder:FormBuilder,
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
                  this.role_id=Number(localStorage.getItem('infos'));

                  // DEBUT DES TRAITEMENTS
                  if (localStorage.getItem('token')!==null)
                  {
                    this.roles=JSON.parse(localStorage.getItem('infos'));
                    if (this.roles!=null)
                    {
                      this.roleConcat ="";
                      this.privilegeConcat ="";
          
                      for(var i = 0;i<this.roles.length;i++)
                      {
                        if (i===0) this.roleConcat ="roleId="+this.roles[i];
                        else if (i==this.roles.length) this.roleConcat ="&roleId="+this.roles[i];
                        else this.roleConcat +="&roleId="+this.roles[i]+"";
          
          
                        this.moduleService.getRolesByRoleId(this.roles[i]).subscribe((data:ResponseAll) => {
                          if (data.code===200)
                          {
                            for(var i = 0;i<data.result.privileges.length;i++)
                            {
                              if (i===0) this.privilegeConcat ="privilegeId="+data.result.privileges[i];
                              else if (i==data.result.privileges.length) this.privilegeConcat ="&privilegeId="+data.result.privileges[i];
                              else this.privilegeConcat +="&privilegeId="+data.result.privileges[i]+"";
                            }
          
                            this.moduleService.getPrivilegeFromRole(this.privilegeConcat).subscribe((data:ResponseAll) => {
                              if (data.code===200)
                              {
                                localStorage.setItem('aaaa',JSON.stringify(data.result));
          
                              }
                            });
          
                          }
                        });
                      }
          
          
                    }
          
                    try{
          
                      this.moduleService.getAllModule(this.roleConcat).subscribe((data:ResponseModule) => {
                        if (data.code===200){
                          console.log( " medecin :"+JSON.stringify(data.result) )
                          for (var v in data.result){
                              switch(data.result[v]){
                                case "MODULE_AMBULATORY_SVC":
                                  this.initialiserModule('module_ambulatoire');
                                  break;
                                case "MODULE_BILLING":
                                  this.initialiserModule('module_facture');
                                  break;
                                case "MODULE_INPATIENT_SVC":
                                    this.initialiserModule('module_non_patient');
                                    break;
                                case "MODULE_PREGNANCY":
                                      this.initialiserModule('module_patient_prenatal');
                                      break;    
                                case "MODULE_PATIENT_REG":
                                  this.initialiserModule('module_patient');
                                  break;
                                case "MODULE_ROOM_MGMT":
                                  this.initialiserModule('module_chambre');
                                  break;
                              }
                          }
                        }
                      });
                    }
                    catch(error){
                      console.error('Here is the error message', error);
                      this.router.navigate(['/login']);
                    }
                  }
                   // FIN DES TRAITEMENTS




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
//Initialiser les modules (desactiver par défaut)
reinitializeModule(){
  localStorage.setItem('module_ambulatoire','0');
  localStorage.setItem('module_facture','0');
  localStorage.setItem('module_non_patient','0');
  localStorage.setItem('module_patient','0');
  localStorage.setItem('module_chambre','0');
}

//setLocalStorange
initialiserModule(name){
  localStorage.setItem(name,'1');
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
