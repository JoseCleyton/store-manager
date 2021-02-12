import { Iten } from './../models/iten.model';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { CheckoutComponent } from './../checkout/checkout.component';
import { Product } from '../models/product.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as fromStock from '../stock/state/index';
import { AppState } from '../state';
import * as fromPointSale from './state/index';
import { Checkout } from '../models/checkout.model';

@Component({
  selector: 'app-point-sale',
  templateUrl: './point-sale.component.html',
  styleUrls: ['./point-sale.component.scss'],
})
export class PointSaleComponent implements OnInit, OnDestroy {
  public listItens: Iten[] = [];
  public idIten = 1;
  public time;
  public day: string;
  public stock: Product[] = [];
  public formProduct: FormGroup;
  public formDiscount: FormGroup;
  public itemsEdit = [];
  public subTotal = 0;

  public paymentType = '';

  public subscription: Subscription = new Subscription();

  constructor(public dialog: MatDialog, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(new fromStock.actions.ListStock());
    this.subscribeToStock();
    this.formProduct = new FormGroup({
      product: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    });

    this.formDiscount = new FormGroup({
      percentageDiscount: new FormControl(0, [Validators.required]),
      discountMoney: new FormControl(0, [
        Validators.required,
        Validators.min(1),
      ]),
    });

    this.time = this.getFullDate();
    this.day = this.getDayName(new Date().getDay());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  public getFullDate(): any {
    return (
      new Date().getDate() +
      ' | ' +
      (new Date().getMonth() + 1) +
      ' | ' +
      new Date().getFullYear()
    );
  }

  public getDayName(day): string {
    const dayName = {
      0: 'Domingo',
      1: 'Segunda-Feira',
      2: 'Terça-Feira',
      3: 'Quarta-Feira',
      5: 'Quinta-Feira',
      6: 'Sexta-Feira',
      7: 'Sábado',
    };

    return dayName[day];
  }

  public addProductToList(formDirective: FormGroupDirective): void {
    const product: Product = this.formProduct.get('product').value;
    const quantity = this.formProduct.get('quantity').value;
    let contains = false;

    this.listItens.forEach((p) => {
      if (product._id === p.product._id) {
        p.quantity += quantity;
        contains = true;
        return;
      }
    });
    if (!contains) {
      const iten: Iten = {
        id: this.idIten,
        quantity: quantity,
        product: product,
      };
      this.idIten++;
      this.listItens.push(iten);
    }

    formDirective.resetForm();
    this.formProduct.reset();

    this.subTotal = 0;
    this.calculateSubTotal();
  }

  public selectItem(iten: Iten): void {
    if (!this.itemsEdit.includes(iten.id)) {
      this.itemsEdit.push(iten.id);
    } else {
      this.itemsEdit.splice(this.itemsEdit.indexOf(iten.id), 1);
    }
  }

  public changeQuantity(product: Product, quantity: number) {
    if (quantity == 0) {
      this.listItens.splice(this.listItens.indexOf(product), 1);
      this.subTotal = 0;
      this.calculateSubTotal();
    } else {
      product.quantity = quantity;
      this.subTotal = 0;
      this.calculateSubTotal();
    }
  }

  public selectPaymentType(type: string) {
    this.paymentType = type;
  }

  openDialog() {
    let checkout: Checkout = {
      listItens: this.listItens,
      paymentType: this.paymentType,
      discountMoney: this.formDiscount.get('discountMoney').value,
    };
    this.store$.dispatch(new fromPointSale.actions.SelectCheckout(checkout));
    this.dialog.open(CheckoutComponent);
  }

  public subscribeToStock(): void {
    this.subscription.add(
      this.store$
        .pipe(select(fromStock.selectors.selectProducts))
        .subscribe((state) => {
          this.stock = state;
        })
    );
  }
  private calculateSubTotal(): void {
    this.listItens.filter((iten) => {
      this.subTotal += iten.product.price * iten.quantity;
    });
  }
}
