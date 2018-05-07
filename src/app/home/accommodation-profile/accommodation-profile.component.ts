import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../../model/accommodation.model';
import { AccommodationProfileService } from './accommodation-profile.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-accommodation-profile',
  templateUrl: './accommodation-profile.component.html',
  styleUrls: ['./accommodation-profile.component.css']
})
export class AccommodationProfileComponent implements OnInit {

  private accommodation: Accommodation;

  constructor(private route: ActivatedRoute, private accommodationProfileService: AccommodationProfileService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {

        this.accommodation = data.accommodationProfileResolver[0];
        console.log(this.accommodation)
      }
    )
  }

}
