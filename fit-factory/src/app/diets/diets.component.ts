import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../services/crud-service';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { MatDialog } from '@angular/material/dialog';

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
    
    this.dietService.deleteItem('diets', dietId).then();
  }

  openDietDialog() {
    const dialogRef = this.dialog.open(AddDietDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result.value);     
      }
    });

  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialogs/diet-dialog.html',
  styleUrls: ['./diets.component.css', '../animation.css']
})
export class AddDietDialog {
  public dietLevels: DietLevels[] = [
    {value: 'Beginner', viewValue: 'Rookie'},
    {value: 'Medium', viewValue: 'Fit-Cadet'},
    {value: 'Intermediate', viewValue: 'Fit-Commander'}
  ];

  onSubmit(){
    
  }
  
}
