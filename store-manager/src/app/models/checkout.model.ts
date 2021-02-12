import { Product } from './product.model';
export interface Checkout {
  _id?: string;
  client?: string;
  paymentType: string;
  orderValue?: number;
  percentageDiscount?: number;
  discountMoney?: number;
  listItens?: Product[];
}
