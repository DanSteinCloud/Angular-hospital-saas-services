import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Role } from 'src/app/interfaces/role';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import {Response} from 'src/app/interfaces/response';
import { RoleService } from 'src/app/_services/role.service';
import { UserService } from 'src/app/_services';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @Input() form:FormGroup;
  roles: Role[]=[];
  user:User;
  constructor(private formBuilder:FormBuilder,
              private roleService:RoleService,
              private userService: UserService,
              private router:Router,
              private route:ActivatedRoute) { }

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
    );

    this.route.params.subscribe(
      params=>{
        // this.userService.get(params.id).subscribe(
        //   (res:Response)=>{
        //     this.user =res.data;
        //     this.form.patchValue({
        //       first_name:this.user.first_name,
        //       last_name:this.user.last_name,
        //       email: this.user.email,
        //       role_id:this.user.role.id
        //     });
        //   }
        // )
      }
    );
  }

  submit(){
    const data =this.form.getRawValue();
    // this.userService.update(this.user.id,data).subscribe(
    //   res=>{
    //     this.router.navigate(['/users']);
    //   }
    // )
  }

}
