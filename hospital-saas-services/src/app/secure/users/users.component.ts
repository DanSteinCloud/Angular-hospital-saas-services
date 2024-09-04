import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import {Response} from 'src/app/interfaces/response';
import { UserService } from 'src/app/_services';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users:User[];
  currentPage =1;
  lastPage:number;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.refresh();
  }

  prev(){
    if (this.currentPage ===1) return;
    this.currentPage --;
    this.refresh();
  }

  next(){
    if (this.currentPage === this.lastPage) return
    this.currentPage ++;
    this.refresh();
  }

  refresh(){
    // this.userService.all(this.currentPage).subscribe(
    //   (res:Response)=>{
    //     this.users =res.data;
    //     this.lastPage =res.meta.last_page;
    //   }
    // );
  }

  delete(id:number){
    if (confirm('Are you sure?')){
      // this.userService.delete(id).subscribe(
      //   res =>{
      //     this.users = this.users.filter(u=> u.id!==id);
      //   }
      // );
    }

  }

  edit(user:User){

  }

}
