import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MedecinsPartenaireAddComponent } from './medecins-partenaire-add.component';

describe('MedecinsPartenaireAddComponent', () => {
  let component: MedecinsPartenaireAddComponent;
  let fixture: ComponentFixture<MedecinsPartenaireAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinsPartenaireAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinsPartenaireAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
