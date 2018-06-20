
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";;
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Image } from "../../model/image.model";
import { AccommodationProfileService } from "./accommodation-profile.service";
import { Rating } from "../../model/rating.model";

@Injectable()
export class RatingResolver implements Resolve<Rating[]> {

    constructor(private accommodationProfileService: AccommodationProfileService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Rating[] | Observable<Rating[]> | Promise<Rating[]> {

        let id = route.params['id'];

        return this.accommodationProfileService.getComments(id)
            .map((response: Response) => {
                let rating: Rating[] = response.json();
                return rating;
            });
    }

}