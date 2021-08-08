import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FirebaseAuthService } from './services/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./animation.css']
})
export class AppComponent implements OnInit {

  title = 'fit-factory';
  isSignedIn = false;
  authFormType = "";

  constructor(public firebaseService: FirebaseAuthService) { }
  ngOnInit(): void {
    this.firebaseService.setUserId();
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    }
    else {
      this.isSignedIn = false;
    }
  }

  ngOnChanges(): void {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }
  
  setAuthentication(isAuthenticated: boolean) {
    this.isSignedIn = isAuthenticated;
  }

  setAuthFormHandler(formType: string) {
    if (formType === "login") {
      this.authFormType = "login";
    } else {
      this.authFormType = "register";
    }
  }
}
