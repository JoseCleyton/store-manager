import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import * as fromAlert from '../alert/state/index';
import { AppState } from 'src/app/state';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  public alertsSuccess = [];
  public alertsErrs = [];
  public alertsWarning = [];
  public subscription: Subscription = new Subscription();

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeToAlertsSuccess();
    this.subscribeToAlertsErrs();
    this.subscribeToAlertsWarning();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public subscribeToAlertsSuccess() {
    this.subscription.add(
      this.store$
        .pipe(select(fromAlert.selectors.selectAlertsSuccess))
        .subscribe((state) => {
          this.alertsSuccess = state;
        })
    );
  }

  public subscribeToAlertsErrs() {
    this.subscription.add(
      this.store$
        .pipe(select(fromAlert.selectors.selectAlertsErrs))
        .subscribe((state) => {
          this.alertsErrs = state;
        })
    );
  }
  public subscribeToAlertsWarning() {
    this.subscription.add(
      this.store$
        .pipe(select(fromAlert.selectors.selectAlertsWarning))
        .subscribe((state) => {
          this.alertsWarning = state;
        })
    );
  }
  public closeAlertError() {
    this.store$.dispatch(new fromAlert.actions.ResetAlert());
  }
}
