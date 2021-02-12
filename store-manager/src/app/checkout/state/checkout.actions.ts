import { Checkout } from '../../models/checkout.model';
import { Action } from '@ngrx/store';

export enum CheckoutActionsTypes {
  CHECKOUT = '[Checkout] Checkout',
  CHECKOUT_SUCCESS = '[Checkout] Checkout Success',
  RESET_CHECKOUT = '[Checkout] Reset Checkout',
}

export class CheckoutSale implements Action {
  readonly type = CheckoutActionsTypes.CHECKOUT;
  constructor(public checkout: Checkout) {}
}
export class CheckoutSuccess implements Action {
  readonly type = CheckoutActionsTypes.CHECKOUT_SUCCESS;
  constructor(public payload: any) {}
}
export class ResetCheckout implements Action {
  readonly type = CheckoutActionsTypes.RESET_CHECKOUT;
  constructor() {}
}
export type CheckoutActions = CheckoutSale | CheckoutSuccess | ResetCheckout;
