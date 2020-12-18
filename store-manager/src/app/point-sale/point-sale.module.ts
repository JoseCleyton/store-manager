import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { PointSaleComponent } from './point-sale.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointSaleRoutingModule } from './point-sale-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PointSaleComponent],
  imports: [
    CommonModule,
    PointSaleRoutingModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [PointSaleComponent],
})
export class PointSaleModule {}
