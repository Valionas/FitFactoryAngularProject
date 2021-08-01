import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() isAuthenticated = new EventEmitter();

  constructor(public firebaseAuthService:FirebaseAuthService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  logout(){
    this.firebaseAuthService.logout();
    this.isAuthenticated.emit();
  }
}
