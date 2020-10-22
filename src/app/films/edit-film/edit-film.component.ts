import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {FilmsService} from "../films.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FilmsComponent} from "../films.component";
import {Film} from "../../film";

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss']
})
export class EditFilmComponent implements OnInit {

  @ViewChild('thisForm') editForm: NgForm;

  buttonMessage: string;

  film: Film;

  currentId: string;

  constructor(private filmsService: FilmsService,
              private currentRoute: ActivatedRoute,
              private router: Router,
              private filmsComponent: FilmsComponent,
              private change: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    console.log(this.currentRoute.snapshot.params['id']);
    const id = this.currentRoute.snapshot.params['id'];
    this.film = new Film("","",0, "");

    this.currentId = id;
    if (id === 'new') {
      this.buttonMessage = 'Save';

    } else {
      this.buttonMessage = 'Update';
      this.film = this.filmsService.findFilmById(id);
    }

    setTimeout(() => {
      this.create()
    });
  }


  create() {
    if (this.currentRoute.snapshot.params['id'] != 'new') {
      this.editForm.setValue(
        {
          name: this.film.name,
          runtime: this.film.runtime,
          description: this.film.description
        });
    }
  }

  onPost() {


    this.router.navigate(['./films']), {relativeTo: this.currentRoute, queryParamsHandling: 'preserve'};
  }
}
