import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-v4',
  templateUrl: './v4.component.html',
  styleUrls: ['./v4.component.scss']
})
export class V4Component implements OnInit {
  first: boolean = true
  second: boolean = false
  third: boolean = false

  constructor(public dialogRef: MatDialogRef<V4Component>) { }

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