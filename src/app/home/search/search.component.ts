import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from './search.service';
import { AdditionalServices } from '../../model/additionalServices.model';
import { AccommodationCategory } from '../../model/accommodationCategory.model';
import { AccommodationType } from '../../model/accommodationType.model';
import { IMyDrpOptions } from 'mydaterangepicker';
import { HomeComponent } from '../home.component';
import { HomeService } from '../home.service';
import { ActivatedRoute } from '@angular/router';

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

  private checkedServices: string[] = [];
  private checkedCategory: string[] = [];
  private checkedType: string[] = [];

  private myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    sunHighlight: true,
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  constructor(private searchService: SearchService, private homeSeervice: HomeService,
    private route: ActivatedRoute) { }

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

  searchData() {
    let formData: FormData = new FormData();

    let date = this.miniSearchForm.get('date').value;

    if (date) {
      formData.append('beginDate', date.beginDate),
        formData.append('endDate', date.endDate)
    }

    if (this.miniSearchForm.get('city').value)
      formData.append('city', this.miniSearchForm.get('city').value)

    if (this.miniSearchForm.get('numberOfPeople').value)
      formData.append('numberOfPeople', this.miniSearchForm.get('numberOfPeople').value)

    for (let service of this.checkedServices) {
      formData.append('additionalServices', service)
    }

    for (let category of this.checkedCategory) {
      formData.append('accommodationCategory', category)
    }

    for (let type of this.checkedType) {
      formData.append('accommodationType', type)
    }

    formData.append('search', 'true');

    this.homeSeervice.setFormData(formData);
    this.homeSeervice.setUrl(undefined, 'true', '1')
  }

  selectCategory(e, category: AccommodationCategory) {
    if (e.target.checked) {
      this.checkedCategory.push(category.name)
    } else {
      this.checkedCategory.splice(this.checkedCategory.indexOf(category.name), 1);
    }
  }

  selectType(e, type: AccommodationType) {
    if (e.target.checked) {
      this.checkedType.push(type.name)
    } else {
      this.checkedType.splice(this.checkedType.indexOf(type.name), 1);
    }
  }

  selectServices(e, service: AdditionalServices) {
    if (e.target.checked) {
      this.checkedServices.push(service.name)
    } else {
      this.checkedServices.splice(this.checkedServices.indexOf(service.name), 1);
    }
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