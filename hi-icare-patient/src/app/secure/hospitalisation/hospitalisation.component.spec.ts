import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HospitalisationComponent } from './hospitalisation.component';

describe('HospitalisationComponent', () => {
  let component: HospitalisationComponent;
  let fixture: ComponentFixture<HospitalisationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
