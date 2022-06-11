import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MedecinsSearchComponent } from './medecins-search.component';

describe('MedecinsSearchComponent', () => {
  let component: MedecinsSearchComponent;
  let fixture: ComponentFixture<MedecinsSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
