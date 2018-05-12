import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../../model/accommodation.model';
import { AccommodationProfileService } from './accommodation-profile.service';
import { ActivatedRoute, Data } from '@angular/router';
import { IMyDrpOptions, IMyDateRange } from 'mydaterangepicker';
import { Reservation } from '../../model/reservation.model';
import { BusyDates } from '../../model/busyDates.model';

@Component({
  selector: 'app-accommodation-profile',
  templateUrl: './accommodation-profile.component.html',
  styleUrls: ['./accommodation-profile.component.css']
})
export class AccommodationProfileComponent implements OnInit {

  private accommodation: Accommodation;
  private busyDates: BusyDates[] = null;

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
        this.accommodation = data.accommodationProfileResolver[0];

        this.accommodationProfileService.getBusyTerminsFromAccommodationId(this.accommodation.id).subscribe(
          (response) => {
            // console.log(response.json())
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

}
