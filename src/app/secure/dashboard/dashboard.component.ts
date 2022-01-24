import { Component, OnInit } from '@angular/core';
import { ModulesService } from 'src/app/_services/modules.service';
import { Router } from '@angular/router';
import { ResponseModule, ResponseAll } from 'src/app/interfaces/ResponseModule';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  token:any;
  data:any;
  res: any = [ ];
  roles: any = [ ];
  role_id:number;
  roleConcat:any;
  privilegeConcat:any;
  idPrivileges:any=[];
  prenatal: boolean;

  constructor(private moduleService: ModulesService,
      private router: Router) {
        this.role_id=Number(localStorage.getItem('infos'));
      }

  ngOnInit() {
    this.prenatal=true;
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



}
