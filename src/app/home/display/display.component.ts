import { Component, OnInit, OnDestroy } from '@angular/core';
import { Accommodation } from '../../model/accommodation.model';
import { ActivatedRoute, Data } from '@angular/router';
import { DisplayService } from './display.service';
import { HomeService } from '../home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {

  accommodations: Accommodation[];
  totalNumber: number;
  private subscription: Subscription;

  constructor(private displayService: DisplayService,
    private route: ActivatedRoute, private homeService: HomeService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.accommodations = data.displayResolver.accommodations;
        this.totalNumber = data.displayResolver.totalNumber;
        this.homeService.setAccommodations(this.accommodations);
      }
    )
    this.subscription = this.homeService.accommodationSubject.subscribe(
      (accommodations: Accommodation[]) => {
        this.accommodations = accommodations;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sort(type: String) {
    let currentPage = this.route.queryParams['page'];
    let nextPage = +currentPage + 1;
    if (!(currentPage == NaN)) {
      nextPage = 1;
    }
    this.displayService.getSorted(type, nextPage, 8).subscribe(
      (response) => {
        console.log(response.json())
      }
    )
  }
}
