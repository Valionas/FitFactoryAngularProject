import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../animation.css']
})
export class HomeComponent {

  constructor(
    public firebaseAuthService: FirebaseAuthService,
    private router: Router) { }



}
