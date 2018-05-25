
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";;
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Image } from "../../model/image.model";
import { AccommodationProfileService } from "./accommodation-profile.service";

@Injectable()
export class ImagesResolver implements Resolve<string[]> {

    constructor(private accommodationProfileService: AccommodationProfileService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string[] | Observable<string[]> | Promise<string[]> {

        let id = route.params['id'];

        return this.accommodationProfileService.getImage(id)
            .map((response: Response) => {
                let i: Image[] = response.json();
                let previewImages: string[] = [];
                for (let n = 0; n < i.length; n++) {
                    previewImages.push(`data:image/jpeg;base64,${i[n].image}`);
                }
                return previewImages;
            });
    }

}