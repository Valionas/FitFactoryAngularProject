import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  @Output() isAuthenticated = new EventEmitter();

  constructor(public firebaseAuthService:FirebaseAuthService) { }
 

  async logout(){
    await this.firebaseAuthService.logout();
    if(this.firebaseAuthService.isLoggedIn === false){
      this.isAuthenticated.emit();
    }
  }
}
