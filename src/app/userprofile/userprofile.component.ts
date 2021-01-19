import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {User} from "../user";
import {TicketsService} from "../tickets/tickets.service";
import {Ticket} from "../ticket";
import {ScreeningService} from "../films/screening/screening.service";
import {Screening} from "../screening";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  name: string;
  selected: User;
  userInvalid = true;
  tickets: Ticket[] = [];

  private email: string;
  constructor(private authService:AuthService,
              private change: ChangeDetectorRef,
              private ticketService: TicketsService,
              private screeningService: ScreeningService) {
  }

  ngOnInit(): void {
    this.selected = new User();
    this.authService.user.subscribe(user=>{
      this.email = user.email;
      this.authService.getUser(this.email).subscribe(result=>{
        this.selected = result;
        this.userInvalid = false;
        console.log(this.selected);
        this.getTickets();
        this.change.detectChanges();
      });
      this.change.detectChanges();
    });


  }

  getTickets(){
    this.ticketService.getTicketsForCustomer(this.selected.id).subscribe(
      results=>{
        this.tickets = results;
      }
    );

  }
  getScreening(id: string):Screening{
    let screen1 = new Screening();
    this.screeningService.getScreening(id).subscribe(
       result=>{
         screen1 = result[0];

       }
     );
    return screen1;
  }



}
