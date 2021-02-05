import { ProductDelComponent } from './product-del/product-del.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromStock from '../stock/state/index';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit, OnDestroy {
  public selectedProduct: any;
  public products: any[];

  public subscription: Subscription = new Subscription();

  constructor(private dialog: MatDialog, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(new fromStock.actions.ListStock());
    this.subscribeToStock();
    this.subscribeSelectedProduct();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  public addProduct() {
    this.dialog.open(ProductEditComponent);
    this.store$.dispatch(new fromStock.actions.SelectProduct(undefined));
  }

  public editProduct() {
    this.dialog.open(ProductEditComponent);
  }

  public delProduct() {
    this.dialog.open(ProductDelComponent);
  }

  public changeIsActive(product: any) {
    if (
      this.selectedProduct === undefined ||
      this.selectedProduct._id !== product._id
    ) {
      this.store$.dispatch(new fromStock.actions.SelectProduct(product));
    } else {
      this.store$.dispatch(new fromStock.actions.SelectProduct(undefined));
    }
  }

  public subscribeToStock() {
    this.subscription.add(
      this.store$
        .pipe(select(fromStock.selectors.selectProducts))
        .subscribe((state) => {
          this.products = state;
        })
    );
  }

  public subscribeSelectedProduct() {
    this.subscription.add(
      this.store$
        .pipe(select(fromStock.selectors.selectSelectedProduct))
        .subscribe((state) => {
          this.selectedProduct = state;
        })
    );
  }
}
