import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class DietCrudService {

  constructor(private fireStore:AngularFirestore) { }

  getDiets(){
    return this.fireStore.collection('diets').snapshotChanges();
  }
}
