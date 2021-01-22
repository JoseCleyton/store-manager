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

  constructor(private dialog: MatDialog, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(new fromClient.actions.ListClients());
    this.subscribeToClients();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public changeIsActive(id: string) {
    this.id = id;
  }

  public addClient() {
    this.dialog.open(ClientEditComponent);
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
}
