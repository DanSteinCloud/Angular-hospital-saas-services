import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrestationHospitalisationComponent } from './prestation-hospitalisation.component';

describe('PrestaionHospitalisationComponent', () => {
  let component: PrestationHospitalisationComponent;
  let fixture: ComponentFixture<PrestationHospitalisationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestationHospitalisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestationHospitalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
