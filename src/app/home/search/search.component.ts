import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from './search.service';
import { AdditionalServices } from '../../model/additionalServices.model';
import { AccommodationCategory } from '../../model/accommodationCategory.model';
import { AccommodationType } from '../../model/accommodationType.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  advanceSearch: Boolean = true;
  miniSearchForm: FormGroup;

  private additionalServices: AdditionalServices[];
  private accommodationCategory: AccommodationCategory[];
  private accommodationType: AccommodationType[];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.initSearch();

    this.getAdditionasServices();
    this.getAccommodationCategory();
    this.getAccommodationType();
  }

  initSearch() {
    this.miniSearchForm = new FormGroup({
      'city': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required]),
      'numberOfPeople': new FormControl(null, [Validators.required]),
    })
  }

  showAdvanceSearch() {
    this.advanceSearch = !this.advanceSearch;

  }

  getAdditionasServices() {
    this.searchService.getAditionalServices().subscribe(
      (response) => {
        this.additionalServices = response.json();
      }
    )
  }

  getAccommodationCategory() {
    this.searchService.getAccommodationCategory().subscribe(
      (response) => {
        this.accommodationCategory = response.json();
      }
    )
  }

  getAccommodationType() {
    this.searchService.getAccommodationType().subscribe(
      (response) => {
        this.accommodationType = response.json();
      }
    )
  }

}
