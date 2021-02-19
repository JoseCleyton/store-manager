import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectCashier = (state: AppState) => state.cashier;

export const selectCashierValue = createSelector(
  selectCashier,
  (state) => state.cashierValue
);
export const selectMoves = createSelector(
  selectCashier,
  (state) => state.moves
);
