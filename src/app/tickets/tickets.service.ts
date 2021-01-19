import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Ticket} from "../ticket";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private httpClient: HttpClient) {

  }

  postTicket(new_ticket: Ticket): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/ticket', new_ticket);
  }

  getTicketsForCustomer(user_id: string){
    return this.httpClient.get("http://localhost:8080/api/ticket/customer/"+user_id)
      .pipe(map((responseData: { [key: string]: Ticket }) => {
          const postsArray: Ticket[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push(responseData[key])
            }
          }
          return postsArray;
        })
      );
  }
}
