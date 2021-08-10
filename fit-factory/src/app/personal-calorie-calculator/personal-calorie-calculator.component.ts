import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-personal-calorie-calculator',
  templateUrl: './personal-calorie-calculator.component.html',
  styleUrls: ['./personal-calorie-calculator.component.css','../animation.css']
})
export class PersonalCalorieCalculatorComponent implements OnInit {
  public favoriteSeason!: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  public activityLevels = [
    'Sedentary Life',
    '1 to 3 times a week',
    '3 to 5 times a week',
    '5 to 6/7 times a week',
  ]

  public workoutPurpose = [
    'Weight Loss',
    'Weight Gain',
    'Maintain'
  ]
  constructor() { }


  ngOnInit(): void {
  }

}
