
import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';

@Injectable()
export class AccommodationProfileService {
    constructor(private http: Http) { }

    getAccommodation(id: number) {
        return this.http.get('http://localhost:8080/api/accommodation?id=' + id);
    }
}