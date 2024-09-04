import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaiementHospitalisationComponent } from './paiement-hospitalisation.component';

describe('PaiementHospitalisationComponent', () => {
  let component: PaiementHospitalisationComponent;
  let fixture: ComponentFixture<PaiementHospitalisationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaiementHospitalisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementHospitalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
