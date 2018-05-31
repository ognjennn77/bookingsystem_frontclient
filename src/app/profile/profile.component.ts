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
  newMessageForm : FormGroup;

  private reservations: Reservation[];

  private res: Reservation[];
  private usrs: User[]=[];

  private score: number = 0;
  private comm: string = "";
  @ViewChild('myModalClose') myModalClose: ElementRef;

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
            try{
              this.res = response.json();
              this.usrs = [];
              

              this.res.forEach(element => {
                var keepGoing = true;
                // console.log(element.accommodation.agent);
                // console.log(this.usrs);
                // console.log(this.usrs.indexOf(element.accommodation.agent));
                if(this.usrs.length ==0)
                  this.usrs.push(element.accommodation.agent);
                else
                  this.usrs.forEach(item => {
                    if(keepGoing)
                      if(item.id == element.accommodation.agent.id){
                        keepGoing = false;
                      }
                      else{
                        this.usrs.push(element.accommodation.agent);
                      }
                  });
                  
              });
              console.log(this.usrs);
            }
            catch(e){
              console.log(e);
              e.message;
            }
          }
        )

        this.profileService.getReservationForAccommodation(this.user.id).subscribe(
          (response) => {
            this.reservations = response.json();
            try{
              if (this.reservations.length > 0) {
                document.getElementById("openModalButton").click();
              }
            }
            catch(e)
            {
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

  openModal(template: TemplateRef<any>) {
    
    this.modalRef = this.modalService.show(template);
    this.initMess();
  }


  initMess() {
    this.newMessageForm = new FormGroup({
      'message': new FormControl(null, [Validators.required]),
    })
  }

  send(){}

}
