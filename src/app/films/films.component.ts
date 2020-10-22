import {Component, OnInit} from '@angular/core';
import {FilmsService} from "./films.service";
import {Film} from "../film";

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  private _films: Film[];

  constructor(private theatersService: FilmsService) {

  }

  ngOnInit(): void {
    this._films = this.theatersService.films;
  }

  get films(): Film[] {
    return this._films;
  }
}
