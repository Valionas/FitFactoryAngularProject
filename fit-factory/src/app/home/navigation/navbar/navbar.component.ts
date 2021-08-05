import { Component, Input, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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

  logoutHandler(){
    Swal.fire({  
      title: 'Leaving so soon?',  
      text: 'You will have to enter the factory again!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, time for a break!',  
      cancelButtonText: 'No, I am staying with the squad!'  
    }).then((result) => {  
      if (result.value) {    
        this.logout();
      } 
    })  
  }
  async logout(){
      await this.firebaseAuthService.logout();
      this.router.navigate(['/login']);
  }
  

}
