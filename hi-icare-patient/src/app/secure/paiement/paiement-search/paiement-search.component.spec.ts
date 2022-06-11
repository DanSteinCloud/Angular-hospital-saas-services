import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaiementSearchComponent } from './paiement-search.component';

describe('PaiementSearchComponent', () => {
  let component: PaiementSearchComponent;
  let fixture: ComponentFixture<PaiementSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaiementSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
