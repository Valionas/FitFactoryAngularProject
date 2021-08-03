import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../services/crud-service';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.css']
})
export class DietsComponent implements OnInit {

  public dietsList: any[] = [];
  constructor(private dietService:CRUDService) { }

  ngOnInit(): void {
    this.getDiets();
  }

  getDiets():void{
    this.dietService.getItems('diets').subscribe((res) => {
      this.dietsList = [];
      res.map((diet) => {
        console.log(diet.payload.doc.data());
        
        this.dietsList.push(diet.payload.doc.data());
      })
    })
  }

}
