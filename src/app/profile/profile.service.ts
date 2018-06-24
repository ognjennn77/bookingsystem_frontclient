import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import { LoggedUtils } from '../../utils/logged.utils'
import { Rating } from '../model/rating.model';
import { Reservation } from '../model/reservation.model';


@Injectable()
export class ProfileService {
    constructor(private http: Http) { }

    getUser() {
        let username = LoggedUtils.getUsername();
        let headers = new Headers();
        return this.http.get("http://localhost:8080/api/abstractUser/user/" + username);
    }

    getReservationForAccommodation(id: number) { //pokupi sve rezervacije koje su prosle za ovog usera da ih oceni
        // console.log(id)
        return this.http.get("http://localhost:8080/api/reservation/userId/" + id);
    }

    getReservationForUser(id: number) { //pokupi sve rezervacije koje su prosle za ovog usera da ih oceni
        // console.log(id)
        return this.http.get("http://localhost:8080/api/reservation/userReservations/" + id);
    }

    getInbox(resId: number) {
        return this.http.get("http://localhost:8080/api/inbox/getByRes/" + resId);
    }

    newCommentRate(rating: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'text/xml');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        // console.log(rating)
        return this.http.post("http://localhost:8080/api/rating/new", rating, options);
    }

    updateReservation(rez: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/xml');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        // console.log(rez)
        return this.http.put("http://localhost:8080/api/reservation/update", rez, options);
    }

    sendMessage(xmlFile: any, resId: number) {
        const headers = new Headers();
        headers.append('Content-Type', 'text/xml');
        headers.append('Accept', 'text/xml');
        let options = new RequestOptions({ headers: headers });
        return this.http.post("http://localhost:8080/api/inbox/newmessage/" + resId, xmlFile, options);
    }

    updateUser(xmlFile: any, usrId: string, imgId: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'text/xml');
        headers.append('Accept', 'text/xml');
        let options = new RequestOptions({ headers: headers });
        // let body = '<request>'
        // '<username>Username</username>'
        // '<password>Password</password>'
        // '</request>';
        console.log(xmlFile)
            return this.http.post('http://localhost:8080/api/abstractUser/update/' + imgId + '/' + usrId, xmlFile, options);
    }
}