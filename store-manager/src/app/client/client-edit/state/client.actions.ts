import { Action } from '@ngrx/store';

export enum ClientActionsTypes {
  ADD_CLIENT = '[Client] Add Client',
  ADD_CLIENT_SUCCESS = '[Client] Add Client success',

  LIST_CLIENTS = '[Client] List Clients',
  LIST_CLIENTS_SUCCESS = '[Client] List Clients success',

  TOTAL_CLIENTS = '[Client] Total Clients',
  TOTAL_CLIENTS_SUCCESS = '[Client] Total Clients success',

  EDIT_CLIENT = '[Client] Edit Client',
  EDIT_CLIENT_SUCCESS = '[Client] Edit Client Success',

  SELECT_CLIENT = '[Client] Select Client',

  DELETE_CLIENT = '[Client] Delete Client',
  DELETE_CLIENT_SUCCESS = '[Client] Delete Client Success',
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

export class TotalClients implements Action {
  readonly type = ClientActionsTypes.TOTAL_CLIENTS;
  constructor() {}
}

export class TotalClientsSuccess implements Action {
  readonly type = ClientActionsTypes.TOTAL_CLIENTS_SUCCESS;
  constructor(public total: number) {}
}

export class EditClient implements Action {
  readonly type = ClientActionsTypes.EDIT_CLIENT;
  constructor(public payload: any) {}
}

export class EditClientSuccess implements Action {
  readonly type = ClientActionsTypes.EDIT_CLIENT_SUCCESS;
  constructor(public payload: any) {}
}

export class SelectClient implements Action {
  readonly type = ClientActionsTypes.SELECT_CLIENT;
  constructor(public client: any) {}
}

export class DeleteClient implements Action {
  readonly type = ClientActionsTypes.DELETE_CLIENT;
  constructor(public id: string) {}
}

export class DeleteClientSuccess implements Action {
  readonly type = ClientActionsTypes.DELETE_CLIENT_SUCCESS;
  constructor(public id: string) {}
}

export type ClientActions =
  | AddClient
  | AddClientSuccess
  | ListClients
  | ListClientsSuccess
  | SelectClient
  | DeleteClient
  | DeleteClientSuccess
  | EditClient
  | EditClientSuccess
  | TotalClients
  | TotalClientsSuccess;
