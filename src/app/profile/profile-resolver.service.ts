
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";;
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { User } from "../model/user.model";
import { ProfileService } from "./profile.service";





@Injectable()
export class ProfileResolver implements Resolve<User> {

    constructor(private profileService: ProfileService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {

        
        return this.profileService.getUser()
            .map((response: Response) => {
                //console.log(response)
                //console.log(response.json())
                 return response.json();
            });
    }

}