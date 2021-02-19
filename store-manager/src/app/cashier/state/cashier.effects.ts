import { CashierService } from './../../services/cashier/cashier.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ClientService } from 'src/app/services/client/client.service';
import * as actions from './cashier.actions';
import * as fromAlert from '../../shared/alert/alert/state';
import { of } from 'rxjs';

@Injectable()
export class CashierEffects {
  constructor(
    private actions$: Actions,
    private cashierService: CashierService
  ) {}

  @Effect()
  cashierValue = this.actions$.pipe(
    ofType<actions.CashierValue>(actions.CashierActionsTypes.CASHIER_VALUE),
    switchMap((action) =>
      this.cashierService.getTotalCashier().pipe(
        map((response) => {
          return new actions.CashierValueSuccess(response.cashierValue[0].cashierValue);
        }),
        catchError((err) => of(new fromAlert.actions.Error(err.message)))
      )
    )
  );

  @Effect()
  moves = this.actions$.pipe(
    ofType<actions.ListMoves>(actions.CashierActionsTypes.LIST_MOVES),
    switchMap((action) =>
      this.cashierService.getMoves().pipe(
        map((response) => {
          return new actions.ListMovesSuccess(response.moves);
        }),
        catchError((err) => of(new fromAlert.actions.Error(err.message)))
      )
    )
  );

}
