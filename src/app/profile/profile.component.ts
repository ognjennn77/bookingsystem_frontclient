import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { LoggedUtils } from "../../utils/logged.utils"
import { Http, Headers } from '@angular/http';
import { ProfileService } from './profile.service'
import { User } from '../model/user.model'
import { ActivatedRoute } from '@angular/router';
import { Data } from '@angular/router';
import { Reservation } from '../model/reservation.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  user: User;
  image: string = 'assets/img/empty-profile.png'
  usernameE: boolean;
  firstnameE: boolean;
  lastnameE: boolean;
  emailE: boolean;
  phoneE: boolean;
  cityE: boolean;
  editE: boolean;
  saveE: boolean;
  changeE: boolean;
  cc: boolean = true;
  imgChanged: boolean = false;

  private reservations: Reservation[];

  private score: number = 0;
  private comm: string = "";
  @ViewChild('myModalClose') myModalClose: ElementRef;

  constructor(private profileService: ProfileService, private route: ActivatedRoute) {
    this.usernameE = false;
    this.firstnameE = false;
    this.lastnameE = false;
    this.emailE = false;
    this.phoneE = false;
    this.cityE = false;
    this.editE = false;
    this.saveE = true;
    this.changeE = true;
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.user = data.profileResolver;
        try {
          if ((this.user.image.image === null) || (this.user.image.image === "")) { }
          else
            this.image = `data:image/jpeg;base64,${this.user.image.image}`;
          // this.image = this.user.image.image;
        }
        catch (e) {
          e.message;
        }

        this.profileService.getReservationForAccommodation(this.user.id).subscribe(
          (response) => {
            this.reservations = response.json();
            if (this.reservations.length > 0) {
              document.getElementById("openModalButton").click();
            }
          }
        )
      }
    )
  }

  clickStar(score: number) {
    this.score = score;
  }

  late(reservation: Reservation) {
    this.reservations.splice(this.reservations.indexOf(reservation), 1);
    if (this.reservations.length == 0) {
      this.myModalClose.nativeElement.click();
    }
  }

  rate(reservation: Reservation) {
    if (this.score != 0) {
      let grade = this.score;
      let comment = this.comm;
      this.reservations.splice(this.reservations.indexOf(reservation), 1);
      if (this.reservations.length == 0) {
        this.myModalClose.nativeElement.click();
      }

      console.log(grade)
      console.log(comment)

      //kada napravim komentar sa ocenom, setovati u registraciju da je ocenjena i da se ne pojavljuje vise
    }
  }

  edit() {
    this.usernameE = true;
    this.firstnameE = true;
    this.lastnameE = true;
    this.emailE = true;
    this.phoneE = true;
    this.cityE = true;
    this.editE = true;
    this.saveE = false;
    this.changeE = false;
  }

  save() {
    this.usernameE = false;
    this.firstnameE = false;
    this.lastnameE = false;
    this.emailE = false;
    this.phoneE = false;
    this.cityE = false;
    this.editE = false;
    this.saveE = true;
    this.changeE = true;

    location.reload();
  }

}
