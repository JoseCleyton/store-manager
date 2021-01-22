import { Action } from '@ngrx/store';

export enum AlertActionsTypes {
  SUCCESS = '[ALERT] Success',
  ERROR = '[ALERT] Error',
  RESET_ALERT = '[ALERT] Reset Alert',
}

export class Success implements Action {
  readonly type = AlertActionsTypes.SUCCESS;
  constructor(public alert: any) {}
}

export class Error implements Action {
  readonly type = AlertActionsTypes.ERROR;
  constructor(public alert: any) {}
}

export class ResetAlert implements Action {
  readonly type = AlertActionsTypes.RESET_ALERT;
  constructor() {}
}

export type AlertActions = Success | Error | ResetAlert;
