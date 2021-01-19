import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {User} from "../user";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  name: string;
  selected: User;
  userInvalid = true;
  private email: string;
  constructor(private authService:AuthService,
              private change: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.selected = new User();
    this.authService.user.subscribe(user=>{
      this.email = user.email;
      this.authService.getUser(this.email).subscribe(result=>{
        this.selected = result;
        this.userInvalid = false;
        console.log(this.selected);
        this.change.detectChanges();
      });
      this.change.detectChanges();
    });

  }

}
