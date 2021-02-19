import { CashierActions, CashierActionsTypes } from './cashier.actions';

export interface CashierState {
  cashierValue: number;
  moves: any[];
}

export const initialState: CashierState = {
  cashierValue: undefined,
  moves: [],
};

export function cashierReducer(
  state = initialState,
  action: CashierActions
): CashierState {
  switch (action.type) {
    case CashierActionsTypes.CASHIER_VALUE_SUCCESS: {
      return {
        ...state,
        cashierValue: action.cashierValue,
      };
    }
    case CashierActionsTypes.LIST_MOVES_SUCCESS: {
      return {
        ...state,
        moves: action.moves,
      };
    }

    default:
      return state;
  }
}
