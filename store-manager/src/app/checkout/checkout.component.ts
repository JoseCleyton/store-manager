import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public listItens = [];

  public itemsEdit = [];

  public subTotal = 0;

  public formClient: FormGroup;

  public clients = [];

  constructor() {}

  ngOnInit(): void {
    this.listItens = [
      { id: '1', name: 'Geladeira', price: 200.0, quantity: 3 },
      { id: '2', name: 'Fogão', price: 150, quantity: 2 },
      { id: '3', name: 'Mesa', price: 59.8, quantity: 4 },
    ];

    this.formClient = new FormGroup({
      client: new FormControl('', [Validators.required]),
    });

    this.clients = [
      { id: '1', name: 'José' },
      { id: '2', name: 'Maria' },
      { id: '3', name: 'Maurício' },
      { id: '4', name: 'Lucas' },
    ];
    this.listItens.filter((p) => {
      this.subTotal += p.price * p.quantity;
    });
  }

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

  public concluir(formDirective: FormGroupDirective) {}
}
