import { Component, OnInit, OnDestroy } from '@angular/core';
import { Accommodation } from '../../model/accommodation.model';
import { ActivatedRoute, Data, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private homeService: HomeService,
    private router: Router) { }

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

  sort(sort: string) {
    let formData: FormData = this.homeService.getFormData();
    formData.has('sort') ? formData.set('sort', sort) : formData.append('sort', sort);

    this.homeService.setFormData(formData);
    this.homeService.setUrl(sort, undefined, '1');
  }

}
