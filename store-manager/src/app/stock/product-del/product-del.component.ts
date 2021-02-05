import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state';
import { ClientDelComponent } from './../../client/client-del/client-del.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromStock from '../state/index';

@Component({
  selector: 'app-product-del',
  templateUrl: './product-del.component.html',
  styleUrls: ['./product-del.component.scss'],
})
export class ProductDelComponent implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription();

  public selectedProduct: any;

  constructor(
    public dialogRef: MatDialogRef<ClientDelComponent>,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscribeSelectedProduct();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
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

  public delProduct() {
    this.store$.dispatch(
      new fromStock.actions.DeleteProduct(this.selectedProduct._id)
    );
    this.onNoClick();
  }
}
