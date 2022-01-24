import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchographieComponent } from './echographie.component';

describe('EchographieComponent', () => {
  let component: EchographieComponent;
  let fixture: ComponentFixture<EchographieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchographieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchographieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
