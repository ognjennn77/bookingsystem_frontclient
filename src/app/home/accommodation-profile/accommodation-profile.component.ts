import { Component, OnInit, TemplateRef } from '@angular/core';
import { Accommodation } from '../../model/accommodation.model';
import { AccommodationProfileService } from './accommodation-profile.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IMyDrpOptions, IMyDateRange, IMyDateRangeModel, IMyDateSelected, IMyDate } from 'mydaterangepicker';
import { Reservation } from '../../model/reservation.model';
import { BusyDates } from '../../model/busyDates.model';
import { DatePipe } from '@angular/common';
import { format } from 'util';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Image } from '../../model/image.model';
import { LoggedUtils } from '../../../utils/logged.utils';
import { Rating } from '../../model/rating.model';

declare var require: any;

@Component({
  selector: 'app-accommodation-profile',
  templateUrl: './accommodation-profile.component.html',
  styleUrls: ['./accommodation-profile.component.css']
})
export class AccommodationProfileComponent implements OnInit {

  private accommodation: Accommodation;
  private busyDates: BusyDates[] = null;
  private freeDates: Date[] = null;

  private rating: Rating[] = null;

  private beginDate: string;
  private endDate: string;

  private beginDate2: Date;
  private endDate2: Date;

  private modalRef: BsModalRef;

  private disableReserve: boolean = true;

  private totalPrice: string = "";

  private previewImages: string[];

  private currentDate: Date = new Date();

  private modalRefLog: BsModalRef;

  private myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    disableDateRanges: [{
      beginDate: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() },
      endDate: { year: 2100, month: 1, day: 1 }
    }],
    disableUntil: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() },
    enableDates: [],
    alignSelectorRight: true,
    sunHighlight: true,
    markCurrentDay: true,
    inline: false,
    indicateInvalidDateRange: true,
    editableDateRangeField: false,
  };

  constructor(private route: ActivatedRoute,
    private accommodationProfileService: AccommodationProfileService,
    private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.accommodation = data.accommodationProfileResolver;
        console.log(this.accommodation)
        this.accommodationProfileService.getBusyTerminsFromAccommodationId(this.accommodation.id).subscribe(
          (response) => {

            this.freeDates = response.json();

            let enableDates: IMyDate[] = [];
            if (this.freeDates) {
              for (let freeDate of this.freeDates) {
                let date: Date = new Date(freeDate);
                enableDates.push({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() })
              }
            }

            let clone = JSON.parse(JSON.stringify(this.myDateRangePickerOptions))
            clone.enableDates = enableDates;

            this.myDateRangePickerOptions = clone;

          }
        )
        // kupljenje svih ratinga za dati smestaj radi prikaza
        this.rating = data.ratingResolver;
      }
    )

    this.route.data.subscribe(
      (data: Data) => {
        this.previewImages = data.imageResolver
      })
  }

  onDateRangeChanged(event: IMyDateRangeModel) {

    this.beginDate = event.beginDate.year + '/' + event.beginDate.month + '/' + event.beginDate.day;
    this.endDate = event.endDate.year + '/' + event.endDate.month + '/' + event.endDate.day;

    this.beginDate2 = event.beginJsDate
    this.endDate2 = event.endJsDate
    this.disableReserve = false;
  }

  reserve(template: TemplateRef<any>) {
    if (localStorage.getItem("loggedUser")) {
      this.accommodationProfileService.getPriceForTermine(this.accommodation.id, this.beginDate, this.endDate).subscribe(
        (response) => {
          this.totalPrice = response.json();
          this.modalRef = this.modalService.show(template);
        }
      )
    } else {
      this.router.navigate(['/home']);
      //dodati otvaranje dialoga za logovanje
    }
  }

  makeReservation() {
    let reservation = {}
    reservation['beginDate'] = this.beginDate2.toISOString();
    reservation['endDate'] = this.endDate2.toISOString();
    reservation['accommodation'] = { id: this.accommodation.id }
    reservation['user'] = { id: JSON.parse(localStorage.getItem("loggedUser")).id }
    reservation['rated'] = false;
    reservation['price'] = this.totalPrice;

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
