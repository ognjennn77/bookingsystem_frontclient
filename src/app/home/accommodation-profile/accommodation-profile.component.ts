import { Component, OnInit, TemplateRef } from '@angular/core';
import { Accommodation } from '../../model/accommodation.model';
import { AccommodationProfileService } from './accommodation-profile.service';
import { ActivatedRoute, Data } from '@angular/router';
import { IMyDrpOptions, IMyDateRange, IMyDateRangeModel, IMyDateSelected } from 'mydaterangepicker';
import { Reservation } from '../../model/reservation.model';
import { BusyDates } from '../../model/busyDates.model';
import { DatePipe } from '@angular/common';
import { format } from 'util';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

declare var require: any;

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

  private beginDate2: Date;
  private endDate2: Date;

  private modalRef: BsModalRef;

  private disableReserve: boolean = true;

  private totalPrice: string = "";

  private myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    disableDateRanges: [],
    alignSelectorRight: true,
    sunHighlight: true,
    markCurrentDay: true,
    inline: false,
    indicateInvalidDateRange: true,
    editableDateRangeField: false,

  };

  constructor(private route: ActivatedRoute,
    private accommodationProfileService: AccommodationProfileService,
    private modalService: BsModalService) { }

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

    this.beginDate2 = event.beginJsDate
    this.endDate2 = event.endJsDate
    this.disableReserve = false;
  }

  reserve(template: TemplateRef<any>) {
    this.accommodationProfileService.getPriceForTermine(this.accommodation.id, this.beginDate, this.endDate).subscribe(
      (response) => {
        this.totalPrice = response.json();


        this.modalRef = this.modalService.show(template);
      }
    )
  }

  makeReservation() {
    let reservation = {}

    reservation['beginDate'] = this.beginDate2.toISOString();
    reservation['endDate'] = this.endDate2.toISOString();

    reservation['accommodation'] = { id: this.accommodation.id };
    //  reservation.user = 

    var js2xmlparser = require("js2xmlparser");

    let xmlFile = js2xmlparser.parse("reservation", reservation);

    this.accommodationProfileService.newReservation(xmlFile).subscribe(
      (response) => { console.log(response) }
    )

    this.disableReserve = true;
    this.modalRef.hide();
  }

  cancel(template: TemplateRef<any>) {
    this.modalRef.hide();
  }

}
