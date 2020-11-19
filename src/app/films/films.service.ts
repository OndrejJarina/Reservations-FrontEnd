import { Injectable } from '@angular/core';
import { Film } from "../film";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private _films: Film[] = [];

  constructor(private httpClient: HttpClient) {

  }

  get films(): Film[] {
    return this._films;
  }

  getDatabaseFilms(): Observable<Film[]> {
    return this.httpClient.get('http://localhost:8080/api/film')
      .pipe(map((responseData: { [key: string]: Film}) => {
          const postsArray: Film[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push(responseData[key])
            }
          }
          return postsArray;
        })
      );
  }

  getDatabaseFilm(id: string): Observable<Film>{
    return this.httpClient.get<Film>('http://localhost:8080/api/film/'+id);
  }

  updateFilm(film: Film){
    return this.httpClient.put('http://localhost:8080/api/film', film);
  }

  newFilm(film: Film): Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/film', film.toJSON());

  }

  deleteFilm(id: string) {
    return this.httpClient.delete('http://localhost:8080/api/film/'+id);
  }

}
