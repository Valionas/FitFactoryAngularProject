import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../animation.css']
})
export class LoginComponent  {

  constructor(
    public firebaseAuthService:FirebaseAuthService,
    private router: Router) { }

  async onSignIn(email:string,password:string){
    await this.firebaseAuthService.signIn(email,password);
    this.router.navigate(['/home']);
  }

}
