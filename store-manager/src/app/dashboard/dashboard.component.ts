import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { StockService } from './../services/stock/stock.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import * as fromClient from '../client/client-edit/state/index';
import * as fromStock from '../stock/state/index';
import { AppState } from '../state';
import * as fromCashier from '../cashier/state/index';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public polarAreaChartLabels: Label[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail Sales',
    'Telesales',
    'Corporate Sales',
  ];
  public polarAreaChartData: SingleDataSet = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  public totalClients: number;
  public totalStock: number;
  public cashierValue: number;

  public subscription: Subscription = new Subscription();

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(new fromClient.actions.TotalClients());
    this.store$.dispatch(new fromStock.actions.TotalStock());
    this.store$.dispatch(new fromCashier.actions.CashierValue());
    this.getTotalClients();
    this.getTotalStock();
    this.getCashierValue();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public getTotalClients() {
    this.subscription.add(
      this.store$
        .pipe(select(fromClient.selectors.selectTotalClients))
        .subscribe((state) => {
          this.totalClients = state;
        })
    );
  }

  public getTotalStock() {
    this.subscription.add(
      this.store$
        .pipe(select(fromStock.selectors.selectTotalStock))
        .subscribe((state) => {
          this.totalStock = state;
        })
    );
  }
  public getCashierValue() {
    this.subscription.add(
      this.store$
        .pipe(select(fromCashier.selectors.selectCashierValue))
        .subscribe((state) => {
          this.cashierValue = state;
        })
    );
  }
}
