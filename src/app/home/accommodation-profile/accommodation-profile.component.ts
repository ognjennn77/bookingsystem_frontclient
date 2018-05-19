import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../../model/accommodation.model';
import { AccommodationProfileService } from './accommodation-profile.service';
import { ActivatedRoute, Data } from '@angular/router';
import { IMyDrpOptions, IMyDateRange, IMyDateRangeModel, IMyDateSelected } from 'mydaterangepicker';
import { Reservation } from '../../model/reservation.model';
import { BusyDates } from '../../model/busyDates.model';
import { DatePipe } from '@angular/common';
import { format } from 'util';

@Component({
  selector: 'app-accommodation-profile',
  templateUrl: './accommodation-profile.component.html',
  styleUrls: ['./accommodation-profile.component.css']
})
export class AccommodationProfileComponent implements OnInit {

  private accommodation: Accommodation;
  private busyDates: BusyDates[] = null;

  private beginDate: string;
  private endDate: string;

  private temp: boolean = true;

  private myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    disableDateRanges: [],
    alignSelectorRight: true,
    sunHighlight: true,
    markCurrentDay: true
  };

  constructor(private route: ActivatedRoute, private accommodationProfileService: AccommodationProfileService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.accommodation = data.accommodationProfileResolver;
        this.accommodationProfileService.getBusyTerminsFromAccommodationId(this.accommodation.id).subscribe(
          (response) => {
            this.busyDates = response.json();
            let disableDateRanges: IMyDateRange[] = [];
            for (let busyDate of this.busyDates) {
              let beginDate: Date = new Date(busyDate.beginDate);
              let endDate: Date = new Date(busyDate.endDate);

              disableDateRanges.push({
                beginDate: { year: beginDate.getFullYear(), month: beginDate.getMonth() + 1, day: beginDate.getDate() },
                endDate: { year: endDate.getFullYear(), month: endDate.getMonth() + 1, day: endDate.getDate() }
              })
            }
            let clone = JSON.parse(JSON.stringify(this.myDateRangePickerOptions))
            clone.disableDateRanges = disableDateRanges;

            this.myDateRangePickerOptions = clone;
          }
        )
      }
    )
  }

  onDateRangeChanged(event: IMyDateRangeModel) {

    this.beginDate = event.beginDate.year + '/' + event.beginDate.month + '/' + event.beginDate.day;
    this.endDate = event.endDate.year + '/' + event.endDate.month + '/' + event.endDate.day;

    this.temp = false;
  }

  reserve() {
    this.accommodationProfileService.getPriceForTermine(this.accommodation.id, this.beginDate, this.endDate).subscribe(
      (response) => {
        console.log(response.json())



        this.temp = true;
      }
    )
  }

}
