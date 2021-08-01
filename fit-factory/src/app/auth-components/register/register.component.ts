import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  @Output() isAuthenticated = new EventEmitter();

  constructor(public firebaseAuthService:FirebaseAuthService) { }

  async onSignUp(email:string,password:string){
    await this.firebaseAuthService.signUp(email,password);
    if(this.firebaseAuthService.isLoggedIn){
      this.isAuthenticated.emit();
    }
  }
}
