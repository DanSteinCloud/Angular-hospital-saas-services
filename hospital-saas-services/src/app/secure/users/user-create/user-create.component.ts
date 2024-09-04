import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Role } from 'src/app/interfaces/role';
import { Router } from '@angular/router';
import {Response} from 'src/app/interfaces/response';
import { RoleService } from 'src/app/_services/role.service';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  @Input() form:FormGroup;
  roles: Role[]=[];

  constructor(private formBuilder:FormBuilder,
              private roleService:RoleService,
              private userService: UserService,
              private router:Router) { }

  ngOnInit(): void {

    this.form =this.formBuilder.group({
      first_name:new FormControl(),
      last_name:'',
      email: '',
      role_id:''
    });

    this.roleService.all().subscribe(
      (res:Response) =>{
        this.roles =res.data;
      }
    )
  }

  submit(){
    const data =this.form.getRawValue();
    // this.userService.create(data).subscribe(
    //   res=>{
    //     this.router.navigate(['/users']);
    //   }
    // )
  }

}
