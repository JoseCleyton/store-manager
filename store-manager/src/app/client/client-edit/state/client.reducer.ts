import { ClientActionsTypes } from 'src/app/client/client-edit/state/client.actions';
import { ClientActions } from './client.actions';

export interface ClientState {
  clients: any[];
}

export const initialState: ClientState = {
  clients: [],
};

export function clientReducer(
  state = initialState,
  action: ClientActions
): ClientState {
  switch (action.type) {
    case ClientActionsTypes.ADD_CLIENT_SUCCESS: {
      return {
        ...state,
        clients: [...state.clients, action.payload.client],
      };
    }

    case ClientActionsTypes.LIST_CLIENTS_SUCCESS: {
      return {
        ...state,
        clients: action.payload,
      };
    }

    default:
      return state;
  }
}
