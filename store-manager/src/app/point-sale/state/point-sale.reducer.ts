import { Checkout } from 'src/app/models/checkout.model';
import { PointSaleActions, PointSaleActionsTypes } from './point-sale.actions';

export interface PointSaleState {
  checkout: Checkout;
}

export const initialState: PointSaleState = {
  checkout: undefined,
};

export function pointSaleReducer(
  state = initialState,
  action: PointSaleActions
): PointSaleState {
  switch (action.type) {
    case PointSaleActionsTypes.SELECT_CHECKOUT: {
      return {
        ...state,
        checkout: action.checkout,
      };
    }

    default:
      return state;
  }
}
