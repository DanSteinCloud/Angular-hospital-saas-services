import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-medecins-search',
  templateUrl: './medecins-search.component.html',
  styleUrls: ['./medecins-search.component.css']
})
export class MedecinsSearchComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  buildForm(): void {

    }

}
