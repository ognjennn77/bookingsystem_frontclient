import { Accommodation } from "./accommodation.model";

export class Reservation {
    constructor(public id?: number,
        public beginDate?: string,
        public endDate?: string,
        //public user?: User,
        public accommodation?: Accommodation
    ) { }
}