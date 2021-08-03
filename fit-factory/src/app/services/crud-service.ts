import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private fireStore:AngularFirestore) { }

  getItems(url:string){
    return this.fireStore.collection(url).snapshotChanges();
  }

  addItem(url:string, item: unknown){
    return this.fireStore.collection(url).add(item);
  }

  updateItem(url:string, item: Partial<unknown>, itemId:string){
    return this.fireStore.doc(url+"/"+itemId).update(item);
  }

  deleteItem(url:string, itemId:string){
    return this.fireStore.doc(url+"/"+itemId).delete();
  }
}
