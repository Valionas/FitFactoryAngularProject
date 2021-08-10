import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTypesComponent } from './workout-types.component';

describe('WorkoutTypesComponent', () => {
  let component: WorkoutTypesComponent;
  let fixture: ComponentFixture<WorkoutTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
