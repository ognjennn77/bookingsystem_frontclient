import { Component, OnInit } from '@angular/core';
import {LoggedUtils} from "../../utils/logged.utils"
import {Http, Headers} from '@angular/http';
import {ProfileService} from './profile.service'
import {User} from '../model/user.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  user : User ;
   

  constructor(private profileService:ProfileService) { 
    this.profileService.getUser().subscribe(
      (data ) => {
        this.user = <User> data;
        console.log(this.user);
      }
    );
    
    
    
  }

 

  ngOnInit() {
    
  }


}
