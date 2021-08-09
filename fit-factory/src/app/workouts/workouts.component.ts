import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CRUDService } from '../services/crud-service';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgForm } from '@angular/forms';
interface WorkoutLevels {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css', '../animation.css']
})
export class WorkoutsComponent implements OnInit {


  public currentUser = localStorage.getItem('userID');
  public workoutsList: any[] = [];
  constructor(private workoutService: CRUDService, private fireAuth: FirebaseAuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts(): void {
    this.workoutService.getItems('workouts').subscribe((res) => {
      this.workoutsList = [];
      res.map((diet) => {
        this.workoutsList.push({ id: diet.payload.doc.id, data: diet.payload.doc.data() });
      })
    })
  }

  deleteWorkout(workoutId: string): void {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'Keep in mind you might need this workout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your training plan has been deleted.',
          'success'
        )
        this.workoutService.deleteItem('workouts', workoutId).then();
      }
    })
  }

  openWorkoutDialog() {
    const dialogRef = this.dialog.open(AddWorkoutDialog, {
      autoFocus: false,
      maxHeight: '90vh'
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire('Success!', 'Your training plan is set and ready to use!', 'success');
        this.workoutService.addItem('workouts', result).then();
      }
    });

  }

  editWorkoutDialog(workoutId:string){
    var workout = this.workoutsList.find(x => x.id == workoutId);  
    const dialogRef = this.dialog.open(AddWorkoutDialog, {
      autoFocus: false,
      maxHeight: '90vh',
      data: workout,
    });

    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire('Success!', 'You have successfully updated your workout plan!', 'success');
        this.workoutService.updateItem('workouts',result,workoutId).then();
      }
    });
  
  }
}


@Component({
  selector: 'workout-content-example-dialog',
  templateUrl: 'dialogs/workout-dialog.html',
  styleUrls: ['./workouts.component.css', '../animation.css','dialogs/workout-dialog.css']
})
export class AddWorkoutDialog {
  @ViewChild('workoutForm') workoutForm!: NgForm;
  public currentUser = localStorage.getItem('userID');
  public mondayExercises: any[] = [];
  public tuesdayExercises: any[] = [];
  public wednesdayExercises: any[] = [];
  public thursdayExercises: any[] = [];
  public fridayExercises: any[] = [];
  public saturdayExercises: any[] = [];
  public sundayExercises: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    if (this.data) {
      let workout = this.data.data;
      setTimeout(() => {
        this.workoutForm.controls["title"].setValue(workout.title);
        this.workoutForm.controls["description"].setValue(workout.description);
        this.workoutForm.controls["level"].setValue(workout.level);
        this.mondayExercises = workout.monday;
        this.tuesdayExercises = workout.tuesday;
        this.wednesdayExercises = workout.wednesday;
        this.thursdayExercises = workout.thursday;
        this.fridayExercises = workout.friday;
        this.saturdayExercises = workout.saturday;
        this.sundayExercises = workout.sunday;
      });
    }
  }

  addItem(category: string, item: string) {
    if (item !== "" && item !== undefined) {
      switch (category) {
        case "monday":
          this.mondayExercises.push(item);
          break;
        case "tuesday":
          this.tuesdayExercises.push(item);
          break;
        case "wednesday":
          this.wednesdayExercises.push(item);
          break;
        case "thursday":
          this.thursdayExercises.push(item);
          break;
        case "friday":
          this.fridayExercises.push(item);
          break;
        case "saturday":
          this.saturdayExercises.push(item);
          break;
        case "sunday":
          this.sundayExercises.push(item);
          break;
        default:
          break;
      }
    } else {
      Swal.fire({
        title: "You forgot your exercise's name",
        text: "You won't be able to train an exercise without knowing it!",
        icon: 'warning',
        confirmButtonText: 'Understood!'
      })
    }
  }

  public workoutLevels: WorkoutLevels[] = [
    { value: 'Beginner', viewValue: 'Rookie (Beginner)' },
    { value: 'Medium', viewValue: 'Fit-Cadet (Medium)' },
    { value: 'Intermediate', viewValue: 'Fit-Commander (Intermediate)' }
  ];

  public workoutPurpose = [
    'Strength',
    'Gain weight',
    'Lose Weight',
    'Cardiovascular',
    'Endurance',
    'Competition'
  ]
  sendObj(title: string, description: string, level: string, purpose:string) {
    return ({
      title,
      description,
      level,
      purpose,
      monday:this.mondayExercises,
      tuesday:this.tuesdayExercises,
      wednesday:this.wednesdayExercises,
      thursday:this.thursdayExercises,
      friday:this.fridayExercises,
      saturday:this.saturdayExercises,
      sunday:this.sundayExercises,
      createdBy: this.currentUser,
    })
  }
}

