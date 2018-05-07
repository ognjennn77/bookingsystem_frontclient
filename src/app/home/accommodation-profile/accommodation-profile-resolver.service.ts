
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";;
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Accommodation } from "../../model/accommodation.model";
import { AccommodationProfileService } from "./accommodation-profile.service";

declare const require: any;

interface returnValue {

    totalNumber: number,
    accommodations: Accommodation[]
}

@Injectable()
export class AccommodationProfileResolver implements Resolve<Accommodation> {

    constructor(private accommodationProfileService: AccommodationProfileService) { }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Accommodation | Observable<Accommodation> | Promise<Accommodation> {

        let id = route.params['id'];

        return this.accommodationProfileService.getAccommodation(id)
            .map((response: Response) => {
                return response.json();
            });
    }

}