import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from '../services/firebase-auth.service';


@Injectable()
export class AuthenticateGuard implements CanActivate{
    constructor(
        private router: Router,
        private firebaseAuthService:FirebaseAuthService
        ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const {authenticated, onFailRedirect} = route.data;
        if(authenticated === this.firebaseAuthService.isLoggedIn){
            return true;
        }
        
        return this.router.parseUrl(onFailRedirect) || '/';
     
    }

}