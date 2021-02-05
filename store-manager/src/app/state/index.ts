import { ActionReducerMap } from '@ngrx/store';
import * as login from '../login/state/index';
import * as client from '../client/client-edit/state/index';
import * as alert from '../shared/alert/alert/state/index';
import * as stock from '../stock/state/index';

export interface AppState {
  login: login.reducer.LoginState;
  client: client.reducer.ClientState;
  alert: alert.reducer.AlertState;
  stock: stock.reducer.StockState;
}

export const reducers: ActionReducerMap<AppState> = {
  login: login.reducer.loginReducer,
  client: client.reducer.clientReducer,
  alert: alert.reducer.alertReducer,
  stock: stock.reducer.stockReducer,
};

export const effects: Array<any> = [
  login.effects,
  client.effects,
  stock.effects,
];

export const initialState = {
  login: login.reducer.initialState,
  client: client.reducer.initialState,
  alert: alert.reducer.initialState,
  stock: stock.reducer.initialState,
};
