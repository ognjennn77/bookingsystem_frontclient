
import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';

@Injectable()
export class ThumbnailAccommodationService {
    constructor(private http: Http) { }

    getImage(idAccommodation: number) {
        return this.http.get('http://localhost:8080/api/image/search/' + idAccommodation)
    }

    getAvarageGrade(idAccommodation: number) {
        return this.http.get('http://localhost:8080/api/rating/allRating/' + idAccommodation + '/avg')
    }
}