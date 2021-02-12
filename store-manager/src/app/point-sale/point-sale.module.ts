import { ShortDescriptionPipe } from './../shared/pipe/short-description.pipe';
import { CheckoutModule } from './../checkout/checkout.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { PointSaleComponent } from './point-sale.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointSaleRoutingModule } from './point-sale-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PointSaleComponent],
  imports: [
    CommonModule,
    PointSaleRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
    CheckoutModule
  ],
  exports: [PointSaleComponent]
})
export class PointSaleModule {}
