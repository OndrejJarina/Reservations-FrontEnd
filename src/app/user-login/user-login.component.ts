import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../auth.service";
import {NgForm} from "@angular/forms";
import {Result} from "../result";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  @ViewChild('thisForm') editForm: NgForm;

  saveResult = 4;

  constructor(private router: Router,
              private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  create() {
    this.editForm.setValue({
      username: "",
      password: ""
    })
  }

  onPost() {
    this.authService.login(this.editForm.value.username, this.editForm.value.password).subscribe(
      () => {
      }, () => {
        this.saveResult = Result.UNSUCCESSFUL;
      }, () => {
        this.saveResult = Result.SUCCESSFUL;
        this.router.navigate(["../"]);
      }
    )
  }
}
