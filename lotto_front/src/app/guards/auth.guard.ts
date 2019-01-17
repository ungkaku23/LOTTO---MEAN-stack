import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LotoAuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
   constructor(private authService: LotoAuthService,
               private router: Router) {
        
   } 

   canActivate() {
       if(this.authService.loggedIn()) {
           return true;
       } else {
           this.router.navigate(['/loto/login/0']);
           return false;
       }
   }
}
