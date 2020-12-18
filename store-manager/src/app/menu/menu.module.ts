import { MenuComponent } from './menu.component';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, MatCardModule],
  exports: [MenuComponent],
})
export class MenuModule {}
