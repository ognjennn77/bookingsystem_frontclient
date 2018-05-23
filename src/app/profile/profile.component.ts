import { Component, OnInit } from '@angular/core';
import {LoggedUtils} from "../../utils/logged.utils"
import {Http, Headers} from '@angular/http';
import {ProfileService} from './profile.service'
import {User} from '../model/user.model'
import { ActivatedRoute } from '@angular/router';
import { Data } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  user : User ;
   

  constructor(private profileService:ProfileService, private route: ActivatedRoute) {     
  }

 

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.user = data.profileResolver;
        console.log(this.user);
      }
    )
  }


}
