import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  constructor(private httpClient: HttpClient) {

  }

  newUser(user: User): Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/auth/signup', user);
  }
}
