import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectPointSale = (state: AppState) => state.pointSale;

export const selectCheckout = createSelector(
  selectPointSale,
  (state) => state.checkout
);
