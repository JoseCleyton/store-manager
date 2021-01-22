import { LoginActions, LoginActionsTypes } from './login.actions';

export interface LoginState {
  token: any;
}

export const initialState: LoginState = {
  token: undefined,
};

export function loginReducer(
  state = initialState,
  action: LoginActions
): LoginState {
  switch (action.type) {
    case LoginActionsTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.token,
      };
    }

    default:
      return state;
  }
}
