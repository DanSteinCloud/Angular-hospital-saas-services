import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Auth } from 'src/app/classes/auth';
import { AuthenticationService, UserService } from 'src/app/_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  infoForm:FormGroup;
  passwordForm: FormGroup;

  constructor(public userService:UserService) { }

  ngOnInit() {


  }

  infoSubmit(){
    //
  }

  passwordSubmit(){

  }

}
