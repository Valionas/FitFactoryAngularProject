import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCalorieCalculatorComponent } from './personal-calorie-calculator.component';

describe('PersonalCalorieCalculatorComponent', () => {
  let component: PersonalCalorieCalculatorComponent;
  let fixture: ComponentFixture<PersonalCalorieCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalCalorieCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCalorieCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
