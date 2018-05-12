
import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';

@Injectable()
export class SearchService {
    constructor(private http: Http) { }

    getAditionalServices() {
        return this.http.get('http://localhost:8080/api/additionalServices');
    }

    getAccommodationCategory() {
        return this.http.get('http://localhost:8080/api/accommodationCategory');
    }

    getAccommodationType() {
        return this.http.get('http://localhost:8080/api/accommodationType');
    }

    getSearch(formData: FormData) {
        return this.http.post('http://localhost:8080/api/accommodation/search', formData);
    }
}