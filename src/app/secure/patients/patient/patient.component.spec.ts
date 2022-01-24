import { ComponentFixture, TestBed, waitForAsync, fakeAsync } from '@angular/core/testing';

import { PatientComponent } from './patient.component';
import { Component, Input } from '@angular/core';
import { patient } from 'src/app/_models/patient';
import { PatientService } from 'src/app/_services/patient.service';
import { of } from 'rxjs';

describe('PatientComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;
  let mockPtientService;
  let CITY;
  @Component({
    selector: 'app-hero',
    template: '<div></div>'
})
class FakePatientComponent {
    @Input() patient: patient;
}
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockPtientService = jasmine.createSpyObj(['getPatient', 'addPatient', 'deletePatient','updatePatient','getCity']);
    CITY = [
      { id: 1, name: 'DAKAR'},
      { id: 2, name: 'THIES'},
      { id: 3, name: 'MBOUR'},
      { id: 4, name: 'KOLDA'}
    ]
    TestBed.configureTestingModule({
      declarations: [PatientComponent,
          FakePatientComponent
      ],
      providers: [
          { provide: PatientService, useValue: mockPtientService }
      ]
  })
    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create patient component ', () => {
    expect(component).toBeTruthy();
  });

  it('should get city correctly from the service', () => {
    mockPtientService.get.and.returnValue(of(CITY));
    fixture.detectChanges();
    expect(fixture.componentInstance.AllCity.length).toBe(111)
  });



//   it('should show book info', fakeAsync(() => {

//     const fixture = TestBed.createComponent(PatientComponent);
//     const component = fixture.componentInstance;
//     const debugElement = fixture.debugElement;

//     component.AllCity = new Array(
//       {id: '1',name: 'DAKAR'},
//       {id: '2',name: 'THIES'},
//       {id: '3',name: 'MBOUR'},
//       );

//     fixture.detectChanges();

//     expect(debugElement.nativeElement.querySelector('h1').textContent)
//         .toEqual('eXtreme Programming Explained');

// }));
});
