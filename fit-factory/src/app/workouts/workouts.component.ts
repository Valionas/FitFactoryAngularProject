// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-workouts',
//   templateUrl: './workouts.component.html',
//   styleUrls: ['./workouts.component.css','../animation.css']
// })
// export class WorkoutsComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../services/crud-service';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
interface DietLevels {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css','../animation.css']
})
export class WorkoutsComponent implements OnInit {


  public currentUser = localStorage.getItem('userID');
  public workoutsList: any[] = [];
  constructor(private workoutService: CRUDService, private fireAuth: FirebaseAuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDiets();
  }

  getDiets(): void {
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
      if(result){
        Swal.fire('Success!','Your diet has been created','success');
        console.log(result.value);     
      }
    });

  }
}

@Component({
  selector: 'workout-content-example-dialog',
  templateUrl: 'dialogs/workout-dialog.html',
  styleUrls: ['./workouts.component.css', '../animation.css']
})
export class AddWorkoutDialog {
  public dietLevels: DietLevels[] = [
    {value: 'Beginner', viewValue: 'Rookie'},
    {value: 'Medium', viewValue: 'Fit-Cadet'},
    {value: 'Intermediate', viewValue: 'Fit-Commander'}
  ];

}

