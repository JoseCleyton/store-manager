import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ClientService } from 'src/app/services/client/client.service';
import * as actions from './client.actions';
import * as fromAlert from '../../../shared/alert/alert/state';
import { of } from 'rxjs';

@Injectable()
export class ClientEffects {
  constructor(
    private actions$: Actions,
    private clienteService: ClientService
  ) {}

  @Effect()
  addClient = this.actions$.pipe(
    ofType<actions.AddClient>(actions.ClientActionsTypes.ADD_CLIENT),
    switchMap((action) =>
      this.clienteService.addClient(action.payload).pipe(
        switchMap((response) => {
          return [
            new fromAlert.actions.Success({
              type: 'success',
              message: 'Cliente cadastrado com sucesso...',
            }),
            new actions.AddClientSuccess(response),
          ];
        }),
        catchError((err) => of(new fromAlert.actions.Error(err.message)))
      )
    )
  );

  @Effect()
  listClients = this.actions$.pipe(
    ofType<actions.ListClients>(actions.ClientActionsTypes.LIST_CLIENTS),
    switchMap((action) =>
      this.clienteService.listClients().pipe(
        map((response) => {
          return new actions.ListClientsSuccess(response.clients);
        }),
        catchError((err) => of(new fromAlert.actions.Error(err.message)))
      )
    )
  );

  @Effect()
  totalClients = this.actions$.pipe(
    ofType<actions.TotalClients>(actions.ClientActionsTypes.TOTAL_CLIENTS),
    switchMap((action) =>
      this.clienteService.getTotalClients().pipe(
        map((response) => {
          return new actions.TotalClientsSuccess(response.total);
        }),
        catchError((err) => of(new fromAlert.actions.Error(err.message)))
      )
    )
  );

  @Effect()
  editClient = this.actions$.pipe(
    ofType<actions.EditClient>(actions.ClientActionsTypes.EDIT_CLIENT),
    switchMap((action) =>
      this.clienteService.editClient(action.payload).pipe(
        switchMap((response) => {
          return [
            new fromAlert.actions.Success({
              type: 'success',
              message: 'Cliente atualizado com sucesso...',
            }),
            new actions.EditClientSuccess(response.client),
          ];
        }),
        catchError((err) => of(new fromAlert.actions.Error(err.message)))
      )
    )
  );

  @Effect()
  delClient = this.actions$.pipe(
    ofType<actions.DeleteClient>(actions.ClientActionsTypes.DELETE_CLIENT),
    switchMap((action) =>
      this.clienteService.delClient(action.id).pipe(
        switchMap((response) => {
          return [
            new fromAlert.actions.Success({
              type: 'success',
              message: 'Cliente deletado com sucesso...',
            }),
            new actions.DeleteClientSuccess(action.id),
          ];
        }),
        catchError((err) => of(new fromAlert.actions.Error(err.message)))
      )
    )
  );
}
