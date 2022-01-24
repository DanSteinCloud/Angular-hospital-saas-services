import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../../../_services/patient.service'

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css']
})
export class PatientSearchComponent implements OnInit {
  form: FormGroup;
  levels = [
    "Beginner",
    "Expert",
  ];

  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  @Output() SearchFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() ResetFormSearch: EventEmitter<any> = new EventEmitter<any>();
searchText = '';
  searchForm: FormGroup;
  submitted: boolean;
constructor(private fb: FormBuilder,
            private patientService: PatientService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      rpatientIdentifier: new FormControl(),
      //new FormControl('', Validators.required),
      //sex: new FormControl(),
      rfirstName: new FormControl(),
      //new FormControl('', Validators.required),
      rlastName: new FormControl(),
      rdoB: new FormControl(),
      rTelephone1: new FormControl(),
      raddress: new FormControl(),
      rsex: new FormControl(),
      rassurance: new FormControl(),
      rdateCreated: new FormControl(),
      // ville: new FormControl(),
      // rue: new FormControl(),
      // nationalite: new FormControl(),
    });
}

get f(){
  return this.searchForm.controls;
}

filterSearch(){
  //console.log(JSON.stringify(this.searchForm.value));
  this.SearchFilter.emit(this.searchForm);
}

onSubmit() {
  this.submitted = true;
  // if (this.searchForm.invalid) {
  //     return;
  // }
  this.SearchFilter.emit(this.searchForm.value);

}

search(filters:any){
  // console.log('---filter-----');
  // console.log(filters);
  // console.log('---fin filter-----');
  // Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);


}
annuler(){
  this.submitted = false;
  this.searchForm.reset();
  this.ResetFormSearch.emit(this.submitted);
}



}
