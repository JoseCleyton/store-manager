import { CheckoutComponent } from './../checkout/checkout.component';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-point-sale',
  templateUrl: './point-sale.component.html',
  styleUrls: ['./point-sale.component.scss'],
})
export class PointSaleComponent implements OnInit {
  public listItens: Product[] = [];
  public time;
  public day: string;
  public stock: Product[] = [];
  public formProduct: FormGroup;
  public itemsEdit = [];
  public subTotal = 0;

  public paymentType = '';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.formProduct = new FormGroup({
      product: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    });

    this.time = this.getFullDate();
    this.day = this.getDayName(new Date().getDay());

    this.stock = [
      {
        id: '1',
        name: 'Fogão',
        price: 89,
        quantity: 30,
      },
      {
        id: '2',
        name: 'Toalha',
        price: 20,
        quantity: 20,
      },
      {
        id: '3',
        name: 'Geladeira',
        price: 58,
        quantity: 20,
      },
      {
        id: '4',
        name: 'Sofá',
        price: 96,
        quantity: 20,
      },
      {
        id: '5',
        name: 'Cama',
        price: 150.7,
        quantity: 20,
      },
    ];
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

  public addProductToList(formDirective: FormGroupDirective) {
    const product: Product = this.formProduct.get('product').value;
    product.quantity = this.formProduct.get('quantity').value;
    this.listItens.push(product);

    formDirective.resetForm()
    this.formProduct.reset();
    
    this.subTotal = 0;
    this.listItens.filter((p) => {
      this.subTotal += p.price * p.quantity;
    });
  }

  public closeOrder() {}

  public selectItem(product: Product) {
    if (!this.itemsEdit.includes(product.id)) {
      this.itemsEdit.push(product.id);
    } else {
      this.itemsEdit.splice(this.itemsEdit.indexOf(product.id), 1);
    }
  }

  public changeQuantity(product: Product, quantity: number) {
    if (quantity == 0) {
      this.listItens.splice(this.listItens.indexOf(product), 1);
      this.subTotal = 0;
      this.listItens.filter((p) => {
        this.subTotal += p.price * p.quantity;
      });
    } else {
      product.quantity = quantity;
      this.subTotal = 0;
      this.listItens.filter((p) => {
        this.subTotal += p.price * p.quantity;
      });
    }
  }

  public selectPaymentType(type: string) {
    this.paymentType = type;
  }

  openDialog() {
    this.dialog.open(CheckoutComponent);
  }
}