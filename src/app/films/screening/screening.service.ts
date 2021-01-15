import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Screening} from "../../screening";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  constructor(private httpClient: HttpClient) {

  }

  getScreeningByFilm(film_id: string){
    return this.httpClient.get('http://localhost:8080/api/screening/show/'+film_id)
      .pipe(map((responseData: { [key: string]: Screening }) => {
          const postsArray: Screening[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push(responseData[key])
            }
          }
          return postsArray;
        })
      );
  }

  postScreening(new_screening: Screening): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/screening', new_screening);
  }

  getScreening(id: string){
    return this.httpClient.get('http://localhost:8080/api/screening/'+id).pipe(map((responseData: { [key: string]: Screening }) => {
        const postsArray: Screening[] = [];
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
