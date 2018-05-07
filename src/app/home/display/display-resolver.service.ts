import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";;
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Accommodation } from "../../model/accommodation.model";
import { DisplayService } from "./display.service";
import * as xml2js from "xml2js";

declare const require: any;

interface returnValue {

    totalNumber: number,
    accommodations: Accommodation[]
}

@Injectable()
export class DisplayResolver implements Resolve<returnValue> {

    constructor(private displayService: DisplayService) { }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): returnValue | Observable<returnValue> | Promise<returnValue> {

        let currentPage = route.queryParams['page'];
        let nextPage = +currentPage + 1;
        if (!(currentPage == NaN)) {
            nextPage = 1;
        }

        return this.displayService.getAccommodations(nextPage, 8)
            .map((response: Response) => {
                const totalNumber = +response.headers.get("Total-Count");

                let accommodations: Accommodation[] = response.json();

                let ret: returnValue = { totalNumber, accommodations }
                return ret;
            });
    }

}