import { Component, Input, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  get isLogged():boolean {
    return this.firebaseAuthService.isLoggedIn;
  }
  
  constructor(
    public firebaseAuthService:FirebaseAuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  async logout(){
    await this.firebaseAuthService.logout();
    this.router.navigate(['/login']);
  }
  

}
