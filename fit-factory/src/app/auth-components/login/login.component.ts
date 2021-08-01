import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  @Output() isAuthenticated = new EventEmitter();

  constructor(public firebaseAuthService:FirebaseAuthService) { }

  async onSignIn(email:string,password:string){
    await this.firebaseAuthService.signIn(email,password);
    if(this.firebaseAuthService.isLoggedIn){
      this.isAuthenticated.emit();
    }
  }

}
