import { Product } from '../../models/product.model';
import { StockActions, StockActionsTypes } from './stock.actions';

export interface StockState {
  products: Product[];
  selectedProduct: any;
  totalStock: number;
}

export const initialState: StockState = {
  products: [],
  selectedProduct: undefined,
  totalStock: undefined,
};

export function stockReducer(
  state = initialState,
  action: StockActions
): StockState {
  switch (action.type) {
    case StockActionsTypes.ADD_STOCK_SUCCESS: {
      return {
        ...state,
        products: [...state.products, action.payload.product],
      };
    }

    case StockActionsTypes.LIST_STOCK_SUCCESS: {
      return {
        ...state,
        products: action.payload,
      };
    }

    case StockActionsTypes.TOTAL_STOCK_SUCCESS: {
      return {
        ...state,
        totalStock: action.total,
      };
    }

    case StockActionsTypes.EDIT_STOCK_SUCCESS: {
      return {
        ...state,
        selectedProduct: undefined,
        products: state.products.map((c) => {
          if (c._id !== action.payload._id) return c;
          return action.payload;
        }),
      };
    }

    case StockActionsTypes.SELECT_PRODUCT: {
      return {
        ...state,
        selectedProduct: action.product,
      };
    }

    case StockActionsTypes.DELETE_PRODUCT_SUCCESS: {
      return {
        ...state,
        selectedProduct: undefined,
        products: state.products.filter((c) => c._id !== action.id),
      };
    }

    default:
      return state;
  }
}
