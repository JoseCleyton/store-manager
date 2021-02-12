import { StockService } from './../../services/stock/stock.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as actions from './stock.actions';
import * as fromAlert from '../../shared/alert/alert/state';
import { of } from 'rxjs';

@Injectable()
export class StockEffects {
  constructor(private actions$: Actions, private stockService: StockService) {}

  @Effect()
  addProduct = this.actions$.pipe(
    ofType<actions.AddStock>(actions.StockActionsTypes.ADD_STOCK),
    switchMap((action) =>
      this.stockService.addProduct(action.payload).pipe(
        switchMap((response) => {
          return [
            new fromAlert.actions.Success({
              type: 'success',
              message: 'Produto cadastrado com sucesso...',
            }),
            new actions.AddStockSuccess(response),
          ];
        }),
        catchError((err) => of(new fromAlert.actions.Error(err.message)))
      )
    )
  );

  @Effect()
  listStock = this.actions$.pipe(
    ofType<actions.ListStock>(actions.StockActionsTypes.LIST_STOCK),
    switchMap((action) =>
      this.stockService.listStock().pipe(
        map((response) => {
          return new actions.ListStockSuccess(response.stock);
        }),
        catchError((err) => of(new fromAlert.actions.Error(err.message)))
      )
    )
  );

  @Effect()
  editProduct = this.actions$.pipe(
    ofType<actions.EditStock>(actions.StockActionsTypes.EDIT_STOCK),
    switchMap((action) =>
      this.stockService.editProduct(action.payload).pipe(
        switchMap((response) => {
          return [
            new fromAlert.actions.Success({
              type: 'success',
              message: 'Produto atualizado com sucesso...',
            }),
            new actions.EditStockSuccess(response.product),
          ];
        }),
        catchError((err) => of(new fromAlert.actions.Error(err.message)))
      )
    )
  );

  @Effect()
  delProduct = this.actions$.pipe(
    ofType<actions.DeleteProduct>(actions.StockActionsTypes.DELETE_PRODUCT),
    switchMap((action) =>
      this.stockService.delProduct(action.id).pipe(
        switchMap((response) => {
          return [
            new fromAlert.actions.Success({
              type: 'success',
              message: 'Produto deletado com sucesso...',
            }),
            new actions.DeleteProductSuccess(action.id),
          ];
        }),
        catchError((err) => of(new fromAlert.actions.Error(err.message)))
      )
    )
  );
}
