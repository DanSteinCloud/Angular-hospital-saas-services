import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaiementListePrestationComponent } from './paiement-liste-prestation.component';

describe('PaiementListePrestationComponent', () => {
  let component: PaiementListePrestationComponent;
  let fixture: ComponentFixture<PaiementListePrestationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaiementListePrestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementListePrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
