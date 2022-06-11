import { ComponentFixture, TestBed } from '@angular/core/testing';

import { V44Component } from './v44.component';

describe('V44Component', () => {
  let component: V44Component;
  let fixture: ComponentFixture<V44Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ V44Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(V44Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
