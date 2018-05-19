
import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { HomeService } from "../home.service";

@Injectable()
export class DisplayService {
    constructor(private http: Http, private homeService: HomeService) { }

    getAccommodations(page?: number, size?: number, sort?: string, search?: string) {

        let formData: FormData = this.homeService.getFormData();
        formData.has('page') ? formData.set('page', page.toString()) : formData.append('page', page.toString());
        formData.has('size') ? formData.set('size', size.toString()) : formData.append('size', size.toString());
        sort ? (formData.has('sort') ? formData.set('sort', sort) : formData.append('sort', sort)) : null;
        search ? (formData.has('search') ? formData.set('search', search) : formData.append('search', search)) : null;

        return this.http.post('http://localhost:8080/api/accommodation', formData)
    }
}