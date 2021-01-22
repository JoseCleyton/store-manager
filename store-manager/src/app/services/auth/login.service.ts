import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { URL } from 'src/app/shared/constants/constants.enum';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  public authenticate(user: any): Observable<any> {
    return this.http.post(URL.API + 'auth/authenticate', user);
  }

  public isAuthenticated(): boolean {
    if (sessionStorage.getItem('store-token') === null) {
      this.router.navigateByUrl('login');
      return false;
    } else {
      return true;
    }
  }

  public logout() {
    sessionStorage.removeItem('store-token');
    this.router.navigateByUrl('login');
  }
}
