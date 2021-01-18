import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Screening} from "../../screening";
import {ScreeningService} from "../screening/screening.service";
import {Film} from "../../film";
import {FilmsService} from "../films.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-screening-table',
  templateUrl: './screening-table.component.html',
  styleUrls: ['./screening-table.component.scss']
})
export class ScreeningTableComponent implements OnInit {

  film: Film;
  screenings: Screening[];

  constructor(private screeningService: ScreeningService,
              private filmsService: FilmsService,
              private change: ChangeDetectorRef,
              private currentRoute: ActivatedRoute,
              private router: Router) {

  }

  private getScreenings(film_id: string) {
    this.screeningService.getScreeningByFilm(film_id).subscribe(results => {
      this.screenings = results;
      this.change.detectChanges();
    });
  }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params:Params)=> {
        this.getScreenings(params['id']);
      }
    )
  }

  toString_date(date_time: string): string {
    let year = date_time.slice(0, 4);
    let month = date_time.slice(5, 7);
    let day = date_time.slice(8, 10);
    return day + '.' + month + '.' + year;
  }

  toString_time(date_time: string): string {
    let hour = date_time.slice(11, 13);
    let minute = date_time.slice(14, 16);
    return hour + ':' + minute;
  }
}
