import { Action } from '@ngrx/store';
import { Checkout } from 'src/app/models/checkout.model';

export enum PointSaleActionsTypes {
  SELECT_CHECKOUT = '[Point Sale] Select Checkout',
}

export class SelectCheckout implements Action {
  readonly type = PointSaleActionsTypes.SELECT_CHECKOUT;
  constructor(public checkout: Checkout) {}
}
export type PointSaleActions = SelectCheckout;
