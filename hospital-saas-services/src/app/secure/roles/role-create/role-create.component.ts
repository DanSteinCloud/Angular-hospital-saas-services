import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Role } from 'src/app/interfaces/role';
import { Router } from '@angular/router';
import {Response} from 'src/app/interfaces/response';
import { RoleService } from 'src/app/_services/role.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit {

  @Input() form:FormGroup;
  roles: Role[]=[];

  constructor(private formBuilder:FormBuilder,
              private roleService:RoleService,
              private router:Router) { }

  ngOnInit(): void {

    this.form =this.formBuilder.group({
      name:new FormControl()
    });

    this.roleService.all().subscribe(
      (res:Response) =>{
        console.log(res);
        this.roles =res.data;
      }
    );
  }

  submit(){
    const data =this.form.getRawValue();
    this.roleService.create(data).subscribe(
      ()=>{
        this.router.navigate(['/users']);
      }
    )
  }

}
