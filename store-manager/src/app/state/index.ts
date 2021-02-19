import { ActionReducerMap } from '@ngrx/store';
import * as login from '../login/state/index';
import * as client from '../client/client-edit/state/index';
import * as alert from '../shared/alert/alert/state/index';
import * as stock from '../stock/state/index';
import * as pointSale from '../point-sale/state/index';
import * as checkout from '../checkout/state/index';
import * as cashier from '../cashier/state/index';
export interface AppState {
  login: login.reducer.LoginState;
  client: client.reducer.ClientState;
  alert: alert.reducer.AlertState;
  stock: stock.reducer.StockState;
  pointSale: pointSale.reducer.PointSaleState;
  checkout: checkout.reducer.CheckoutState;
  cashier: cashier.reducer.CashierState;
}

export const reducers: ActionReducerMap<AppState> = {
  login: login.reducer.loginReducer,
  client: client.reducer.clientReducer,
  alert: alert.reducer.alertReducer,
  stock: stock.reducer.stockReducer,
  pointSale: pointSale.reducer.pointSaleReducer,
  checkout: checkout.reducer.checkoutReducer,
  cashier: cashier.reducer.cashierReducer,
};

export const effects: Array<any> = [
  login.effects,
  client.effects,
  stock.effects,
  checkout.effects,
  cashier.effects,
];

export const initialState = {
  login: login.reducer.initialState,
  client: client.reducer.initialState,
  alert: alert.reducer.initialState,
  stock: stock.reducer.initialState,
  pointSale: pointSale.reducer.initialState,
  checkout: checkout.reducer.initialState,
  cashier: cashier.reducer.initialState,
};
