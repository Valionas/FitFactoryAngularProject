import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacronutrientsComponent } from './macronutrients.component';

describe('MacronutrientsComponent', () => {
  let component: MacronutrientsComponent;
  let fixture: ComponentFixture<MacronutrientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacronutrientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacronutrientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
