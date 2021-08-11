import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public email!:string
  constructor(private auth:FirebaseAuthService, private router: Router) { }

  ngOnInit(): void {}

  async resetPasswordHandler(email: string){
    await this.auth.resetPassword(email)
    .then(() => {
      this.router.navigate(['/login']);
    })
  }

}
