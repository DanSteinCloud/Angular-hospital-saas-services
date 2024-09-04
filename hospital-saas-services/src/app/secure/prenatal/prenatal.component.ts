import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ModalConfig } from 'src/app/classes/modal.config';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prenatal',
  templateUrl: './prenatal.component.html',
  styleUrls: ['./prenatal.component.css']
})
export class PrenatalComponent implements OnInit {
  prenatal: boolean;
  submitted: boolean;
  rMessage: string;
  addForm: FormGroup;
  closeResult: string;
  patient: boolean;
  createprenatal: boolean;

  constructor(private router: Router,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.patient=true;

    if (localStorage.getItem("token") == null) {
      localStorage.removeItem("token");
      localStorage.removeItem("X_HI_CODE");
      localStorage.removeItem("currentUser");
      this.router.navigate(["/login"]);
    }

  }
  resetForm() {
    this.submitted = false;
    this.rMessage = "";
    this.addForm.reset();
  }

  onSubmitPrenatal(){
    alert("iciiiii");
  }

}
