import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrestationAmbulatoireComponent } from './prestation-ambulatoire.component';

describe('PrestationAmbulatoireComponent', () => {
  let component: PrestationAmbulatoireComponent;
  let fixture: ComponentFixture<PrestationAmbulatoireComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestationAmbulatoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestationAmbulatoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
