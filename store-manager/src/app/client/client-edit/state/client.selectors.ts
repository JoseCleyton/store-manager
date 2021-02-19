import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectClient = (state: AppState) => state.client;

export const selectClients = createSelector(
  selectClient,
  (state) => state.clients
);
export const selectTotalClients = createSelector(
  selectClient,
  (state) => state.totalClients
);
export const selectSelectedClient = createSelector(
  selectClient,
  (state) => state.selectedClient
);
