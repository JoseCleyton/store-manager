import { ClientActionsTypes } from 'src/app/client/client-edit/state/client.actions';
import { ClientActions } from './client.actions';

export interface ClientState {
  clients: any[];
  selectedClient: any;
}

export const initialState: ClientState = {
  clients: [],
  selectedClient: undefined,
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

    case ClientActionsTypes.EDIT_CLIENT_SUCCESS: {
      return {
        ...state,
        selectedClient: undefined,
        clients: state.clients.map((c) => {
          if (c._id !== action.payload._id) return c;
          return action.payload;
        }),
      };
    }

    case ClientActionsTypes.SELECT_CLIENT: {
      return {
        ...state,
        selectedClient: action.client,
      };
    }

    case ClientActionsTypes.DELETE_CLIENT_SUCCESS: {
      return {
        ...state,
        selectedClient: undefined,
        clients: state.clients.filter((c) => c._id !== action.id),
      };
    }

    default:
      return state;
  }
}
