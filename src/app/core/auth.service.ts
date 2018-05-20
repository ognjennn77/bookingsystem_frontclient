import { Injectable, EventEmitter, Output } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

import {Login} from '../model/login.model'
import {LoggedUtils} from '../../utils/logged.utils'

@Injectable()
export class AuthService {

  public OnChangeRole = new Subject<string>();

  constructor(private http: Http) {
  }

  attemptAuth(login:Login): Observable<any> {
    let param = JSON.stringify(login);
    console.log(param);
    let headers = new Headers();
    console.log('attempAuth ::');
    headers.append("Content-Type" , "application/json");
    return this.http.post("http://localhost:8080/api/abstractUser/login", param, { headers : headers })
      .map(res => res.json());
    /*  return this.http.post<any>('http://localhost:8080/token/generate-token', credentials); */
  }

  emitRole(urs:string)
  {
    if(urs!="")
    {
      this.OnChangeRole.next(LoggedUtils.getRole());
    }
  }

  getRoleEmitter(): Observable<any> {
    return this.OnChangeRole.asObservable();
  }

}