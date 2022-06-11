import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/interfaces/role';
import {Response} from 'src/app/interfaces/response';
import { RoleService } from 'src/app/_services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles: Role[]=[];
  currentPage =1;
  lastPage:number;

  constructor(private roleService:RoleService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.roleService.all().subscribe(
      (res:Response) =>{
        console.log(res.data);
        this.roles =res.data;
      }
    );
  }

  prev(){
    if (this.currentPage ===1) return;
    this.currentPage --;
    this.refresh();
  }

  next(){
    if (this.currentPage === this.lastPage) return;
    this.currentPage ++;
    this.refresh();
  }

  delete(id:number){
    if (confirm('Are you sure?')){
      this.roleService.delete(id).subscribe(
        res =>{
          this.roles = this.roles.filter(u=> u.id!==id);
        }
      );
    }

  }

  edit(id:number,data){

  }

}
