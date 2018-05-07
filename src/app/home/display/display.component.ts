import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../../model/accommodation.model';
import { ActivatedRoute, Data } from '@angular/router';
import { DisplayService } from './display.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  accommodations: Array<Accommodation>;
  totalNumber: number;

  constructor(private homeService: DisplayService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {

        this.accommodations = data.dispayResolver.accommodations;
        this.totalNumber = data.dispayResolver.totalNumber;

        console.log(this.accommodations)
      }
    )
  }
}
