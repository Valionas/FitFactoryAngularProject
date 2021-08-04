import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../animation.css',]
})
export class RegisterComponent  {
  constructor(
    public firebaseAuthService:FirebaseAuthService,
    private router:Router) { }

  async onSignUp(email:string,password:string){
    await this.firebaseAuthService.signUp(email,password);
    this.router.navigate(['/home']);
  }
}
