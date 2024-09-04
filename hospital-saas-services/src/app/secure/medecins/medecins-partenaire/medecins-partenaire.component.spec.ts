import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MedecinsPartenaireComponent } from './medecins-partenaire.component';

describe('MedecinsPartenaireComponent', () => {
  let component: MedecinsPartenaireComponent;
  let fixture: ComponentFixture<MedecinsPartenaireComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinsPartenaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinsPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
