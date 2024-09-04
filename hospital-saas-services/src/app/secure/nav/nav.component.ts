import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { Auth } from 'src/app/classes/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  //@Input('user')
  //user:User = null;
  test:any;
  constructor(private router: Router) {
    this.test="merci";
  }

  ngOnInit() {
    if (localStorage.getItem('token')==null)
        {
          localStorage.removeItem('token');
          localStorage.removeItem('X_HI_CODE');
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        }

    // Auth.userEmitter.subscribe(
    //   (user:User)=>{
    //     this.user = user;
    //   }
    // );
  }

    //lire un localstorage
    public readLocalStorageValue(key)
    {
      let value =   localStorage.getItem(key);
      if(value == undefined)
        {
          value =='';
        }
       return value;
    }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
