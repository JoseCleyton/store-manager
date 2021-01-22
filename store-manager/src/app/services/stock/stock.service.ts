import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from 'src/app/shared/constants/constants.enum';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}

  public getTotalStock(): Observable<any> {
    return this.http.get<any>(URL.API + 'stock/total');
  }
}
