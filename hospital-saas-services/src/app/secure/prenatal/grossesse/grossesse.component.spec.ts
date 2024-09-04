import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrossesseComponent } from './grossesse.component';

describe('GrossesseComponent', () => {
  let component: GrossesseComponent;
  let fixture: ComponentFixture<GrossesseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrossesseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrossesseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
