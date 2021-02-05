import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientService } from './../services/client/client.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ClientComponent } from './client.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ClientDelComponent } from './client-del/client-del.component';

@NgModule({
  declarations: [ClientComponent, ClientEditComponent, ClientDelComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatBottomSheetModule,
  ],
  exports: [ClientComponent],
  providers: [ClientService],
})
export class ClientModule {}
