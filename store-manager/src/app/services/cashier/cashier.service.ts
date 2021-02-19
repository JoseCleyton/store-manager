import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from 'src/app/shared/constants/constants.enum';

@Injectable({
  providedIn: 'root',
})
export class CashierService {
  constructor(private http: HttpClient) {}

  public getTotalCashier(): Observable<any> {
    return this.http.get<any>(URL.API + 'cashier');
  }
  public getMoves(): Observable<any> {
    return this.http.get<any>(URL.API + 'moves');
  }
}
