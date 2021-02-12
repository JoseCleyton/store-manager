import { CheckoutService } from './../../services/checkout/checkout.services';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromAlert from '../../shared/alert/alert/state';
import * as actions from './checkout.actions';
import { of } from 'rxjs';

@Injectable()
export class CheckoutEffects {
  constructor(
    private actions$: Actions,
    private checkoutService: CheckoutService
  ) {}

  @Effect()
  checkout = this.actions$.pipe(
    ofType<actions.CheckoutSale>(actions.CheckoutActionsTypes.CHECKOUT),
    switchMap((action) =>
      this.checkoutService.checkout(action.checkout).pipe(
        switchMap((response) => {
          return [
            new fromAlert.actions.Success({
              type: 'success',
              message: 'Checkout realizado com sucesso...',
            }),
            new actions.CheckoutSuccess(response),
          ];
        }),
        catchError((err) => of(new fromAlert.actions.Error(err.message)))
      )
    )
  );
}
