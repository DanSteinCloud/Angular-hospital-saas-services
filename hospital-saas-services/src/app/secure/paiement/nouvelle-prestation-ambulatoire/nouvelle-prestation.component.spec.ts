import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NouvellePrestationAmbulatoireComponent } from './nouvelle-prestation-ambulatoire.component';


describe('NouvellePrestationComponent', () => {
  let component: NouvellePrestationAmbulatoireComponent;
  let fixture: ComponentFixture<NouvellePrestationAmbulatoireComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NouvellePrestationAmbulatoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvellePrestationAmbulatoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
