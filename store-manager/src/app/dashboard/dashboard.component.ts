import { Subscription } from 'rxjs';
import { StockService } from './../services/stock/stock.service';
import { ClientService } from './../services/client/client.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

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

  public subscription: Subscription = new Subscription();

  constructor(
    private clientService: ClientService,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.getTotalClients();
    this.getTotalStock();
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
      this.clientService.getTotalClients().subscribe((total) => {
        this.totalClients = total.total;
      })
    );
  }

  public getTotalStock() {
    this.subscription.add(
      this.stockService.getTotalStock().subscribe((total) => {
        this.totalStock = total.total;
      })
    );
  }
}
