import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {FilmsService} from '../films.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FilmsComponent} from '../films.component';
import {Film} from '../../film';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss']
})
export class EditFilmComponent implements OnInit {

  @ViewChild('thisForm') editForm: NgForm;

  buttonMessage: string;

  film: Film;

  constructor(private filmsService: FilmsService,
              private currentRoute: ActivatedRoute,
              private router: Router,
              private filmsComponent: FilmsComponent,
              private change: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    console.log(this.currentRoute.snapshot.params.id);
    const id = this.currentRoute.snapshot.params.id;
    this.film = new Film();

    if (id === 'new') {
      this.buttonMessage = 'Save';

    } else {
      this.buttonMessage = 'Update';
      this.filmsService.getDatabaseFilm(id).subscribe(
        result => {
          this.film = result;
          this.create();
          this.change.detectChanges();
        }
      );
    }

    setTimeout(() => {
      this.create();
    }, 500);
  }

  create(): void {
    if (this.currentRoute.snapshot.params['id'] != 'new') {
      this.editForm.setValue(
        {
          film_name: this.film.name,
          runtime: this.film.runtime,
          description: this.film.description
        });
    }
  }

  onPost(): void {
    this.film.name = this.editForm.value.film_name;
    this.film.runtime = this.editForm.value.runtime;
    this.film.description = this.editForm.value.description;

    console.log(JSON.stringify(this.film));
    if (this.currentRoute.snapshot.params.id === 'new') {

      this.filmsService.newFilm(this.film).subscribe(() => {
          this.filmsComponent.ngOnInit();
          this.change.detectChanges();
        this.router.navigate(['./films']), {relativeTo: this.currentRoute, queryParamsHandling: 'preserve'};

        }
      );
    } else {
      this.filmsService.updateFilm(this.film).subscribe(() => {
        this.filmsComponent.ngOnInit();
        this.change.detectChanges();

        let navigation = "./films/" + this.currentRoute.snapshot.params.id;
        this.router.navigate([navigation]), {relativeTo: this.currentRoute.data, queryParamsHandling: 'preserve'};

      });
    }
  }
}
