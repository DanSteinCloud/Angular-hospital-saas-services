import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-v44',
  templateUrl: './v44.component.html',
  styleUrls: ['./v44.component.scss']
})
export class V44Component implements OnInit {
  first: boolean = true
  second: boolean = false
  third: boolean = false

  constructor(public dialogRef: MatDialogRef<V44Component>) { }

  ngOnInit(): void {
  }
  moveToFirst(){
    this.first = true
    this.second = false
    this.third = false
  }
  moveToSecond(){
    this.first = false
    this.second = true
    this.third = false
  }
  moveToThird(){
    this.first = false
    this.second = false
    this.third = true
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
