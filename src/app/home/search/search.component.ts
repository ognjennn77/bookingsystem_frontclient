import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  show: Boolean = true;
  miniSearchForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initScreening();
  }

  initScreening() {
    this.miniSearchForm = new FormGroup({
      'city': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required]),
      'numberOfPeople': new FormControl(null, [Validators.required]),
    })
  }


}
