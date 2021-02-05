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

  public addProduct(product: any): Observable<any> {
    return this.http.post(URL.API + 'stock', product);
  }

  public listStock(): Observable<any> {
    return this.http.get(URL.API + 'stock');
  }

  public editProduct(product: any): Observable<any> {
    return this.http.put(URL.API + 'stock', product);
  }

  public delProduct(id: string): Observable<any> {
    return this.http.delete(URL.API + 'stock/' + id);
  }
}
