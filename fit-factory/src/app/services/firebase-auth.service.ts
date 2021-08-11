import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  isLoggedIn = localStorage.getItem('user') != null ? true : false;

  constructor(public firebaseAuth: AngularFireAuth) { }

  async setUserId(){
    await this.firebaseAuth.user.subscribe((response)=>{
      localStorage.setItem('userID',response!.uid);
      localStorage.setItem('userEmail',JSON.stringify(response!.email));
      
    })
  };

  getUserId(){
    localStorage.getItem('userID')
  };

  async signIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(response => {
      this.isLoggedIn = true;
      localStorage.setItem('user',JSON.stringify(response.user))
    }).catch(err => {
      if(err.code=="auth/wrong-password"){
        Swal.fire('Seems like something is wrong',"We couldn't find such user in our records, be sure to check your email and password once again!",'error')    
      }
    })
  }

  async signUp(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(response => {
      this.isLoggedIn = true;
      localStorage.setItem('user',JSON.stringify(response.user))
    }).catch(err => {
      if(err.code="auth/email-already-in-use"){
        Swal.fire('Sorry to interupt the process!',"Seems like we have a member with that email, please use a different one","error");
      }
    })
  }

  logout(){
    this.firebaseAuth.signOut()
    this.isLoggedIn = false;
    localStorage.clear();
  }
}
