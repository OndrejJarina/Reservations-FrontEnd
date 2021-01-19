import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {exhaustMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InterceptorAuthService implements HttpInterceptor{

  constructor(private authService:AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const reqClone = req.clone({headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.token)});
        console.log("request,", reqClone);
        return next.handle(reqClone);
      })
    );
  }



}
