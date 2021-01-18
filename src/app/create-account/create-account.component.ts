import {Component, OnInit, ViewChild} from '@angular/core';
import {CreateAccountService} from "./create-account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../user";
import {NgForm} from "@angular/forms";
import {Result} from "../result";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  @ViewChild('thisForm') editForm: NgForm;

  user: User;
  saveResult = 4;

  constructor(private createAccountService: CreateAccountService,
              private router: Router,
              private currentRoute: ActivatedRoute) { }

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

  onPost(){
    this.user.name = this.editForm.value.firstname;
    this.user.surname = this.editForm.value.lastname;
    this.user.birth_date = this.editForm.value.birth_date;
    this.user.email = this.editForm.value.email_address;
    this.user.password = this.editForm.value.password1;
    if (this.editForm.value.adminCheck){
      this.user.accountType = "ADMIN";
    } else {
      this.user.accountType = "CUSTOMER";
    }
    console.log(this.user);
    this.createAccountService.newUser(this.user).subscribe( () => {
      }, () => {
        this.saveResult = Result.UNSUCCESSFUL;
      }, () => {
        this.saveResult = Result.SUCCESSFUL;
      }
    )
    if (this.saveResult == Result.SUCCESSFUL){

        this.router.navigate(["../"]);
    }
  }

}
