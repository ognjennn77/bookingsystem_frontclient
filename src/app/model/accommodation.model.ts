import { Image } from "./image.model";
import { AdditionalServices } from "./additionalServices.model";
import { AccommodationCategory } from "./accommodationCategory.model";
import { AccommodationType } from "./accommodationType.model";
import { Reservation } from "./reservation.model";

export class Accommodation {
    constructor(public id?: number,
        public name?: string,
        public address?: string,
        public description?: string,
        public images?: Array<Image>,
        public numberOfPeople?: number,
        public additionalServices?: Array<AdditionalServices>,
        public accommodationCategory?: AccommodationCategory,
        public accommodationType?: AccommodationType,
        public reservations?: Array<Reservation>) { }
}