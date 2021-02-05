import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as fromClient from '../client-edit/state/index';
import { AppState } from 'src/app/state';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss'],
})
export class ClientEditComponent implements OnInit, OnDestroy {
  public formClient: FormGroup;
  public formDirective: FormGroupDirective;

  public subscription: Subscription = new Subscription();

  public selectedClient: any;

  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscribeSelectedClient();
    this.subscribeToClients();

    this.formClient = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
      ]),
    });

    this.buildFormEditClient();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public addClient(formDirective: FormGroupDirective) {
    this.formDirective = formDirective;
    let client: any = {
      name: this.formClient.get('name').value,
      address: this.formClient.get('address').value,
      phoneNumber: this.formClient.get('phoneNumber').value,
    };
    if (this.selectedClient) {
      client.id = this.selectedClient._id;
      this.store$.dispatch(new fromClient.actions.EditClient(client));
    } else {
      this.store$.dispatch(new fromClient.actions.AddClient(client));
    }
  }

  public subscribeToClients() {
    this.subscription.add(
      this.store$
        .pipe(select(fromClient.selectors.selectClients))
        .subscribe((state) => {
          if (state) {
            if (this.formDirective) {
              this.formDirective.resetForm();
              this.formClient.reset();
            }
          }
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

  public buildFormEditClient() {
    if (this.selectedClient) {
      this.formClient.get('name').setValue(this.selectedClient.name);
      this.formClient.get('address').setValue(this.selectedClient.address);
      this.formClient
        .get('phoneNumber')
        .setValue(this.selectedClient.phoneNumber);
    }
  }
}
