import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../../model/accommodation.model';

@Component({
  selector: 'app-accommodation-profile',
  templateUrl: './accommodation-profile.component.html',
  styleUrls: ['./accommodation-profile.component.css']
})
export class AccommodationProfileComponent implements OnInit {

  accommodation: Accommodation;


  constructor() { }

  ngOnInit() {
  }

}
