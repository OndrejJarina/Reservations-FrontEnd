import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'vaii-semestralka';

  loggedIn = false;
  private userLog: Subscription;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.resume();
    this.userLog = this.authService.user.subscribe(user => {
      this.loggedIn = !!user;
    });
  }

  onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['/user-login']);
    localStorage.removeItem('logged_user');
  }
}
