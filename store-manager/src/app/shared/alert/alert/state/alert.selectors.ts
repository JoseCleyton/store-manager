import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectAlert = (state: AppState) => state.alert;

export const selectAlertsSuccess = createSelector(
  selectAlert,
  state => state.alertsSuccess
);

export const selectAlertsErrs = createSelector(
  selectAlert,
  state => state.alertsErrs
);
export const selectAlertsWarning = createSelector(
  selectAlert,
  state => state.alertsWarning
);
