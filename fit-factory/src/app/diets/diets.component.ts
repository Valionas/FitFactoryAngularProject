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
        this.dietService.addItem('diets', result).then();
      }
    });

  }

  editDietDialog(dietId: string) {
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
        this.dietService.updateItem('diets', result, dietId).then();
      }
    });

  }

  upvoteHandler(dietId: string) {
    let diet = this.dietsList.find(x => x.id === dietId);
    if (!diet.data.voters.includes(this.currentUser)) {
      diet.data.voters.push(this.currentUser);
      let indexToClear = diet.data.downvoters.indexOf(this.currentUser);
      diet.data.downvoters.splice(indexToClear, 1);
      diet.data.votes += 1;
      if (diet.data.votes === 0) {
        let index = diet.data.voters.indexOf(this.currentUser);
        diet.data.voters.splice(index, 1);
      }
      this.dietService.updateItem('diets', diet.data, dietId);
    } else {
      Swal.fire('Hold there, rookie!', 'It seems like you adore this post, but  one like per post..', 'warning');
    }

  }
  downvoteHandler(dietId: string) {
    let diet = this.dietsList.find(x => x.id === dietId);
    if (!diet.data.downvoters.includes(this.currentUser)) {
      diet.data.downvoters.push(this.currentUser);
      let indexToClear = diet.data.voters.indexOf(this.currentUser);
      diet.data.voters.splice(indexToClear, 1);
      diet.data.votes -= 1;
      if (diet.data.votes === 0) {
        let index = diet.data.downvoters.indexOf(this.currentUser);
        diet.data.downvoters.splice(index, 1);
      }
      this.dietService.updateItem('diets', diet.data, dietId);
    } else {
      Swal.fire("Now now ...", 'Do not be too harsh on the author ...', 'warning')
    }

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
  public currentUserEmail = localStorage.getItem('userEmail');
  public breakfastMeals: any[] = [];
  public lunchMeals: any[] = [];
  public dinnerMeals: any[] = [];
  public voters = [];
  public downvoters = [];
  public votes: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data) {
      let dietInfo = this.data.data;
      setTimeout(() => {
        this.dietForm.controls["title"].setValue(dietInfo.title);
        this.dietForm.controls["duration"].setValue(dietInfo.duration);
        this.dietForm.controls["description"].setValue(dietInfo.description);
        this.dietForm.controls["level"].setValue(dietInfo.level);
        this.breakfastMeals = dietInfo.breakfast;
        this.lunchMeals = dietInfo.lunch;
        this.dinnerMeals = dietInfo.dinner;
        this.votes = dietInfo.votes;
        this.voters = dietInfo.voters;
        this.downvoters = dietInfo.downvoters;
      });
    }
  }

  addItem(category: string, item: string) {
    if (item !== "" && item !== undefined) {
      switch (category) {
        case "breakfast":
          this.breakfastMeals.push(item);
          this.dietForm.controls["breakfastMeal"].setValue("");
          break;
        case "lunch":
          this.lunchMeals.push(item);
          this.dietForm.controls["lunchMeal"].setValue("");
          break;
        case "dinner":
          this.dinnerMeals.push(item);
          this.dietForm.controls["dinnerMeal"].setValue("");
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

  removeItem(category: string, item: string) {
    switch (category) {
      case "breakfast":
        let breakfastIndex = this.breakfastMeals.indexOf(item);
        this.breakfastMeals.splice(breakfastIndex, 1);
        break;
      case "lunch":
        let lunchIndex = this.lunchMeals.indexOf(item);
        this.lunchMeals.splice(lunchIndex, 1);
        break;
      case "dinner":
        let dinnerIndex = this.dinnerMeals.indexOf(item);
        this.dinnerMeals.splice(dinnerIndex, 1);
        break;
    }
  }
  public dietLevels: DietLevels[] = [
    { value: 'Beginner', viewValue: 'Rookie' },
    { value: 'Medium', viewValue: 'Fit-Cadet' },
    { value: 'Intermediate', viewValue: 'Fit-Commander' }
  ];

  sendObj(title: string, description: string, level: string, duration: string) {
    return ({
      title,
      description,
      level,
      duration,
      breakfast: this.breakfastMeals,
      lunch: this.lunchMeals,
      dinner: this.dinnerMeals,
      createdBy: this.currentUser,
      creator: this.currentUserEmail,
      votes: this.votes,
      voters: this.voters,
      downvoters: this.downvoters,
    })
  }

  invalidFormHandler() {
    Swal.fire("Opps, something went wrong?", "Be sure to check all your data!", "warning");
  }
}
