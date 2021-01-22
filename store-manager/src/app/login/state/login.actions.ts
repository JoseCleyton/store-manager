import { Action } from '@ngrx/store';

export enum LoginActionsTypes {
  LOGIN = '[LOGIN] Login',
  LOGIN_SUCCESS = '[Login] Login success',
  LOGIN_ERROR = '[Login] Login error',

  LOGOUT = '[Login] Logout',
  LOGOUT_SUCCESS = '[Login] Logout success',
  LOGOUT_ERROR = '[Login] Logout error',
}

export class Login implements Action {
  readonly type = LoginActionsTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = LoginActionsTypes.LOGIN_SUCCESS;
  constructor(public token: string) {}
}

export type LoginActions = Login | LoginSuccess;
