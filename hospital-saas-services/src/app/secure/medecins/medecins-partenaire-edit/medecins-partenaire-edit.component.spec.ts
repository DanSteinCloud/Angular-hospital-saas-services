import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MedecinsPartenaireEditComponent } from './medecins-partenaire-edit.component';

describe('MedecinsPartenaireEditComponent', () => {
  let component: MedecinsPartenaireEditComponent;
  let fixture: ComponentFixture<MedecinsPartenaireEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinsPartenaireEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinsPartenaireEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
