
import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Accommodation } from "../model/accommodation.model";
import { Subject } from "rxjs/Rx";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable()
export class HomeService {

    private accommodationList: Accommodation[] = [];
    accommodationSubject = new Subject<Accommodation[]>();

    private formData: FormData = new FormData();

    constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }

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

    setUrlSearch(search?: any, page?: string) {

        search['page'] = page;
        this.router.navigate(['/home'], { queryParams: search });
    }

    setUrlSort(sort?: string, page?: string) {

        let queryParamsTemp = {}
        queryParamsTemp['sort'] = sort;
        queryParamsTemp['page'] = page;

        this.router.navigate(['/home'], { queryParams: queryParamsTemp, queryParamsHandling: 'merge' });
    }

}