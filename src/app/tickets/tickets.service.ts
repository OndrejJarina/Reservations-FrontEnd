import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Ticket} from "../ticket";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private httpClient: HttpClient) {

  }

  postTicket(new_ticket: Ticket): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/ticket', new_ticket);
  }
}
