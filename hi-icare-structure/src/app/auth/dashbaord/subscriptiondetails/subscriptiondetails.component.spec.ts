import { ComponentFixture, TestBed } from '@angular/core/testing';

import { subscriptiondetailsComponent } from './subscriptiondetails.component';

describe('DashboardComponent', () => {
  let component: subscriptiondetailsComponent;
  let fixture: ComponentFixture<subscriptiondetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ subscriptiondetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(subscriptiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
