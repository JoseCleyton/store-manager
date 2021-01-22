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
            new fromAlert.actions.Success('Cliente cadastrado com sucesso...'),
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
}
