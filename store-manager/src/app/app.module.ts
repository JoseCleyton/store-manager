import { LoadingService } from './services/loading/loading.service';
import { LoadingComponent } from './loading/loading.component';
import { StateModule } from './state/state.module';
import { AuthGuardService } from './services/auth/auth-guard';
import { LoginService } from './services/auth/login.service';
import { FeatureModule } from './feature/feature.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    BrowserAnimationsModule,
    FeatureModule,
    HttpClientModule,
    StateModule,
    SharedModule,
  ],
  providers: [LoginService, AuthGuardService, LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
