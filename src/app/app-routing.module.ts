import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilmsComponent} from "./films/films.component";
import {TicketsComponent} from "./tickets/tickets.component";
import {HomeComponent} from "./home/home.component";
import {NotAvailableComponent} from "./not-available/not-available.component";

const allRoutes: Routes = [
  {
    path: 'films', component: FilmsComponent
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
