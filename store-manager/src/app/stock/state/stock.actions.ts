import { Action } from '@ngrx/store';

export enum StockActionsTypes {
  ADD_STOCK = '[Stock] Add Stock',
  ADD_STOCK_SUCCESS = '[Stock] Add Stock success',

  LIST_STOCK = '[Stock] List Stocks',
  LIST_STOCK_SUCCESS = '[Stock] List Stocks success',

  EDIT_STOCK = '[Stock] Edit Stock',
  EDIT_STOCK_SUCCESS = '[Stock] Edit Stock Success',

  SELECT_PRODUCT = '[Stock] Select Product',

  DELETE_PRODUCT = '[Stock] Delete Product',
  DELETE_PRODUCT_SUCCESS = '[Stock] Delete Product Success',
}

export class AddStock implements Action {
  readonly type = StockActionsTypes.ADD_STOCK;
  constructor(public payload: any) {}
}

export class AddStockSuccess implements Action {
  readonly type = StockActionsTypes.ADD_STOCK_SUCCESS;
  constructor(public payload: any) {}
}

export class ListStock implements Action {
  readonly type = StockActionsTypes.LIST_STOCK;
  constructor() {}
}

export class ListStockSuccess implements Action {
  readonly type = StockActionsTypes.LIST_STOCK_SUCCESS;
  constructor(public payload: any[]) {}
}

export class EditStock implements Action {
  readonly type = StockActionsTypes.EDIT_STOCK;
  constructor(public payload: any) {}
}

export class EditStockSuccess implements Action {
  readonly type = StockActionsTypes.EDIT_STOCK_SUCCESS;
  constructor(public payload: any) {}
}

export class SelectProduct implements Action {
  readonly type = StockActionsTypes.SELECT_PRODUCT;
  constructor(public product: any) {}
}

export class DeleteProduct implements Action {
  readonly type = StockActionsTypes.DELETE_PRODUCT;
  constructor(public id: string) {}
}

export class DeleteProductSuccess implements Action {
  readonly type = StockActionsTypes.DELETE_PRODUCT_SUCCESS;
  constructor(public id: string) {}
}

export type StockActions =
  | AddStock
  | AddStockSuccess
  | ListStock
  | ListStockSuccess
  | SelectProduct
  | DeleteProduct
  | DeleteProductSuccess
  | EditStock
  | EditStockSuccess;
