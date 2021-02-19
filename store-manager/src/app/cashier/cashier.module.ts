import { CashierService } from './../services/cashier/cashier.service';
import { MatCardModule } from '@angular/material/card';
import { CashierComponent } from './cashier.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashierRoutingModule } from './cashier-routing.module';

@NgModule({
  declarations: [CashierComponent],
  imports: [CommonModule, CashierRoutingModule, MatCardModule],
  providers: [CashierService],
})
export class CashierModule {}
