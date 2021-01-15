import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FilmsService} from '../films.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Film} from '../../film';
import {FilmsComponent} from "../films.component";

@Component({
  selector: 'app-one-film',
  templateUrl: './one-film.component.html',
  styleUrls: ['./one-film.component.scss']
})
export class OneFilmComponent implements OnInit {

  private _selected_film: Film = new Film();
  private _filmInvalid = true;

  get filmInvalid(): boolean {
    return this._filmInvalid;
  }

  constructor(private filmsService: FilmsService,
              private filmsComponent: FilmsComponent,
              private router: Router,
              private currentRoute: ActivatedRoute,
              private change: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    console.log(this.currentRoute.snapshot.params.id);

    this.currentRoute.params.subscribe(
      (params: Params) => {

        if (params.id !== undefined) {
          this.filmsService.getDatabaseFilm(params.id).subscribe(
            result => {
              this._selected_film = result;
              this.change.detectChanges();
            }
          );
          this._filmInvalid = false;
        }
      }, () => {
        this._filmInvalid = true;
      }
    );
  }

  get selected_film(): Film {
    return this._selected_film;
  }

  set selected_film(value: Film) {
    this._selected_film = value;
  }

  onEdit() {
    this.router.navigate(['edit-film'], {relativeTo: this.currentRoute, queryParamsHandling: 'preserve'});
  }

  onNew() {
    if (!this.filmInvalid) {
      this.router.navigate(['../new/edit-film'], {relativeTo: this.currentRoute, queryParamsHandling: ''});
    } else {
      this.router.navigate(['new/edit-film'], {relativeTo: this.currentRoute, queryParamsHandling: ''});
    }
  }

  onDelete() {
    this.filmsService.deleteFilm(this.selected_film.id).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.currentRoute});
        this.filmsComponent.ngOnInit();
      }
    );
  }

  onNewScreening(){
    this.router.navigate(['new-screening'], {relativeTo: this.currentRoute, queryParamsHandling: 'preserve'});
  }

}
