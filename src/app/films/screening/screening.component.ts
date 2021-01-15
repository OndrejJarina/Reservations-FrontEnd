import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Screening} from "../../screening";
import {ScreeningService} from "./screening.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.scss']
})
export class ScreeningComponent implements OnInit {

  @ViewChild('thisForm') editForm: NgForm;
  minPrice = 0;
  maxPrice = 25;
  private new_screening: Screening;

  constructor(private screeningService: ScreeningService,
              private currentRoute: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.new_screening = new Screening();
  }

  onSave(){
    this.new_screening.film_id = this.currentRoute.snapshot.params['id'];
    this.new_screening.date_time = this.editForm.value.date+'T'+this.editForm.value.time+'.000+00:00';
    this.new_screening.price = this.editForm.form.value.price;
    this.new_screening.count = this.editForm.form.value.count;
    this.screeningService.postScreening(this.new_screening).subscribe(
      ()=>{
        this.router.navigate(['./films', this.new_screening.film_id]);
      }
    );
  }

}
