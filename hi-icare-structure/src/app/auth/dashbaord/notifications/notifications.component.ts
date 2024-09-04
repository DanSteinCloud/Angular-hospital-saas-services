import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  showFiller = false;
  mainShow = false;
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  info1: boolean = true
  info2: boolean = false
  info3: boolean = false

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  
  displayInfo1(){
    this.info1 = true
    this.info2 = false
    this.info3 = false
  }
  displayInfo2(){
    this.info1 = false
    this.info2 = true
    this.info3 = false
  }
  displayInfo3(){
    this.info1 = false
    this.info2 = false
    this.info3 = true
  }
}
