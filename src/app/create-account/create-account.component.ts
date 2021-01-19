import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../user";
import {NgForm} from "@angular/forms";
import {Result} from "../result";
import {AuthService} from "../auth.service";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  @ViewChild('thisForm') editForm: NgForm;

  user: User;
  saveResult = 4;

  constructor(private authService: AuthService,
              private router: Router,
              private currentRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user = new User();
    setTimeout(() => {
      //  this.create()
    });
  }

  create() {

    this.editForm.setValue(
      {
        firstname: this.user.name,
        lastname: this.user.surname,
        birthDate: this.user.birth_date,
        email_address: this.user.email,
        password1: this.user.password,
        adminCheck: false
      });

  }

  onPost() {
    this.user.name = this.editForm.value.firstname;
    this.user.surname = this.editForm.value.lastname;
    this.user.birth_date = this.editForm.value.birth_date;
    this.user.email = this.editForm.value.email_address;
    this.user.password = this.editForm.value.password1;
    if (this.editForm.value.adminCheck) {
      this.user.accountType = "ADMIN";
    } else {
      this.user.accountType = "CUSTOMER";
    }
    console.log(this.user);
    this.authService.newUser(this.user).subscribe(() => {
      }, () => {
        this.saveResult = Result.UNSUCCESSFUL;
      }, () => {
        this.saveResult = Result.SUCCESSFUL;
        this.authService.login(this.user.email, this.user.password).subscribe(() => {
        });
        this.router.navigate(["../"]);
      }
    )
    if (this.saveResult != Result.UNSUCCESSFUL) {

    }
  }

}
