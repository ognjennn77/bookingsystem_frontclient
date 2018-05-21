import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Http, Headers} from '@angular/http';
import { ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import {LoggedUtils} from '../../utils/logged.utils'


@Injectable()
export class ProfileService{
    constructor(private http: Http){}

    getUser(){
        
        let username = LoggedUtils.getUsername();
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get("http://localhost:8080/api/abstractUser/user/"+username,{ headers : headers })
        .map(res => res.json());
    }
}