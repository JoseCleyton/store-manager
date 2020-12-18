import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-point-sale',
  templateUrl: './point-sale.component.html',
  styleUrls: ['./point-sale.component.scss'],
})
export class PointSaleComponent implements OnInit {
  public qtd: number = 0;
  public listItens = [];
  constructor() {}

  ngOnInit(): void {}

  public changeIsActive(id: string) {
    if (this.listItens.includes(id)) {
      this.listItens[this.listItens.indexOf(id)] = undefined;
    } else {
      this.listItens.push(id);
    }
  }
  public increaseQuantity(id: string) {
    this.qtd++;
  }

  public decreaseQuantity(id: string) {
    if (this.qtd === 0) return;
    this.qtd--;
  }
}
