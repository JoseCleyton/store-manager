import { CheckoutActions, CheckoutActionsTypes } from './checkout.actions';

export interface CheckoutState {
  checkout: any;
}

export const initialState: CheckoutState = {
  checkout: undefined,
};

export function checkoutReducer(
  state = initialState,
  action: CheckoutActions
): CheckoutState {
  switch (action.type) {
    case CheckoutActionsTypes.CHECKOUT_SUCCESS: {
      return {
        ...state,
        checkout: action.payload,
      };
    }
    case CheckoutActionsTypes.RESET_CHECKOUT: {
      return {
        ...state,
        checkout: undefined,
      };
    }
    default:
      return state;
  }
}
