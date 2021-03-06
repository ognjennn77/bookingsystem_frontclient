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
    disableDateRanges: [],
    alignSelectorRight: true,
    sunHighlight: true,
    markCurrentDay: true,
    inline: false,
    indicateInvalidDateRange: true,
    editableDateRangeField: false,
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

    let queryParamsSearch = {}

    let date = this.miniSearchForm.get('date').value;

    if (date) {
      formData.append('beginDate', date.beginJsDate),
        formData.append('endDate', date.endJsDate);
      queryParamsSearch['beginDate'] = date.beginJsDate.toISOString();
      queryParamsSearch['endDate'] = date.endJsDate.toISOString();

    }

    if (this.miniSearchForm.get('city').value) {
      formData.append('city', this.miniSearchForm.get('city').value)
      queryParamsSearch['city'] = this.miniSearchForm.get('city').value;
    }

    if (this.miniSearchForm.get('numberOfPeople').value) {
      formData.append('numberOfPeople', this.miniSearchForm.get('numberOfPeople').value);
      queryParamsSearch['numberOfPeople'] = this.miniSearchForm.get('numberOfPeople').value;
    }

    let services = null;
    for (let service of this.checkedServices) {
      formData.append('additionalServices', service);
      services += service += ","
    }
    if (services)
      queryParamsSearch['additionalServices'] = services;

    let categorys = null;
    for (let category of this.checkedCategory) {
      formData.append('accommodationCategory', category)
      categorys += category += ","
    }
    if (categorys)
      queryParamsSearch['accommodationCategory'] = categorys;

    let types = null;
    for (let type of this.checkedType) {
      formData.append('accommodationType', type)
      types += type += ","
    }
    if (types)
      queryParamsSearch['accommodationType'] = types;

    formData.append('search', 'true');

    this.homeSeervice.setFormData(formData);
    this.homeSeervice.setUrlSearch(queryParamsSearch, '1')
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