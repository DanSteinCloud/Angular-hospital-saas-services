import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchHospitalisationComponent } from './search-hospitalisation.component';

describe('SearchHospitalisationComponent', () => {
  let component: SearchHospitalisationComponent;
  let fixture: ComponentFixture<SearchHospitalisationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHospitalisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHospitalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
