import { Component, OnInit } from '@angular/core';
import {FilmsService} from "../films.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Film} from "../../film";

@Component({
  selector: 'app-one-film',
  templateUrl: './one-film.component.html',
  styleUrls: ['./one-film.component.scss']
})
export class OneFilmComponent implements OnInit {

  private _selected_film: Film;
  private _filmInvalid: boolean = true;

  get filmInvalid(): boolean {
    return this._filmInvalid;
  }


  constructor(private filmsService: FilmsService,
              private router: Router,
              private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.currentRoute.snapshot.params['id']);
    this.currentRoute.params.subscribe(
      (params: Params) => {
        if (params['id'] != undefined) {
          this._selected_film = this.filmsService.findFilmById(params['id']);
          this._filmInvalid = false;
        }
      }, ()=> {
        this._filmInvalid = true;
      }
    )
  }

  get selected_film(): Film {
    return this._selected_film;
  }

  onEdit() {
    this.router.navigate(['edit-film'], {relativeTo: this.currentRoute, queryParamsHandling:'preserve'});
  }

  onNew() {
    this.router.navigate(['../new/edit-film'], {relativeTo: this.currentRoute, queryParamsHandling: ''});
  }

  onDelete() {

  }

}
