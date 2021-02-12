import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectCheckout = (state: AppState) => state.checkout;

export const selectCheckoutSale = createSelector(
  selectCheckout,
  (state) => state.checkout
);
