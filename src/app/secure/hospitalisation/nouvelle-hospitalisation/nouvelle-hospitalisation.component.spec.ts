import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NouvelleHospitalisationComponent } from './nouvelle-hospitalisation.component';

describe('NouvelleHospitalisationComponent', () => {
  let component: NouvelleHospitalisationComponent;
  let fixture: ComponentFixture<NouvelleHospitalisationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NouvelleHospitalisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleHospitalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
