import {Injectable} from '@angular/core';
import {Film} from "../film";

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  private _default_description: string = "Maecenas consectetur risus scelerisque tortor vestibulum finibus sed et lacus. Mauris eu lorem quis velit aliquam eleifend in sit amet leo. Nulla nec elit neque. Suspendisse potenti. Sed consequat augue a dolor dictum mollis. Praesent non convallis odio. Nullam arcu ante, placerat in libero id, consectetur vulputate tellus. Donec luctus, diam sed consequat feugiat, nulla neque sollicitudin sem, malesuada semper diam turpis rhoncus neque. In suscipit interdum urna eget sagittis. Mauris a justo sed ligula blandit maximus eu ut ligula. Donec fringilla egestas erat, vel fermentum eros consectetur molestie. Donec varius nisl at ullamcorper efficitur. Donec efficitur congue nunc non consequat. Etiam scelerisque, metus ut accumsan aliquet, tellus neque vulputate nisl, in interdum sapien odio sed odio. Donec fermentum at est at aliquet. "
  private _films: Film[] = [
    new Film("47baeab7-6778-4d34-81ad-3414d0908a4f", "Avengers", 120, this._default_description),
    new Film("34333587-e6a3-4cdf-afb3-cf54c28dd093", "Shrek", 100, this._default_description),
    new Film("109780de-1b8e-4a66-9004-16817cb74124", "Citizen Kane", 140, this._default_description),
    new Film("4d83c87c-fdd1-4732-891b-41bd027ce32f", "Avatar", 90, this._default_description),
    new Film("59734a5f-7341-4897-a4a1-ab9fdd6ccaf8", "Star Wars", 100, this._default_description),
    new Film("f7924468-b23a-4528-ab28-1cbda0d53836", "Forrest Gump", 110, this._default_description),
    new Film("36ed57ac-73fc-4f70-8c58-9b1e8e9384b6", "Pulp Fiction", 99, this._default_description),
    new Film("e15703f0-b887-45a9-9ba6-ff087af4e707", "Seven", 97, this._default_description),
    new Film("7c223d6b-aba4-4dd1-aacb-e2c79a8b8ee6", "Rain Man", 100, this._default_description),
    new Film("9edbf9a1-c11a-4835-8a00-8afc8d1e4425", "Inception", 102, this._default_description)
  ];

  constructor() {
  }

  get films(): Film[] {
    return this._films;
  }

  public findFilmById(findId: string): Film {
    let result_F: Film = new Film("not-found", "", 0, "");

    this._films.forEach(function (selected) {
      if (selected.id == findId) {
        result_F = selected;
        return;
      }
    });
    return result_F;
  }

}
