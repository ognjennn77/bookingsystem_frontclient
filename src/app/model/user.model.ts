import { Image } from "./image.model";

export class User{
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public email : string,
        public firstName : string,
        public lastName :string,
        public city : string,
        public phoneNumber : string,
        public role : string,
        public active?: any,
        public image? : Image
    ){}
}