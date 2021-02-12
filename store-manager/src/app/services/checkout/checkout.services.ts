import { Checkout } from './../../models/checkout.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from 'src/app/shared/constants/constants.enum';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}
  public checkout(checkout: Checkout): Observable<any> {
    return this.http.post(URL.API + 'checkout', {
      checkout: {
        client: checkout.client,
        listItens: checkout.listItens,
        paymentType: checkout.paymentType,
        orderValue: checkout.orderValue,
        percentageDiscount: checkout.percentageDiscount,
        discountMoney: checkout.discountMoney,
      },
    });
  }
}
