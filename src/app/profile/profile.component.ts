import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { LoggedUtils } from "../../utils/logged.utils"
import { Http, Headers } from '@angular/http';
import { ProfileService } from './profile.service'
import { User } from '../model/user.model'
import { ActivatedRoute } from '@angular/router';
import { Data } from '@angular/router';
import { Reservation } from '../model/reservation.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Message } from '../model/message.model';
import { Rating } from '../model/rating.model';

declare var require: any;


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

  modalRef: BsModalRef;
  newMessageForm: FormGroup;

  private reservations: Reservation[];
  private Messages: Message[] = [];

  private res: Reservation[];
  private usrs: User[] = [];

  private score: number = 0;
  private comm: string = "";

  private selectedRes: number;


  private message: string;
  private selModal: number;
  private loggUser: number;
  @ViewChild('myModalClose') myModalClose: ElementRef;
  @ViewChild('datatable') table;

  constructor(private profileService: ProfileService, private route: ActivatedRoute, private modalService: BsModalService) {
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

        this.profileService.getReservationForUser(this.user.id).subscribe(
          (response) => {
            try {
              this.res = response.json();
              this.usrs = [];


              this.res.forEach(element => {
                var keepGoing = true;
                // console.log(element.accommodation.agent);
                // console.log(this.usrs);
                // console.log(this.usrs.indexOf(element.accommodation.agent));
                if (this.usrs.length == 0)
                  this.usrs.push(element.accommodation.agent);
                else
                  this.usrs.forEach(item => {
                    if (keepGoing)
                      if (item.id == element.accommodation.agent.id) {
                        keepGoing = false;
                      }
                      else {
                        this.usrs.push(element.accommodation.agent);
                      }
                  });

              });
              // console.log(this.usrs);
            }
            catch (e) {
              console.log(e);
              e.message;
            }
          }
        )

        this.profileService.getReservationForAccommodation(this.user.id).subscribe(
          (response) => {
            this.reservations = response.json();
            // console.log(this.reservations)
            try {
              if (this.reservations.length > 0) {
                document.getElementById("openModalButton").click();
              }
            }
            catch (e) {
              e.message;
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
      // console.log(grade)
      // console.log(comment)

      let rating = {};
      rating['grade'] = grade;
      rating['content'] = comment;
      rating['rezervacija'] = reservation.id;
      rating['accommodation'] = reservation.accommodation.id;
      rating['korisnik'] = JSON.parse(localStorage.getItem("loggedUser")).id;

      var js2xmlparser = require("js2xmlparser");
      let xmlFile = js2xmlparser.parse("rating", rating);

      this.profileService.newCommentRate(xmlFile).subscribe(
        (response) => {

          let reservationT = {}
          reservationT['id'] = reservation.id;
          reservationT['beginDate'] = reservation.beginDate;
          reservationT['endDate'] = reservation.endDate;
          reservationT['accommodation'] = { id: reservation.accommodation.id };
          reservationT['user'] = { id: JSON.parse(localStorage.getItem("loggedUser")).id };
          reservationT['rated'] = true;


          let xmlFile1 = js2xmlparser.parse("reservation", reservationT);
          this.profileService.updateReservation(xmlFile1).subscribe(
            (response) => {

              this.reservations.forEach(r => {
                if (r.id == response.json().id) {
                  r.rated = true;
                }
              })
            }
          )
        },
        (error) => {
          console.log(error);
        }
      )

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

  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template);
    this.initMess();
  }


  initMess() {
    this.newMessageForm = new FormGroup({
      'message': new FormControl(null, [Validators.required]),
    })
  }

  send() {
    // console.log(this.message);
    let messg = {};
    messg['text'] = this.message;
    messg['sendRole'] = JSON.parse(localStorage.getItem("loggedUser")).role;;
    messg['date'] = new Date().toISOString();

    var js2xmlparser = require("js2xmlparser");
    let xmlFile = js2xmlparser.parse("message", messg);


    this.profileService.sendMessage(xmlFile, this.selectedRes).subscribe(
      (response) => {
        // console.log(response);
        this.getResId(this.selectedRes);
      }
    )

    this.modalRef.hide();

  }

  getResId(event) {
    // console.log('selected employee: ' + event);
    this.profileService.getInbox(event).subscribe(
      (response) => {

        this.Messages = response.json();
        //console.log(this.Messages);
      }

    )
  }

  getResIdModal(event) {
    this.selModal = event;
    this.loggUser = JSON.parse(localStorage.getItem("loggedUser")).id;
    // console.log('selected: ' + event);
    // console.log('user id:' + JSON.parse(localStorage.getItem("loggedUser")).id);
  }

}
