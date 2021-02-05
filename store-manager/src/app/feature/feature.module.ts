import { StockModule } from './../stock/stock.module';
import { PointSaleModule } from './../point-sale/point-sale.module';
import { DashboardModule } from './../dashboard/dashboard.module';
import { ClientModule } from './../client/client.module';
import { MenuModule } from './../menu/menu.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';

@NgModule({
  declarations: [FeatureComponent],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    MenuModule,
    ClientModule,
    DashboardModule,
    PointSaleModule,
    StockModule
  ],
})
export class FeatureModule {}
