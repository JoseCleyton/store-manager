import { Action } from '@ngrx/store';

export enum ClientActionsTypes {
  ADD_CLIENT = '[Client] Add Client',
  ADD_CLIENT_SUCCESS = '[Client] Add Client success',

  LIST_CLIENTS = '[Client] List Clients',
  LIST_CLIENTS_SUCCESS = '[Client] List Clients success',
}

export class AddClient implements Action {
  readonly type = ClientActionsTypes.ADD_CLIENT;
  constructor(public payload: any) {}
}

export class AddClientSuccess implements Action {
  readonly type = ClientActionsTypes.ADD_CLIENT_SUCCESS;
  constructor(public payload: any) {}
}

export class ListClients implements Action {
  readonly type = ClientActionsTypes.LIST_CLIENTS;
  constructor() {}
}

export class ListClientsSuccess implements Action {
  readonly type = ClientActionsTypes.LIST_CLIENTS_SUCCESS;
  constructor(public payload: any[]) {}
}

export type ClientActions =
  | AddClient
  | AddClientSuccess
  | ListClients
  | ListClientsSuccess;
