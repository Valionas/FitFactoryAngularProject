import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-personal-calorie-calculator',
  templateUrl: './personal-calorie-calculator.component.html',
  styleUrls: ['./personal-calorie-calculator.component.css','../animation.css']
})
export class PersonalCalorieCalculatorComponent  {
  public activityLevels = [
    {readValue:'Sedentary Life', calculateValue:1},
    {readValue:'1 to 3 times a week', calculateValue:2},
    {readValue:'3 to 5 times a week', calculateValue:3},
    {readValue:'5 to 6/7 times a week', calculateValue:4},
  ]

  public workoutPurpose = [
    'Weight Loss',
    'Weight Gain',
    'Maintain'
  ]
  
  calculateCalories(age:number,height:number,weight:number,activity:string,purpose:string,isValid:boolean){
    if(isValid){
      Swal.fire('Well done','This works','success')
    }else{
      Swal.fire("Ooops",'Be sure to insert all data correctly','error')
    }
  }
}
