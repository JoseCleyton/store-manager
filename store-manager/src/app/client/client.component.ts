import { ClientDelComponent } from './client-del/client-del.component';
import { AppState } from 'src/app/state';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromClient from '../client/client-edit/state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  public id = '';
  public subscription: Subscription = new Subscription();

  public clients = [];
  public selectedClient: any;

  constructor(private dialog: MatDialog, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(new fromClient.actions.ListClients());
    this.subscribeToClients();
    this.subscribeSelectedClient();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public changeIsActive(client: any) {
    if (
      this.selectedClient === undefined ||
      this.selectedClient._id !== client._id
    ) {
      this.store$.dispatch(new fromClient.actions.SelectClient(client));
    } else {
      this.store$.dispatch(new fromClient.actions.SelectClient(undefined));
    }
  }

  public addClient() {
    this.dialog.open(ClientEditComponent);
    this.store$.dispatch(new fromClient.actions.SelectClient(undefined));
  }

  public subscribeToClients() {
    this.subscription.add(
      this.store$
        .pipe(select(fromClient.selectors.selectClients))
        .subscribe((state) => {
          this.clients = state;
        })
    );
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

  public editClient() {
    this.dialog.open(ClientEditComponent);
  }

  public delClient() {
    this.dialog.open(ClientDelComponent);
  }
}
