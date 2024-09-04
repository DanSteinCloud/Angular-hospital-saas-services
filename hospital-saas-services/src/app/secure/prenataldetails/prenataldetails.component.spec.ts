import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenataldetailsComponent } from './prenataldetails.component';

describe('PrenataldetailsComponent', () => {
  let component: PrenataldetailsComponent;
  let fixture: ComponentFixture<PrenataldetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrenataldetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenataldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
