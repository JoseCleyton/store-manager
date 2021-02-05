import { AppState } from 'src/app/state';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  Validators,
  FormGroup,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromStock from '../state/index';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  public formProduct: FormGroup;
  public formDirective: FormGroupDirective;

  public subscription: Subscription = new Subscription();

  public selectedProduct: any;

  constructor(
    public dialogRef: MatDialogRef<ProductEditComponent>,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscribeSelectedProduct();
    this.subscribeToStock();

    this.formProduct = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.min(1)]),
      quantity: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
    });

    this.buildFormEditProduct();
  }

  ngOnDestroy() {
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

  public subscribeToStock() {
    this.subscription.add(
      this.store$
        .pipe(select(fromStock.selectors.selectProducts))
        .subscribe((state) => {
          if (state) {
            if (this.formDirective) {
              this.formDirective.resetForm();
              this.formProduct.reset();
            }
          }
        })
    );
  }

  public addProduct(formDirective: FormGroupDirective) {
    this.formDirective = formDirective;
    let product: any = {
      name: this.formProduct.get('name').value,
      price: this.formProduct.get('price').value,
      quantity: this.formProduct.get('quantity').value,
    };
    if (this.selectedProduct) {
      product.id = this.selectedProduct._id;
      this.store$.dispatch(new fromStock.actions.EditStock(product));
    } else {
      this.store$.dispatch(new fromStock.actions.AddStock(product));
    }
  }

  public buildFormEditProduct() {
    if (this.selectedProduct) {
      this.formProduct.get('name').setValue(this.selectedProduct.name);
      this.formProduct.get('price').setValue(this.selectedProduct.price);
      this.formProduct.get('quantity').setValue(this.selectedProduct.quantity);
    }
  }
}
