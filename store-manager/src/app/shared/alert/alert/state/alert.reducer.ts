import { AlertActions, AlertActionsTypes } from './alert.actions';

export interface AlertState {
  alertsSuccess: any[];
  alertsErrs: any[];
}

export const initialState: AlertState = {
  alertsSuccess: [],
  alertsErrs: [],
};

export function alertReducer(
  state = initialState,
  action: AlertActions
): AlertState {
  switch (action.type) {
    case AlertActionsTypes.SUCCESS: {
      return {
        ...state,
        alertsSuccess: [...state.alertsSuccess, action.alert],
      };
    }
    case AlertActionsTypes.ERROR: {
      return {
        ...state,
        alertsErrs: [...state.alertsErrs, action.alert],
      };
    }
    case AlertActionsTypes.RESET_ALERT: {
      return {
        ...state,
        alertsSuccess: [],
        alertsErrs: [],
      };
    }
    default:
      return state;
  }
}
