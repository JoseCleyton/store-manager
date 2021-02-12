import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state';
import { Store, select } from '@ngrx/store';
import { Product } from '../models/product.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

import * as fromPointSale from '../point-sale/state/index';
import * as fromClient from '../client/client-edit/state/index';
import { Iten } from '../models/iten.model';
import { Checkout } from '../models/checkout.model';
import * as fromCheckout from './state/index';
import * as fromAlert from '../shared/alert/alert/state/index';
import * as fromStock from '../stock/state/index';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public listItens: Iten[] = [];
  public checkout: Checkout;

  public itemsEdit = [];

  public subTotal = 0;

  public formClient: FormGroup;

  public clients = [];
  public paymentType = '';

  public subscription: Subscription = new Subscription();

  constructor(
    private store$: Store<AppState>,
    public dialogRef: MatDialogRef<CheckoutComponent>
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(new fromClient.actions.ListClients());
    this.store$.dispatch(new fromStock.actions.ListStock());
    this.subscribeToCheckout();
    this.subscribeToListClients();
    this.subscribeToCheckoutSale();

    this.formClient = new FormGroup({
      client: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.onNoClick();
  }

  public selectItem(iten: Iten): void {
    if (!this.itemsEdit.includes(iten.id)) {
      this.itemsEdit.push(iten.id);
    } else {
      this.itemsEdit.splice(this.itemsEdit.indexOf(iten.id), 1);
    }
  }

  public changeQuantity(product: Product, quantity: number): void {
    if (quantity === 0) {
      this.checkout.listItens.splice(
        this.checkout.listItens.indexOf(product),
        1
      );
      this.subTotal = 0;
      this.calculateSubTotal();
    } else {
      product.quantity = quantity;
      this.subTotal = 0;
      this.calculateSubTotal();
    }
  }

  public concluir(formDirective: FormGroupDirective): void {
    this.checkout.client = this.formClient.get('client').value;
    let percentage =
      (this.checkout.orderValue * this.checkout.percentageDiscount) / 100;

    if (this.checkout.discountMoney > this.subTotal) {
      this.store$.dispatch(
        new fromAlert.actions.Warning(
          'Valor do desconto maior que valor da venda!'
        )
      );
      return;
    }
    const products = this.getStock();
    let productsMissing: Iten[] = [];

    products.forEach((product) => {
      this.listItens.forEach((iten) => {
        if (product._id === iten.product._id) {
          if (iten.quantity > product.quantity) {
            productsMissing.push(iten);
          }
        }
      });
    });

    if (productsMissing.length > 0) {
      let response = '';
      productsMissing.forEach((p) => {
        response =
          response +
          'Quantidade indisponível: ' +
          p.product.name +
          ' - ' +
          p.quantity +
          ' \n';
      });
      this.store$.dispatch(new fromAlert.actions.Warning(response));
      return;
    }
    this.store$.dispatch(new fromCheckout.actions.CheckoutSale(this.checkout));
  }

  public subscribeToCheckout(): void {
    this.subscription.add(
      this.store$
        .pipe(select(fromPointSale.selectors.selectCheckout))
        .subscribe((state) => {
          if (state) {
            this.checkout = state;
            this.paymentType = this.checkout.paymentType;
            this.listItens = this.checkout.listItens;
            this.calculateSubTotal();
          }
        })
    );
  }

  public subscribeToCheckoutSale(): void {
    this.subscription.add(
      this.store$
        .pipe(select(fromCheckout.selectors.selectCheckoutSale))
        .subscribe((state) => {
          if (state) {
            if (state.fidelity) {
              this.store$.dispatch(
                new fromAlert.actions.Success({
                  type: 'warning',
                  message: 'Cliente conseguiu atingir à FIDELIDADE',
                })
              );
            } else {
              this.store$.dispatch(
                new fromAlert.actions.Success({
                  type: 'warning',
                  message: 'Fidelidade: ' + state.qntFidelity,
                })
              );
            }
          }
        })
    );
  }

  private calculateSubTotal(): void {
    this.listItens.filter((iten) => {
      this.subTotal += iten.product.price * iten.quantity;
    });
    this.checkout.orderValue = this.subTotal - this.checkout.discountMoney;
  }

  public subscribeToListClients(): void {
    this.subscription.add(
      this.store$
        .pipe(select(fromClient.selectors.selectClients))
        .subscribe((state) => {
          this.clients = state;
        })
    );
  }

  private getStock(): Product[] {
    let products: Product[];
    this.subscription.add(
      this.store$
        .pipe(select(fromStock.selectors.selectProducts))
        .subscribe((state) => {
          products = [...state];
        })
    );
    return products;
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.store$.dispatch(new fromCheckout.actions.ResetCheckout());
  }
}
