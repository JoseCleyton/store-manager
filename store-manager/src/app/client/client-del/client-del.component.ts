import { ClientService } from 'src/app/services/client/client.service';
import { AppState } from 'src/app/state';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import * as fromClient from '../client-edit/state/index';

@Component({
  selector: 'app-client-del',
  templateUrl: './client-del.component.html',
  styleUrls: ['./client-del.component.scss'],
})
export class ClientDelComponent implements OnInit {
  public subscription: Subscription = new Subscription();

  public selectedClient: any;

  constructor(
    public dialogRef: MatDialogRef<ClientDelComponent>,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscribeSelectedClient();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public subscribeSelectedClient() {
    this.subscription.add(
      this.store$
        .pipe(select(fromClient.selectors.selectSelectedClient))
        .subscribe((state) => {
          this.selectedClient = state;
        })
    );
  }

  public delClient() {
    this.store$.dispatch(
      new fromClient.actions.DeleteClient(this.selectedClient._id)
    );
    this.onNoClick();
  }
}
