import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Existinguser} from "./existinguser";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";

export interface AuthResponse{
  account_type: string;
  email:string,
  token:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<Existinguser>(null);

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string){
    console.log({email: email, password: password});
    return this.httpClient.post<AuthResponse>('http://localhost:8080/api/auth/login', {email: email, password: password})
      .pipe(catchError(this.handleError), tap(resData => {
        const existingUser = new Existinguser();
        existingUser.account_type = resData.account_type;
        existingUser.email = resData.email;
        existingUser.token = resData.token;
        this.user.next(existingUser);
      }));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    return throwError(errorMessage);
  }
}
