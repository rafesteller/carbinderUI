import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth = "";
    if (AuthService.isTokenExpired() != true) {
      console.log("not expired")
        auth = JSON.parse(AuthService.getToken()).token
    }
    console.log("auth")
    console.log(auth)

    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'auth': auth,
      },
    });

    return next.handle(req);
  }
}