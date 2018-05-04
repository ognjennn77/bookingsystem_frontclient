import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css']
})
export class AdvanceSearchComponent implements OnInit {

  advanceSearchForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initSearch();
  }

  initSearch() {
    this.advanceSearchForm = new FormGroup({
      // 'city': new FormControl(null, [Validators.required]),
      // 'date': new FormControl(null, [Validators.required]),
      // 'numberOfPeople': new FormControl(null, [Validators.required]),
    })
  }

}
