import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
//import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss','./../public.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input()  form:FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {

    this.form =this.formBuilder.group({
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      password_confirm:'',
      role_id:1
    });

    // this.formBuilder.group(controlsConfig:{

    // });
    // this.formBuilder.group(new FormGroup({
    //   first_name:'',
    //   last_name:'',
    //   email:'',
    //   password:'',
    //   password_confirm:''
    // }));
  }

  submit(){
    const data=this.form.getRawValue();
    // this.authService.register(data).subscribe(
    //   res=>{
    //     console.log(res);
    //   }
    // )
  }

}
