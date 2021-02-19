import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectStock = (state: AppState) => state.stock;

export const selectProducts = createSelector(
  selectStock,
  (state) => state.products
);
export const selectTotalStock = createSelector(
  selectStock,
  (state) => state.totalStock
);
export const selectSelectedProduct = createSelector(
  selectStock,
  (state) => state.selectedProduct
);
