import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { PatientService } from 'src/app/_services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent  implements OnInit  {
  loaddetails: boolean;
  patient: boolean;
  router: any;
  filteredPatients: any;
  oPatient: any;
  form: any;
  id: any;
  @Input() groupFilters: Object;
  @Input() searchByKeyword: string;
  users: any[] = [];
  filteredUsers: any[] = [];
  lstPrivileges:any;

  constructor(private patientService: PatientService,
              private ref: ChangeDetectorRef) { }

  ngOnInit(): void {

    //GetPriviliges
   // this.GetPriviligesPatient();
    this.lstPrivileges = JSON.parse(localStorage.get('aaaa'));
    //for (var i=0;i<this.lstPrivileges.length;i++)

    this.patientService.getAll().subscribe((data: any[]) => {
      this.filteredUsers = data['result'];
    });
  }


  // ngOnChanges(): void {
  //   if (this.groupFilters) {
  //     this.filteredPatientsList(this.groupFilters, this.filteredPatients);
  //   }
  // }
//   filteredPatientsList(filters: any,users: any): void {
//     this.filteredPatients = this.users; // Reset User List
//     const keys = Object.keys(filters);
//     console.log('----KEYS ZZZ----------');
//     console.log(this.filteredPatients);
//     const filterUser = (user) => {
//       let result = keys.map((key) => {
//         if (!~key.indexOf('doB')) {
//           if (user[key]) {
//             return String(user[key])
//               .toLowerCase()
//               .startsWith(String(filters[key]).toLowerCase());
//           } else {
//             return false;
//           }
//         }
//       });
//       // To Clean Array from undefined if the age is passed so the map will fill the gap with (undefined)
//       result = result.filter((it) => it !== undefined);

//       return result.reduce((acc, cur: any) => {
//         return acc & cur;
//       }, 1);
//     };

//     console.log(filterUser);
//     this.filteredPatients = this.users.filter(filterUser);
//   }
//   loadPatients(): void {
//      this.patientService.getAll().subscribe((data: any[]) => {
//        this.filteredUsers = data['result'];
//      });

//      //this.filteredPatients = this.users;
//      //this.filteredUsers.length > 0 ? this.filteredUsers : this.users;
//      console.log("------console.log------------");
//      console.log(JSON.stringify(this.filteredPatients));
//      console.log("------fin console.log------------");
//  }

  // mPatientDetails(id: number) {
  //   this.loaddetails = true;
  //   this.patient = false;
  //   this.router.navigate(['patient-detail', { queryParams: { id: id } }]);
  // }
  // deletePost(id, fullname) {
  //   if (confirm('Etes vous sur de vouloir supprimer la patient: ' + fullname)) {
  //     this.patientService.delete(id).subscribe((res) => {
  //       this.filteredPatients = this.filteredPatients.filter(
  //         (item) => item.id !== id
  //       );
  //     });
  //   }
  // }

  // modifierPatient(idPatient) {
  //   this.patientService.find(idPatient).subscribe((data: any) => {
  //     this.oPatient = data.result;
  //     console.log(JSON.stringify(this.oPatient));
  //     this.form.setValue({
  //       mpatientIdentifier: this.oPatient.patientIdentifier,
  //       msex: this.oPatient.sex,
  //       mfirstName: this.oPatient.firstName,
  //       mlastName: this.oPatient.lastName,
  //       mdoB: new Date(this.oPatient.doB).toDateString(),
  //       mTelephone1: this.oPatient.phones[0].phone,
  //       mTelephone2: this.oPatient.phones[1].phone,
  //       maddress: this.oPatient.addresses[0].address,
  //       mpays: this.oPatient.addresses[0].country,
  //       mregion: this.oPatient.addresses[0].state,
  //       mville: this.oPatient.addresses[0].city,
  //       mrue: this.oPatient.addresses[0].street,
  //       mnationalite: this.oPatient.addresses[0].country,
  //     });
  //   });
  //   this.id = idPatient;

    // this.form.patchValue({
    //   //mpatientIdentifier:this.oPatient.
    //   mfirstName: this.oPatient.firstName,
    //   mlastName: this.oPatient.lastName

    // });
  //}

}
