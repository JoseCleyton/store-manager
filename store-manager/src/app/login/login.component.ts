import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../state';
import { select, Store } from '@ngrx/store';
import * as fromLogin from './state/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public formLogin: FormGroup;

  public subscription: Subscription = new Subscription();

  constructor(private route: Router, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.subscribeLogin();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  public authenticate() {
    this.store$.dispatch(
      new fromLogin.actions.Login({
        login: this.formLogin.get('login').value,
        password: this.formLogin.get('password').value,
      })
    );
  }

  public subscribeLogin() {
    this.subscription.add(
      this.store$
        .pipe(select(fromLogin.selectors.selectToken))
        .subscribe((state) => {
          if (state) {
            sessionStorage.setItem('store-token', state.token);
            this.route.navigateByUrl('feature/dashboard');
          }
        })
    );
  }
}
