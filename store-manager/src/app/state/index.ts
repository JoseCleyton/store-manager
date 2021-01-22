import { ActionReducerMap } from '@ngrx/store';
import * as login from '../login/state/index';
import * as client from '../client/client-edit/state/index';
import * as alert from '../shared/alert/alert/state/index';

export interface AppState {
  login: login.reducer.LoginState;
  client: client.reducer.ClientState;
  alert: alert.reducer.AlertState;
}

export const reducers: ActionReducerMap<AppState> = {
  login: login.reducer.loginReducer,
  client: client.reducer.clientReducer,
  alert: alert.reducer.alertReducer,
};

export const effects: Array<any> = [login.effects, client.effects];

export const initialState = {
  login: login.reducer.initialState,
  client: client.reducer.initialState,
  alert: alert.reducer.initialState,
};
