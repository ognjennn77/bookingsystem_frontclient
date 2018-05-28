import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';

@Injectable()
export class UserRegistrationService {
    constructor(private http: Http) { }

    newUser(xmlFile: any, id: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'text/xml');
        headers.append('Accept', 'text/xml');
        let options = new RequestOptions({ headers: headers });
        // let body = '<request>'
        // '<username>Username</username>'
        // '<password>Password</password>'
        // '</request>';
        console.log(xmlFile)
        if (id != '-1')
            return this.http.post('http://localhost:8080/api/abstractUser/new/' + id, xmlFile, options);
        else
            return this.http.post('http://localhost:8080/api/abstractUser/new', xmlFile, options);
    }

}