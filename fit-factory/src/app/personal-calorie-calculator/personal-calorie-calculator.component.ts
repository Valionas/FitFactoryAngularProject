import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-personal-calorie-calculator',
  templateUrl: './personal-calorie-calculator.component.html',
  styleUrls: ['./personal-calorie-calculator.component.css', '../animation.css']
})
export class PersonalCalorieCalculatorComponent {
  public activityLevels = [
    { readValue: 'Sedentary Life', calculateValue: '1' },
    { readValue: '1 to 3 times a week', calculateValue: '2' },
    { readValue: '3 to 5 times a week', calculateValue: '3' },
    { readValue: '5 to 6/7 times a week', calculateValue: '4' },
  ]

  public workoutPurpose = [
    'Weight Loss',
    'Weight Gain',
    'Maintain'
  ]

  calculateCalories(gender: string, age: number, height: number, weight: number, activity: string, purpose: string, isValid: boolean) { 
    var bmr = 1;
    if (isValid) {
      if (gender == "male") {
        bmr = 500 + 9.6 * weight + 1.8 * height - 4.7 * age;     
      } else {
        bmr = 66 + 12.7 * weight + 5 * height - 6.8 * age;
      }
      switch(activity){
        case "1":
          bmr*=1.2;
          break;
        case '2':
          bmr*=1.37;
          break;
        case '3':
          bmr*=1.55;
          break;
        case '4':
          bmr*=1.73
          break;
      }
      switch(purpose){
        case "Weight Loss":
          bmr-=300;
          break;
        case "Weight Gain":
          bmr+=300;
          break;
      }
      Swal.fire('After some calculations and specifications ...  ', `Your daily calorie intake must be approximately ${bmr.toFixed(2)}.`, 'success')
    } else {
      Swal.fire("Ooops", `Be sure to insert all data correctly!`, 'error')
    }
  }
}
