
import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Accommodation } from "../model/accommodation.model";
import { Subject } from "rxjs/Rx";

@Injectable()
export class HomeService {

    private accommodationList: Accommodation[] = [];
    accommodationSubject = new Subject<Accommodation[]>();

    private formData: FormData = new FormData();

    constructor(private http: Http) { }

    setAccommodations(accommodations: Accommodation[]) {
        this.accommodationList = accommodations;
        if (this.accommodationList)
            this.accommodationSubject.next(this.accommodationList.slice());
    }

    getAccommodations() {
        return this.accommodationList.slice();
    }

    setFormData(formData: FormData) {
        this.formData = formData;
    }

    getFormData() {
        return this.formData;
    }

}