import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MedecinsPartenaireDetailComponent } from './medecins-partenaire-detail.component';

describe('MedecinsPartenaireDetailComponent', () => {
  let component: MedecinsPartenaireDetailComponent;
  let fixture: ComponentFixture<MedecinsPartenaireDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinsPartenaireDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinsPartenaireDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
