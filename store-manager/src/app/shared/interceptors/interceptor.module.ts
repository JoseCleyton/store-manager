import { Store } from '@ngrx/store';
import { LoadingService } from './../../services/loading/loading.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable, NgModule } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import * as fromAlert from '../alert/alert/state/index';
import { AppState } from 'src/app/state';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private store$: Store<AppState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('store-token') === null) {
      return next.handle(req);
    } else {
      const dupReq = req.clone({
        setHeaders: {
          'store-token': sessionStorage.getItem('store-token'),
        },
      });
      this.loadingService.requestStarted();
      return next.handle(dupReq).pipe(
        catchError((error) => {
          this.loadingService.requestEnded();
          return throwError(error);
        }),
        finalize(() => {
          this.loadingService.requestEnded();
        })
      );
    }
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})
export class Interceptor {}
