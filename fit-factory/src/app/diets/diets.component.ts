import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../services/crud-service';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.css', '../animation.css']
})
export class DietsComponent implements OnInit {

  public currentUser = localStorage.getItem('userID');
  public dietsList: any[] = [];
  constructor(private dietService: CRUDService, private fireAuth: FirebaseAuthService) { }

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

}
