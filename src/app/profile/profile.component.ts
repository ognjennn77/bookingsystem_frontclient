import { Component, OnInit, TemplateRef } from '@angular/core';
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
  image: string = "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";

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
  private rating: TemplateRef<any>;
  private modalRef: BsModalRef;

  constructor(private profileService: ProfileService, private route: ActivatedRoute, private modalService: BsModalService, ) {
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
        if (this.user.image.image != null)
          this.image = this.user.image.image;

        console.log(this.user.id)
        this.profileService.getReservationForAccommodation(this.user.id).subscribe(
          (response) => {
            this.reservations = response.json();
            this.modalRef = this.modalService.show(this.rating);
          }
        )
      }
    )
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
