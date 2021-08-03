import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  isLoggedIn = localStorage.getItem('user') != null ? true : false;

  constructor(public firebaseAuth: AngularFireAuth) { }

  async getUserId(){
    await this.firebaseAuth.user.subscribe((response)=>{
      localStorage.setItem('userID',response!.uid)
    })
  }

  async signIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(response => {
      this.isLoggedIn = true;
      localStorage.setItem('user',JSON.stringify(response.user))
    })
  }

  async signUp(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(response => {
      this.isLoggedIn = true;
      localStorage.setItem('user',JSON.stringify(response.user))
    })
  }

  logout(){
    this.firebaseAuth.signOut()
    this.isLoggedIn = false;
    localStorage.clear();
  }
}
