import { ComponentFixture, TestBed } from '@angular/core/testing';

import { V33Component } from './v33.component';

describe('V33Component', () => {
  let component: V33Component;
  let fixture: ComponentFixture<V33Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ V33Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(V33Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
