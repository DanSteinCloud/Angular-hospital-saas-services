import { ComponentFixture, TestBed } from '@angular/core/testing';

import { V22Component } from './v22.component';

describe('V22Component', () => {
  let component: V22Component;
  let fixture: ComponentFixture<V22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ V22Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(V22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
