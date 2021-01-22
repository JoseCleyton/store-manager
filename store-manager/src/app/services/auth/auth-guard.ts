import { LoginService } from './login.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate{
    constructor(private auth : LoginService){}
    canActivate(): boolean {    
     return this.auth.isAuthenticated()
 }
}