import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectClient = (state: AppState) => state.client;

export const selectClients = createSelector(
  selectClient,
  (state) => state.clients
);
