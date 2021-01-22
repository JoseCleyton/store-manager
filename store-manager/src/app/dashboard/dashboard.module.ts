import { StockService } from './../services/stock/stock.service';
import { Interceptor } from '../shared/interceptors/interceptor.module';
import { ClientService } from './../services/client/client.service';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    MatCardModule,
    HttpClientModule,
    SharedModule,
    MatProgressSpinnerModule,
  ],
  providers: [ClientService, StockService],
})
export class DashboardModule {}
