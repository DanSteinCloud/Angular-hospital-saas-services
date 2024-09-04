import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Auth } from '../classes/auth';
import {Response} from 'src/app/interfaces/response';
import { AuthenticationService, UserService } from '../_services';
import { UserInfos } from '../_models/userInfos';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {
 user:User;

  constructor(public authService:AuthenticationService,public userService:UserService,
    private router: Router) { }

  ngOnInit() {

     if (localStorage.getItem('token')==null){
      localStorage.clear();
      this.router.navigate(['/login']);
    }
    else{
      let userId=JSON.parse(localStorage.getItem('currentUser')).result.userId;
      if (userId!=null){
        this.userService.getUserInfos(userId).subscribe((res:UserInfos)=>{
          if (res['code']===200){
            this.userService.loggedInUser =res['result'];

          }
        });
    }


    }

  }

  getUserInfos(id){
    this.userService.getUserInfos(id).subscribe((res:any)=>{
      if (res.code==200){
        localStorage.setItem('userInfos',res.result);
        //this.authService.loggedInUser=res.result;

      }

    });
  }

}
