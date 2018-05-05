
import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';

@Injectable()
export class DisplayService {
    constructor(private http: Http) { }

    getAccommodations(page: number, size: number) {
        return this.http.get('http://localhost:8080/api/accommodation?page=' + page + '&size=' + size);
    }
}