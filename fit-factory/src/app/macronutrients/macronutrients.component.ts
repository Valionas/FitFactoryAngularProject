import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../services/crud-service';

@Component({
  selector: 'app-macronutrients',
  templateUrl: './macronutrients.component.html',
  styleUrls: ['./macronutrients.component.css','../animation.css']
})
export class MacronutrientsComponent implements OnInit {

  public marcroNutrientsInfo:any[] = [];
  constructor(public firebaseCRUD:CRUDService) { }

  ngOnInit(): void {
    this.getMacroInfo();
  }

  getMacroInfo(){
    this.firebaseCRUD.getItems('macronutrients').subscribe((res) => {
      this.marcroNutrientsInfo = [];
      res.map((macro) =>{
        this.marcroNutrientsInfo.push({id: macro.payload.doc.id, data: macro.payload.doc.data()})
      })
    })
  }

}
