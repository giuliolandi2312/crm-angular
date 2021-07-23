import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';

import { Observable, throwError,} from 'rxjs';
import { tap, finalize,  catchError  } from 'rxjs/operators'

/** Pass untouched request through to the next request handler. */
@Injectable()
export class EpicInterceptor implements HttpInterceptor {

    constructor(private authservice: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let ok: string;

      let authReq: HttpRequest<any> = req;
      if(this.authservice.isLogged) {
          authReq = req.clone({ headers: req.headers.set('Authorization','Bearer '+ this.authservice.currentUser.accessToken).set('X-TENANT-ID','fe_0221')});
      }
    return next.handle(authReq)
    .pipe(
        tap(
            event => {ok = event instanceof HttpResponse ? 'succeded' : ''
        },
        error => { }
        ),
        catchError((error: HttpErrorResponse) => {
            return throwError(error);
        
        }),
        finalize(() => {


        })
        )
    
  }
}
