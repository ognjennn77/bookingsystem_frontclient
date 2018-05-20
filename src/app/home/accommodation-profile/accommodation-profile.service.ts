
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';

@Injectable()
export class AccommodationProfileService {
    constructor(private http: Http) { }

    getAccommodation(id: number) {
        return this.http.get('http://localhost:8080/api/accommodation/' + id.toString());
    }

    getBusyTerminsFromAccommodationId(id: number) {
        return this.http.get('http://localhost:8080/api/reservation/search?idAccommodation=' + id);
    }

    getPriceForTermine(accommodationId: number, beginDate: string, endDate: string) {
        return this.http.get('http://localhost:8080/api/accommodation/' + accommodationId + '/searchDate?beginDate=' + beginDate + '&endDate=' + endDate);
    }

    newReservation(xmlFile: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'text/xml');
        headers.append('Accept', 'text/xml');
        let options = new RequestOptions({ headers: headers });
        // let body = '<request>'
        // '<username>Username</username>'
        // '<password>Password</password>'
        // '</request>';
        console.log(xmlFile)
        return this.http.post('http://localhost:8080/api/reservation/new', xmlFile, options);
    }
}