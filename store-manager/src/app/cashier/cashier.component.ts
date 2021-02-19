import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromCashier from './state/index';
@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss'],
})
export class CashierComponent implements OnInit, OnDestroy {
  public selectedPaymentType = 'money';
  public cashierValue: number;
  public moves = [];
  public movesAux = [];
  public subscription: Subscription = new Subscription();

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(new fromCashier.actions.CashierValue());
    this.store$.dispatch(new fromCashier.actions.ListMoves());
    this.getCashierValue();
    this.getMoves();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  public selectPaymentType(paymentType: string) {
    this.selectedPaymentType = paymentType;
    this.moves = this.movesAux.filter((m) => {
      if (m.paymentType === this.selectedPaymentType) return m;

      if (m.paymentType === 'credit' || m.paymentType === 'debit') {
        if (this.selectedPaymentType === 'card') {
          return m;
        }
      }
    });
  }
  public getCashierValue() {
    this.subscription.add(
      this.store$
        .pipe(select(fromCashier.selectors.selectCashierValue))
        .subscribe((state) => {
          this.cashierValue = state;
        })
    );
  }
  public getMoves() {
    this.subscription.add(
      this.store$
        .pipe(select(fromCashier.selectors.selectMoves))
        .subscribe((state) => {
          this.movesAux = state;
          this.moves = this.movesAux.filter((m) => {
            return m.paymentType === this.selectedPaymentType;
          });
        })
    );
  }
}
