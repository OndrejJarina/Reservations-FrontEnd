import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Existinguser} from "./existinguser";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {User} from "./user";

export interface AuthResponse {
  account_type: string;
  email: string,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<Existinguser>(null);

  constructor(private httpClient: HttpClient) {
  }

  login(email: string, password: string) {
    console.log({email: email, password: password});
    return this.httpClient.post<AuthResponse>('http://localhost:8080/api/auth/login', {
      email: email,
      password: password
    })
      .pipe(catchError(AuthService.handleError), tap(resData => {
        const existingUser = new Existinguser();
        existingUser.account_type = resData.account_type;
        existingUser.email = resData.email;
        existingUser.token = resData.token;
        this.user.next(existingUser);
        let logged_user = JSON.stringify(existingUser);
        localStorage.setItem('logged_user', logged_user);
      }));
  }

  newUser(user: User): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', user);
  }

  logoutUser() {
    this.user.next(null);
  }

  resume() {
    const logged_in_user: {
      account_type: string,
      token: string,
      email: string
    } = JSON.parse(localStorage.getItem('logged_user'));

    if (!logged_in_user) {
      return;
    }

    let logged_in_user_obj = new Existinguser();
    logged_in_user_obj.email = logged_in_user.email;
    logged_in_user_obj.token = logged_in_user.token;
    logged_in_user_obj.account_type = logged_in_user.account_type;

    if (logged_in_user_obj.token){
      this.user.next(logged_in_user_obj);

    }

  }

  private static handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    return throwError(errorMessage);
  }

  getUser(email:string):Observable<User>{
    return this.httpClient.get<User>('http://localhost:8080/api/auth/user/'+email);
  }
}
