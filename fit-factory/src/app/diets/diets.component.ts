import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CRUDService } from '../services/crud-service';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgForm } from '@angular/forms';
interface DietLevels {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.css', '../animation.css']
})
export class DietsComponent implements OnInit {


  public currentUser = localStorage.getItem('userID');
  public dietsList: any[] = [];
  constructor(private dietService: CRUDService, private fireAuth: FirebaseAuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDiets();
  }

  getDiets(): void {
    this.dietService.getItems('diets').subscribe((res) => {
      this.dietsList = [];
      res.map((diet) => {
        this.dietsList.push({ id: diet.payload.doc.id, data: diet.payload.doc.data() });
      })
    })
  }

  deleteDiet(dietId: string): void {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this diet!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your diet has been deleted.',
          'success'
        )
        this.dietService.deleteItem('diets', dietId).then();
      }
    })
  }

  openDietDialog() {
    const dialogRef = this.dialog.open(AddDietDialog, {
      autoFocus: false,
      maxHeight: '90vh'
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire('Success!', 'Your diet has been created', 'success');
        this.dietService.addItem('diets',result).then();
      }
    });

  }

  editDietDialog(dietId:string){
    var diet = this.dietsList.find(x => x.id == dietId);  
    const dialogRef = this.dialog.open(AddDietDialog, {
      autoFocus: false,
      maxHeight: '90vh',
      data: diet,
    });

    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire('Success!', 'Your diet has been updated!', 'success');
        this.dietService.updateItem('diets',result,dietId).then();
      }
    });
  
  }
}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialogs/diet-dialog.html',
  styleUrls: ['./diets.component.css', '../animation.css', 'dialogs/diet-dialog.css']
})
export class AddDietDialog {
  @ViewChild('dietForm') dietForm!: NgForm;
  public currentUser = localStorage.getItem('userID');
  public breakfastMeals: any[] = [];
  public lunchMeals: any[] = [];
  public dinnerMeals: any[] = [];
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(){
    if(this.data){ 
      let dietInfo = this.data.data;
      setTimeout(() => { 
        this.dietForm.controls["title"].setValue(dietInfo.title);
        this.dietForm.controls["duration"].setValue(dietInfo.duration);
        this.dietForm.controls["description"].setValue(dietInfo.description);
        this.dietForm.controls["level"].setValue(dietInfo.level);
        this.breakfastMeals = dietInfo.breakfast;
        this.lunchMeals = dietInfo.lunch;
        this.dinnerMeals = dietInfo.dinner;    
      });
    }
  }

  addItem(category: string, item: string) {
    if (item !== "" && item !== undefined) {
      switch (category) {
        case "breakfast":
          this.breakfastMeals.push(item);
          break;
        case "lunch":
          this.lunchMeals.push(item);
          break;
        case "dinner":
          this.dinnerMeals.push(item);
          break;
        default:
          break;
      }
    } else {
      Swal.fire({
        title: "Be sure to insert your meal",
        text: "You won't be able to add your meal without writing it down",
        icon: 'warning',
        confirmButtonText: 'Understood!'
      })
    }
  }

  public dietLevels: DietLevels[] = [
    { value: 'Beginner', viewValue: 'Rookie' },
    { value: 'Medium', viewValue: 'Fit-Cadet' },
    { value: 'Intermediate', viewValue: 'Fit-Commander' }
  ];

  sendObj(title: string, description: string, level: string, duration:string) {
    return ({
      title,
      description,
      level,
      duration,
      breakfast: this.breakfastMeals,
      lunch: this.lunchMeals,
      dinner: this.dinnerMeals,
      createdBy: this.currentUser,
    })
  }
}
