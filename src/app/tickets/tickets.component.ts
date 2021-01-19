import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {TicketsService} from "./tickets.service";
import {ScreeningService} from "../films/screening/screening.service";
import {FilmsService} from "../films/films.service";
import {Router} from "@angular/router";
import {Screening} from "../screening";
import {Film} from "../film";
import {NgForm} from "@angular/forms";
import {Ticket} from "../ticket";
import {Result} from "../result";
import {AuthService} from "../auth.service";
import {User} from "../user";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  @ViewChild('thisForm') ticketForm: NgForm;

  films: Film[] = [];
  screenings: Screening[] = [];
  dateSelected: boolean = false;
  currentprice: number = 0;
  totalPrice: number = 0;
  saveResult: Result = Result.NONE;
  freeSeats: number = 200;
  currentUser: User;

  constructor(private router: Router,
              private filmsService: FilmsService,
              private screeningService: ScreeningService,
              private ticketsService: TicketsService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getFilms();

    this.authService.user.subscribe(resUser =>{
      this.authService.getUser(resUser.email).subscribe(result=>{
        this.currentUser=result;
      })
    });
  }


  private getFilms() {
    this.filmsService.getDatabaseFilms().subscribe(results => {
      this.films = results;
    });
  }

  onFilmSelect() {
    this.getScreenings(this.ticketForm.form.value.filmSelect);
    this.dateSelected = false;

  }

  onDateSelect() {
    this.dateSelected = true;
    this.screenings.find(screening => {
      screening.id == this.ticketForm.form.value.dateSelect;
      this.currentprice = screening.price;
    });
  //  this.getFreeSeats();
  }


  private getScreenings(FilmId: string) {
    this.screeningService.getScreeningByFilm(FilmId).subscribe(
      results => {
        this.screenings = results;
      }
    );
  }

  onTicketCountChange() {
    this.totalPrice = this.ticketForm.form.value.ticketCount * this.currentprice;
  }

  onConfirm() {
    let ticket: Ticket;
    ticket = new Ticket();
    ticket.id = '';
    ticket.screening_id = this.ticketForm.form.value.dateSelect;
    ticket.count = this.ticketForm.form.value.ticketCount;
    ticket.user_id = this.currentUser.id;
    console.log(JSON.stringify(ticket));
    this.ticketsService.postTicket(ticket).subscribe(
       () => {
       }, () => {
         this.saveResult = Result.UNSUCCESSFUL;
       }, () => {
         this.saveResult = Result.SUCCESSFUL;
       }
     )
  }

  //
  // private getFreeSeats() {
  //
  //   this.theaterService.getTheater(this.currentScreeningHallId).subscribe(result => {
  //     this.freeSeats = result.number_of_seats;
  //   });
  //
  //   this.theaterService.getFreeSeats(this.currentScreeningHallId, this.ticketForm.form.value.dateSelect).subscribe(result => {
  //     console.log('pocet', result);
  //     if (result != -1) {
  //       this.freeSeats = result;
  //     }
  //   });
  // }

  toString_date(date_time:string):string{
    let year = date_time.slice(0,4);
    let month = date_time.slice(5,7);
    let day = date_time.slice(8,10);
    let hour = date_time.slice(11,13);
    let minute = date_time.slice(14, 16);
    return hour +':'+minute+' '+day+'.'+month+'.'+year;
  }
}
