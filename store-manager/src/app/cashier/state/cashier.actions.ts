import { Action } from '@ngrx/store';

export enum CashierActionsTypes {
  CASHIER_VALUE = '[Cashier] Cashier Value',
  CASHIER_VALUE_SUCCESS = '[Cashier] Cashier Value Success',

  LIST_MOVES = '[Cashier] Moves Cashier',
  LIST_MOVES_SUCCESS = '[Cashier] Moves Cashier Success',
}

export class CashierValue implements Action {
  readonly type = CashierActionsTypes.CASHIER_VALUE;
  constructor() {}
}

export class CashierValueSuccess implements Action {
  readonly type = CashierActionsTypes.CASHIER_VALUE_SUCCESS;
  constructor(public cashierValue: number) {}
}

export class ListMoves implements Action {
  readonly type = CashierActionsTypes.LIST_MOVES;
  constructor() {}
}

export class ListMovesSuccess implements Action {
  readonly type = CashierActionsTypes.LIST_MOVES_SUCCESS;
  constructor(public moves: any[]) {}
}
export type CashierActions = CashierValue | CashierValueSuccess | ListMoves | ListMovesSuccess;
