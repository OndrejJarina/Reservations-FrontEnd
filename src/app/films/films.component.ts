import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FilmsService} from "./films.service";
import {Film} from "../film";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  private _films: Film[] = [];
  first: Film;

  constructor(private filmsService: FilmsService,
              private router: Router,
              private currentRoute: ActivatedRoute,
              private change: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.filmsService.getDatabaseFilms().subscribe(
      results => {
        this.films = results;
        this.first = this.films[0];
        this.films.sort((film1, film2) => {
          if (film1.name > film2.name) {
            return 1;
          }
          if (film1.name < film2.name) {
            return -1;
          }
          return 0;
        });
        this.change.detectChanges();
      }
    );
  }

  get films(): Film[] {

    return this._films;
  }

  set films(value: Film[]) {
    this._films = value;
  }
}
