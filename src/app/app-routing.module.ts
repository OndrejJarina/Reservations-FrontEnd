import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilmsComponent} from "./films/films.component";
import {TicketsComponent} from "./tickets/tickets.component";
import {HomeComponent} from "./home/home.component";
import {NotAvailableComponent} from "./not-available/not-available.component";
import {OneFilmComponent} from "./films/one-film/one-film.component";
import {EditFilmComponent} from "./films/edit-film/edit-film.component";
import {UserLoginComponent} from "./user-login/user-login.component";

const allRoutes: Routes = [
  {
    path: 'films', component: FilmsComponent, children: [
      {
        path: ':id', component: OneFilmComponent
      },
      {path: ':id/edit-film', component: EditFilmComponent},
      {path: '', component: OneFilmComponent}
    ]
  },
  {
    path: 'tickets', component: TicketsComponent},
  {
    path: 'home', component: HomeComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch:"full"
  },
  {
    path: 'not-available', component: NotAvailableComponent
  },
  {path: 'user-login', component: UserLoginComponent},
  {
    path: '**', redirectTo: '/not-available'
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(allRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
