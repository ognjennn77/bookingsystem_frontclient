
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

    setUrl(sort?: string, search?: string, page?: string) {

        let currentPage = this.route.queryParams['page'];
        let searchQuery = search ? search : this.route.queryParams['search'];
        let sortQuery = sort ? sort : this.route.queryParams['sort'];
        let nextPage = page ? page : (currentPage ? +currentPage - 1 : 0);

        let queryParamsTemp = {}

        queryParamsTemp['search'] = searchQuery;
        queryParamsTemp['sort'] = sortQuery;
        queryParamsTemp['page'] = nextPage;

        this.router.navigate(['/home'], { queryParams: queryParamsTemp });
    }

}