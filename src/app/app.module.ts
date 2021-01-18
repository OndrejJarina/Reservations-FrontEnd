import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmsComponent } from './films/films.component';
import { HomeComponent } from './home/home.component';
import { NotAvailableComponent } from './not-available/not-available.component';
import { TicketsComponent } from './tickets/tickets.component';
import { OneFilmComponent } from './films/one-film/one-film.component';
import { EditFilmComponent } from './films/edit-film/edit-film.component';
import {FormsModule} from "@angular/forms";
import { UserLoginComponent } from './user-login/user-login.component';
import {HttpClientModule} from "@angular/common/http";
import { CreateAccountComponent } from './create-account/create-account.component';
import { ScreeningComponent } from './films/screening/screening.component';
import { ScreeningTableComponent } from './films/screening-table/screening-table.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    HomeComponent,
    NotAvailableComponent,
    TicketsComponent,
    OneFilmComponent,
    EditFilmComponent,
    UserLoginComponent,
    CreateAccountComponent,
    ScreeningComponent,
    ScreeningTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
